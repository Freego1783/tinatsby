const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Chemin du dossier contenant les fichiers .gql
const gqlDir = path.join(__dirname, './tina/__generated__');
const outputFilePath = path.join(gqlDir, 'queries.js');

// Fonction pour générer les requêtes
const generateQueries = () => {
    fs.writeFileSync(outputFilePath, ''); // Réinitialiser le fichier
    fs.readdirSync(gqlDir).forEach((file) => {
        if (file.endsWith('.gql')) {
            const gqlContent = fs.readFileSync(path.join(gqlDir, file), 'utf-8');
            const gqlName = path.basename(file, '.gql');
            fs.appendFileSync(outputFilePath, `export const ${gqlName}Query = \`${gqlContent}\`;\n`);
        }
    });
    console.log('Fichier queries.js généré avec succès!');
};

// Appelle la fonction de génération des queries
generateQueries();
