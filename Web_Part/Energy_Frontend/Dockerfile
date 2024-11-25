# Utiliser une image de base officielle Node.js
FROM node:20.11.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install --legacy-peer-deps

# Copier le reste du code de l'application
COPY . .

# Exposer le port que l'application va utiliser
EXPOSE 3001

# Définir la commande pour lancer l'application
CMD ["npm", "start"]
