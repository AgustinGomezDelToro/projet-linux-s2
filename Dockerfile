# Étape de construction
# On commence avec une image node:14 comme base, que nous nommons "build"
FROM node:14 AS build
# Nous définissons /app comme le répertoire de travail
WORKDIR /app

# Nous copions les fichiers package.json et package-lock.json  dans le répertoire de travail
COPY package*.json ./

# Nous installons les dépendances du projet en utilisant npm install
RUN npm install

# Nous copions le reste des fichiers dans le répertoire de travail
COPY . .

# Nous exécutons le script de build pour créer une version optimisée de l'application
RUN npm run build

# Production
# Nous commençons une nouvelle étape avec nginx:stable-alpine comme base, que nous nommons "production"
FROM nginx:stable-alpine AS production

# Nous copions les fichiers de build depuis l'étape "build" vers le répertoire de nginx où il va servir les fichiers statiques
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Nous exposons le port 4000 pour que l'application soit accessible
EXPOSE 4000

# Nous démarrons nginx en mode premier plan pour qu'il puisse recevoir les signaux Docker
CMD ["nginx", "-g", "daemon off;"]
