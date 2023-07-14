#!/bin/bash

# Vérifier si le premier paramètre est une date ou un chemin
if [[ $1 =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  DATE=$1
  BACKUP_DIR=""
elif [[ $1 =~ ^/.* ]]; then
  BACKUP_DIR=$1
  DATE=$(date +'%Y-%m-%d')
else
  DATE=$(date +'%Y-%m-%d')
  BACKUP_DIR=""
fi

# Récupérer la date et l'heure actuelles pour construire le nom de la sauvegarde
CURRENT_DATETIME=$(date +'%Y-%m-%d-%Hh%M')

# Si la date est fournie en tant que paramètre, utiliser cette date dans le nom de la sauvegarde
if [ -n "$DATE" ]; then
  CURRENT_DATETIME="$DATE-$(date +'%Hh%M')"
fi

# Si le répertoire de sauvegarde n'est pas fourni, demander à l'utilisateur
if [ -z "$BACKUP_DIR" ]; then
  read -p "Entrez le répertoire de sauvegarde : " BACKUP_DIR
fi

# Créer le répertoire de sauvegarde s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# Vérifier si un fichier de numéro de sauvegarde existe
if [ -f "$BACKUP_DIR/last_backup_number.txt" ]; then
  # Lire le dernier numéro de sauvegarde depuis le fichier
  LAST_BACKUP_NUMBER=$(cat "$BACKUP_DIR/last_backup_number.txt")
  # Incrémenter le numéro de sauvegarde
  NEXT_BACKUP_NUMBER=$((LAST_BACKUP_NUMBER + 1))
else
  # Si le fichier de numéro de sauvegarde n'existe pas, commencer à partir de 1
  NEXT_BACKUP_NUMBER=1
fi

# Enregistrer le nouveau numéro de sauvegarde dans le fichier
echo "$NEXT_BACKUP_NUMBER" > "$BACKUP_DIR/last_backup_number.txt"

# Construire le nom du dossier de sauvegarde
BACKUP_FOLDER_NAME="${NEXT_BACKUP_NUMBER} - ${CURRENT_DATETIME}"

# Créer le dossier de sauvegarde
BACKUP_FOLDER_PATH="$BACKUP_DIR/$BACKUP_FOLDER_NAME"
mkdir -p "$BACKUP_FOLDER_PATH"

# Récupérer le chemin du répertoire contenant les fichiers sources de l'application React
SOURCE_DIR="/Users/tino/WebstormProjects/projet-linux-s2"

# Ignorer les répertoires "node_modules" et "Backup" lors de la synchronisation
rsync -avz --exclude 'node_modules' --exclude 'Backup' "$SOURCE_DIR" "$BACKUP_FOLDER_PATH"

# Vérifier si la sauvegarde a réussi
if [ $? -eq 0 ]; then
  echo "Sauvegarde créée avec succès dans : $BACKUP_FOLDER_PATH"
else
  echo "Erreur lors de la création de la sauvegarde."
fi
