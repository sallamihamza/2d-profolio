# Portfolio 2D - Hamza Sallemi

Portfolio interactif sous forme de jeu 2D développé avec React, Vite et Kaplay. Explorez ma maison virtuelle pour découvrir mes compétences, projets et expériences de manière ludique.

## Démo en ligne

## Fonctionnalités

- Exploration interactive dans un environnement 2D pixelisé
- Dialogues contextuels avec informations personnelles
- Liens cliquables vers GitHub, LinkedIn et autres réseaux
- Animations fluides du personnage avec système de caméra
- Design rétro inspiré des jeux classiques
- Responsive et compatible desktop/tablette
- Shaders animés pour le fond

## Technologies utilisées

- React 18+
- Vite 5+
- Kaplay.js
- JavaScript/TypeScript
- Node.js

## Installation

git clone https://github.com/sallamihamza/2d-profolio.git
cd 2d-profolio
npm install
npm run dev

Accessible sur http://localhost:5173

## Contrôles

Flèches directionnelles ou ZQSD : Déplacer le personnage
Espace : Interagir avec les objets
Clic gauche : Navigation sur mobile

## Déploiement Vercel

1. Créez un repository GitHub
2. Poussez votre code

git add .
git commit -m "Initial commit"
git push -u origin main

3. Allez sur vercel.com
4. Cliquez sur "Add New Project"
5. Importez votre repository GitHub
6. Vercel détectera Vite automatiquement
7. Cliquez sur "Deploy"

Chaque git push déclenchera un nouveau déploiement automatique.

## Structure du projet

2d-profolio/
├── public/
│   ├── assets/
│   │   ├── sprites/
│   │   ├── logos/
│   │   ├── projects/
│   │   ├── fonts/
│   │   └── shaders/
│   ├── configs/
│   │   ├── generalData.json
│   │   ├── socialsData.json
│   │   ├── skillsData.json
│   │   ├── experiencesData.json
│   │   └── projectsData.json
│   └── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── kaplayCtx.js
│   ├── constants.js
│   ├── store.js
│   ├── entities/
│   │   └── Player.js
│   ├── components/
│   │   ├── Section.js
│   │   ├── SocialIcon.js
│   │   ├── EmailIcon.js
│   │   ├── SkillIcon.js
│   │   ├── WorkExperienceCard.js
│   │   └── ProjectCard.js
│   ├── utils/
│   │   └── animations.js
│   └── styles/
│       └── index.css
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md

## Scripts disponibles

npm run dev        Serveur de développement avec HMR
npm run build      Build de production
npm run preview    Prévisualiser le build
npm run lint       Analyser le code

## Fichiers de configuration

Modifiez les fichiers JSON dans public/configs/ pour personnaliser votre portfolio:

- generalData.json : Titre, sous-titre, noms des sections
- socialsData.json : Réseaux sociaux et email
- skillsData.json : Vos compétences techniques
- experiencesData.json : Votre expérience professionnelle
- projectsData.json : Vos projets

## Personnalisation

Modifier les dialogues :
Éditez les fichiers JSON dans public/configs/

Changer le personnage :
Remplacez public/assets/sprites/player.png
Format recommandé : 12 colonnes x 4 lignes

Créer une nouvelle map :
1. Téléchargez Tiled Map Editor
2. Créez votre map
3. Exportez en JSON
4. Intégrez dans votre code

## Résolution de problèmes

Erreur "Module not found" :
rm -rf node_modules package-lock.json
npm install
npm run dev

Erreur 404 sur Vercel :
Vérifiez que vercel.json existe avec la configuration correcte

Images non chargées :
Vérifiez les chemins des assets dans public/

## Ressources

Documentation Kaplay : https://kaplayjs.com/
Tutoriel JSLegendDev : https://www.youtube.com/watch?v=zxbdPPrLL6A
Documentation Vite : https://vitejs.dev/
Guide Vercel : https://vercel.com/docs/frameworks/vite
Tiled Map Editor : https://www.mapeditor.org/

## Auteur

Hamza Sallemi
Portfolio : https://2d-profolio.vercel.app
GitHub : https://github.com/sallamihamza
LinkedIn : https://linkedin.com/in/hamza-sallemi

## Remerciements

JSLegendDev pour le tutoriel original
Kaplay.js pour la librairie de jeu 2D
Vite pour le build tool rapide
Vercel pour l'hébergement gratuit
