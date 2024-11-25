const express = require('express');
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require("passport");
const cookieSession = require("cookie-session");
const userRoutes = require('./routes/User.Routes');
const { InfluxDB } = require('@influxdata/influxdb-client');
const authMiddleware = require('./middleware/authMiddleware');
const Notification = require('./models/Notification');
const Link = require('./models/Link');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuration CORS
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

// Configuration d'Express
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de la session et de Passport
app.use(cookieSession({
    name: "session",
    keys: ["*"],
    maxAge: 24 * 60 * 60 * 1000, // maxAge en millisecondes
}));
app.use(passport.initialize());
app.use(passport.session());

// Connexion à MongoDB 
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/energyFlow', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB avec succès !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
    
};

connectToMongo();

// Définition du schéma MongoDB pour l'historique
const historyEntrySchema = new mongoose.Schema({
    energy: { type: Number, required: true },
    temperatureC: { type: Number, required: true },
    price: { type: Number, required: true },
    totalEnergy: { type: Number, required: true },
    pf: {
        type: Number,
        required: true,
        set: v => (parseFloat(v) || 0).toFixed(3)
    },
    deviceId: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});
// Définition du schéma MongoDB pour le prix
const priceSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Définition du modèle MongoDB pour le prix
const PriceEntry = mongoose.model('PriceEntry', priceSchema);

// Définition du modèle MongoDB pour l'historique
const HistoryEntry = mongoose.model('HistoryEntry', historyEntrySchema);

// Connexion à InfluxDB
const url = 'http://192.168.43.226:8086';
const token = 'jyFqlziDXVA0kl7522EUM25GRwa55ImM8FunNg4BUbM65NpSQ7OmZUotaRBTu1J1cWKUm5E8WPLE2KkNeBmgGg==';
const org = 'master';
const bucket = 'master_32';

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

// Fonction pour créer une requête Flux
const createFluxQuery = (field, sensor) => `
  from(bucket: "${bucket}")
    |> range(start: -1d)
    |> filter(fn: (r) => r["_measurement"] == "master_32_sensors")
    |> filter(fn: (r) => r["_field"] == "${field}")
    |> filter(fn: (r) => r["sensor"] == "${sensor}")
    |> aggregateWindow(every: 5m, fn: last, createEmpty: false)
    |> yield(name: "last")
`;


// Fonction pour interroger InfluxDB
const queryInfluxDB = async (fluxQuery) => {
    const data = [];
    const rows = await queryApi.collectRows(fluxQuery);
    rows.forEach((row) => {
        data.push(row);
    });
    return data;
};

const fields = ['power', 'voltage', 'current', 'energy', 'totalEnergy', 'frequency', 'pf', 'temperatureC','price'];


fields.forEach((field) => {
    app.get(`/api/data/:sensor/${field}`, async (req, res) => {
        const { sensor } = req.params;
        const fluxQuery = createFluxQuery(field, sensor);
        try {
            const data = await queryInfluxDB(fluxQuery);
            if (data.length === 0) {
                console.log(`Aucune donnée trouvée pour le champ : ${field}`);
            }
        
            res.json(data);
        } catch (error) {
            console.error(`Erreur lors de la requête InfluxDB pour le champ : ${field}`, error);
            res.status(500).send(error.toString());
        }
    });
});


// Connexion Socket.IO pour recevoir les données d'historique
io.on('connection', (socket) => {
    console.log(`Client connecté: ${socket.id}`);

    // Écoute des données historiques envoyées par le client
    socket.on('historicalData', async (data) => {
        console.log('Données historiques reçues:', data);

        const saveHistoryEntries = async (entries, deviceId) => {
            try {
                await Promise.all(entries.map(async (entry) => {
                    const historyEntry = new HistoryEntry({
                        energy: entry.energy,
                    temperatureC: entry.temperatureC,
                    totalEnergy: entry.totalEnergy,
                    price: entry.price,
                    pf: entry.pf,
                    deviceId,
                    });
                    await historyEntry.save();
                    console.log(`History entry saved successfully for device ${deviceId}:`, historyEntry);
                }));
            } catch (error) {
                console.error(`Error saving history entries for device ${deviceId}:`, error);
            }
        };

        if (data.device1_history && data.device1_history.length > 0) {
            await saveHistoryEntries(data.device1_history, 1);
        }

        if (data.device2_history && data.device2_history.length > 0) {
            await saveHistoryEntries(data.device2_history, 2);
        }
    });

    // Gestion de la déconnexion du client
    socket.on('disconnect', () => {
        console.log(`Client déconnecté: ${socket.id}`);
    });
});

