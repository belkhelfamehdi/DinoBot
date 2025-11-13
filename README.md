# DinoExam - Générateur de fiches pédagogiques

---

## Comment lancer le projet en local

### Prérequis
- Node.js 18 ou supérieur
- pnpm (gestionnaire de paquets)

### Installation

1. **Installer pnpm** (si ce n'est pas déjà fait)
```bash
npm install -g pnpm
```

2. **Cloner le projet**
```bash
git clone https://github.com/belkhelfamehdi/DinoBot.git
cd DinoBot
```

3. **Installer les dépendances**
```bash
pnpm install
```

4. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :
```bash
GROQ_API_KEY=votre_clé_api_groq
```

> Pour obtenir une clé API Groq gratuite : https://console.groq.com

5. **Lancer le serveur de développement**
```bash
pnpm dev
```

6. **Accéder à l'application**
```
http://localhost:3000
```

---

## Fonctionnalités implémentées

- **Génération automatique de fiches pédagogiques** à partir de cours existants  
- **4 matières disponibles** : Chimie, Physique, Mathématiques, SVT  
- **Génération de 3 types de contenu** :
- Fiche de révision (définitions, formules, exercices, conseils, erreurs courantes)
- Flashcards interactives
- Quiz avec corrections et explications  

- **Sauvegarde automatique** des fiches générées dans sessionStorage

---

## Technologies utilisées

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Groq AI** (llama-3.3-70b-versatile)

---

## Choix techniques

### Architecture
- **sessionStorage** : Persistance côté client simple et rapide pour le prototype

### Génération de contenu
- **Groq AI** : API gratuite, rapide et performante pour la génération de contenu pédagogique

### Interface utilisateur
- **shadcn/ui** : Composants modernes, accessibles et personnalisables
- **Tailwind CSS** : Styling rapide et maintenable

---

## Déploiement

L'application est déployée sur Vercel et accessible à l'adresse :  
**https://dino-bot-theta.vercel.app**

Pour générer une fiche :  
**https://dino-bot-theta.vercel.app/fiches/creer-fiche/database**

---