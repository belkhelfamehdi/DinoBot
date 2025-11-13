# 🦖 DinoExam - Générateur de fiches pédagogiques

## 📖 Description
Application de génération automatique de fiches de révision à partir de cours existants.

## 🚀 Installation locale

### Prérequis
- Node.js 18+
- npm ou pnpm

### Étapes
1. Cloner le projet
\`\`\`bash
git clone <votre-repo>
cd dinoexam
\`\`\`

2. Installer les dépendances
\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

3. Configurer les variables d'environnement
\`\`\`bash
cp .env.example .env.local
\`\`\`
Puis ajouter votre clé API Groq dans `.env.local`

4. Lancer le serveur
\`\`\`bash
npm run dev
\`\`\`

5. Ouvrir http://localhost:3000

## 🔑 Variables d'environnement
- `GROQ_API_KEY` : Clé API Groq (https://console.groq.com)

## 🎯 Fonctionnalités
- ✅ Génération de fiches depuis base de données de cours
- ✅ Flashcards interactives
- ✅ Quiz avec corrections
- ✅ Sauvegarde locale des fiches
- ✅ 4 matières : Chimie, Physique, Maths, SVT

## 🛠️ Technologies
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Groq AI
- Vercel AI SDK

## 📝 Choix techniques
- **sessionStorage** : Persistance côté client (simple et rapide)
- **Groq LLM** : Modèle performant et gratuit
- **shadcn/ui** : Composants réutilisables et accessibles
- **Streaming** : Affichage progressif de la génération

## 🚀 Déploiement
Déployé sur Vercel : [lien-de-votre-app]

## 👤 Auteur
[Votre nom]