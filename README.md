# DinoExam - Générateur de fiches pédagogiques

---

## Comment lancer le projet en local

### Prérequis
- Node.js 18 ou supérieur
- npm ou pnpm

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/belkhelfamehdi/DinoBot.git
cd DinoBot
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :
```bash
GROQ_API_KEY=votre_clé_api_groq
```

> Pour obtenir une clé API Groq gratuite : https://console.groq.com

4. **Lancer le serveur de développement**
```bash
pnpm dev
```

5. **Accéder à l'application**
```
http://localhost:3000
```

---

## Fonctionnalités implémentées

✅ **Génération automatique de fiches pédagogiques** à partir de cours existants  
✅ **4 matières disponibles** : Chimie, Physique, Mathématiques, SVT  
✅ **Personnalisation du niveau de difficulté** (1 à 3)  
✅ **Génération de 3 types de contenu** :
- Fiche de révision (définitions, formules, exercices, conseils, erreurs courantes)
- Flashcards interactives
- Quiz avec corrections et explications  

✅ **Sauvegarde automatique** des fiches générées  
✅ **Interface responsive** et intuitive

---

## Technologies utilisées

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Groq AI** (llama-3.3-70b-versatile)
- **Vercel AI SDK**

---

## Choix techniques

### Architecture
- **Next.js App Router** : Pour une structure moderne avec Server et Client Components
- **TypeScript** : Typage strict pour éviter les erreurs et améliorer la maintenabilité
- **sessionStorage** : Persistance côté client simple et rapide pour le prototype

### Génération de contenu
- **Groq AI** : API gratuite, rapide et performante pour la génération de contenu pédagogique

### Interface utilisateur
- **shadcn/ui** : Composants modernes, accessibles et personnalisables
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Tailwind CSS** : Styling rapide et maintenable

---

## Déploiement

L'application est déployée sur Vercel et accessible à l'adresse :  
**https://dino-bot-theta.vercel.app/fiches/revision**

---