// Route pour sauvegarder l'historique dans MongoDB
app.post('/save-history', async (req, res) => {
    const { device1_history, device2_history } = req.body;
    console.log('Received historical data:', req.body);

    const saveHistoryEntries = async (entries, deviceId) => {
        try {
            await Promise.all(entries.map(async (entry) => {
                const historyEntry = new HistoryEntry({
                    energy: entry.energy,
                    temperatureC: entry.temperatureC,
                    totalEnergy: entry.totalEnergy,
                    price: entry.price,
                    pf: entry.pf,
                    deviceId,
                });
                await historyEntry.save();
                console.log(`History entry saved successfully for device ${deviceId}:`, historyEntry);
            }));
        } catch (error) {
            console.error(`Error saving history entries for device ${deviceId}:`, error);
            throw error;
        }
    };

    try {
        if (device1_history && device1_history.length > 0) {
            await saveHistoryEntries(device1_history, 1);
        }

        if (device2_history && device2_history.length > 0) {
            await saveHistoryEntries(device2_history, 2);
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Error saving history entries');
    }
});

app.get('/api/history/:deviceId', async (req, res) => {
    const { deviceId } = req.params;

    try {
        const history = await HistoryEntry.find({ deviceId });
        if (!history || history.length === 0) {
            return res.status(404).json({ message: `Aucun historique trouvé pour l'appareil avec deviceId : ${deviceId}` });
        }
        res.json(history);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique :', error);
        res.status(500).send('Erreur lors de la récupération de l\'historique');
    }
});
app.get('/api/data/:sensor', async (req, res) => {
    const { sensor } = req.params;
    try {
        const results = {};
        const queries = fields.map(field => {
            const fluxQuery = createFluxQuery(field, sensor);
            return queryInfluxDB(fluxQuery)
                .then(data => {
                    results[field] = data;
                })
                .catch(error => {
                    console.error(`Erreur lors de la requête InfluxDB pour le champ : ${field}`, error);
                    results[field] = `Erreur lors de la récupération des données pour le champ : ${field}`;
                });
        });

        await Promise.all(queries);

        res.json(results);
    } catch (error) {
        console.error('Erreur lors de la récupération des données du capteur', error);
        res.status(500).send('Erreur lors de la récupération des données du capteur');
    }
});

app.get('/get-last-history', async (req, res) => {
    try {
        const lastHistoryEntries = await HistoryEntry.find().sort({ timestamp: -1 }).limit(10);

        if (!lastHistoryEntries || lastHistoryEntries.length === 0) {
            return res.status(404).json({ message: 'Aucune donnée historique trouvée' });
        }

        res.json(lastHistoryEntries);
    } catch (error) {
        console.error('Erreur lors de la récupération des dernières données historiques', error);
        res.status(500).send('Erreur lors de la récupération des dernières données historiques');
    }
});

app.get('/api/notifications', authMiddleware, async (req, res) => {
    try {
      const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
app.put('/api/notifications/:id/read', async (req, res) => {
    const notificationId = req.params.id;
  
    try {
      // Trouvez la notification par son ID et mettez à jour le champ "read"
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true } // Retourne le document mis à jour
      );
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.json({
        message: 'Notification marked as read',
        notification
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


app.use('/api/user', userRoutes);


// Route pour récupérer tous les liens
app.get('/api/links', async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        console.error('Erreur lors de la récupération des liens:', error);
        res.status(500).send('Erreur lors de la récupération des liens');
    }
});

// Route pour ajouter un lien
app.post('/api/links', async (req, res) => {
    const { path, label } = req.body;
    if (!path || !label) {

        return res.status(400).json({ message: 'URL et titre sont requis' });
    }


    try {
        const newLink = new Link({ path, label});
        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du lien:', error);
        res.status(500).send('Erreur lors de l\'ajout du lien');
    }
});

// Route pour mettre à jour un lien
app.put('/api/links/:id', async (req, res) => {
    const linkId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(linkId)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }    
    
    const { path, label } = req.body;

    try {
        const updatedLink = await Link.findByIdAndUpdate(linkId, { path, label }, { new: true });

        if (!updatedLink) {
            return res.status(404).json({ message: 'Lien non trouvé' });
        }

        res.status(200).json(updatedLink);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du lien:', error);
        res.status(500).send('Erreur lors de la mise à jour du lien');
    }
});

// Route pour supprimer un lien
app.delete('/api/links/:id', async (req, res) => {
    const linkId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(linkId)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }
  
    try {
      const deletedLink = await Link.findByIdAndDelete(linkId);
      if (!deletedLink) {
        return res.status(404).json({ message: "Lien non trouvé" });
      }
  
      res.status(200).json({ message: "Lien supprimé" });
    } catch (error) {
      console.error("Erreur lors de la suppression du lien :", error);
      res.status(500).send("Erreur lors de la suppression du lien");
    }
  });
  

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});



