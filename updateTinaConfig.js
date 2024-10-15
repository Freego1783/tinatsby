const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de configuration de TinaCMS
const tinaConfigPath = path.join(__dirname, './tina/config.ts');

// Lire le contenu du fichier
fs.readFile(tinaConfigPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier tina.config.ts:', err);
        return;
    }

    // Rechercher et remplacer `client: { skip: false }` par `client: { skip: true }`
    const updatedConfig = data.replace(/client:\s*{ skip:\s*false\s*}/, 'client: { skip: true }');

    // Écrire les modifications dans le fichier
    fs.writeFile(tinaConfigPath, updatedConfig, 'utf8', (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture du fichier tina.config.ts:", err);
            return;
        }
        console.log('Configuration TinaCMS mise à jour: client.skip est maintenant à true');
    });
});
