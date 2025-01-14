#!/bin/bash

# Installation de @mermaid-js/mermaid-cli si nécessaire
if ! command -v mmdc &> /dev/null; then
    echo "Installing @mermaid-js/mermaid-cli..."
    npm install -g @mermaid-js/mermaid-cli
fi

# Création du dossier images s'il n'existe pas
mkdir -p images

# Liste des diagrammes à générer
DIAGRAMS=(
    "abstract_factory"
    "builder"
    "factory_method"
    "composite"
    "observer"
    "decorator"
    "iterator"
    "template_method"
)

# Extraction et conversion des diagrammes
for diagram in "${DIAGRAMS[@]}"; do
    echo "Generating $diagram diagram..."
    
    # Extraction du diagramme Mermaid
    sed -n "/## [0-9]\. .*Pattern.*$diagram/,/\`\`\`$/p" design_patterns.md | \
    sed '1d;$d' | \
    sed '/^$/d' > "images/$diagram.mmd"
    
    # Conversion en PNG
    mmdc -i "images/$diagram.mmd" -o "images/$diagram.png" -b transparent
    
    # Nettoyage du fichier temporaire
    rm "images/$diagram.mmd"
done

echo "All diagrams have been generated in the images directory!"
