# Utiliser une image node officielle comme base
FROM node:20.11.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install --legacy-peer-deps

# Copier le reste du code de l'application
COPY . .

# Exposer le port que l'application va utiliser
EXPOSE 3000

# Commande pour lancer l'application
CMD ["npm", "start"]
