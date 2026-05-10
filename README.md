# DinoBot - Générateur de Fiches Pédagogiques

DinoBot est une application web éducative qui génère automatiquement des fiches de révision, des flashcards et des quiz personnalisés à partir de cours existants, en utilisant l'intelligence artificielle.

**Demo en ligne** : https://dino-bot-theta.vercel.app

---

## Fonctionnalités

### 1. Fiches de Révision
Génération automatique de fiches pédagogiques complètes contenant :
- Définitions (4-6 concepts)
- Formules (3-4 avec exemples numériques)
- Exercices corrigés (3-4 avec solutions détaillées)
- Méthodes de travail (5 méthodes)
- Erreurs fréquentes (2-3)

### 2. Flashcards
- 8-12 cartes interactives pour l'apprentissage par répétition espacée
- Navigation par swipe
- Optimisé pour mobile

### 3. Quiz
- 6-10 questions à choix multiples
- Correction automatique avec score
- Explications détaillées des réponses

### Matières Supportées
- Physique
- Chimie
- Mathématiques
- SVT (Sciences de la Vie et de la Terre)

### Niveaux de Difficulté
- **Niveau 1** : Langage simple avec exemples concrets
- **Niveau 2** : Intermédiaire avec explications claires
- **Niveau 3** : Avancé avec démonstrations complexes

---

## Installation

### Prérequis
- Node.js 18+
- Clé API Groq (obtenue sur [console.groq.com](https://console.groq.com))

### Étapes

1. **Cloner le projet**
```bash
git clone https://github.com/username/dinobot.git
cd dinobot
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```
Éditer `.env.local` et ajouter votre clé API Groq :
```
GROQ_API_KEY=your_groq_api_key_here
```

4. **Lancer en développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

---

## Architecture

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── generation/         # Génération de fiches
│   ├── flashcards/        # Affichage des flashcards
│   ├── quiz/              # Affichage des quiz
│   └── sheets/            # Affichage des fiches
├── components/            # Composants UI réutilisables
├── data/                  # Base de données des cours
├── lib/                   # Logique métier et prompts IA
│   ├── prompts/          # Prompts pour l'API Groq
│   └── utils/            # Utilitaires
└── types/                # Types TypeScript
```

---

## Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + Radix UI
- **IA** : Groq API (Llama 3.3-70B) via SDK `@ai-sdk/groq`
- **Deploy** : Vercel

---

## Choix Techniques

1. **API Groq** : Choix pour la rapidité d'inférence et le coût réduit
2. **Stockage session** : Les données générées sont stockées en local (sessionStorage) pour limiter les appels API
3. **JSON Schema** : Utilisation de schemas stricts pour garantir des réponses JSON valides de l'IA
4. **Radix UI** : Composants headless pour un contrôle total du style

---

## Licence

MIT
