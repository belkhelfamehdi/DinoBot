# DinoBot — Refonte UI & Optimisation

**Date :** 2026-05-13  
**Statut :** Validé

---

## Contexte

DinoBot est une app web Next.js 16 / React 19 / Tailwind v4 permettant aux étudiants de générer des fiches de révision, flashcards et quiz via l'IA (Groq/Llama). Le code existant a été produit par un développeur amateur ; il est fonctionnel mais comporte plusieurs problèmes structurels et des bugs qui dégradent l'expérience utilisateur.

---

## Problèmes identifiés

| Problème | Impact |
|---|---|
| Header dupliqué dans chaque page | Maintenance impossible, incohérences visuelles |
| Background blobs dupliqués dans chaque page | Même problème |
| `sessionStorage` pour la persistance | Données perdues à la fermeture de l'onglet |
| Classes Tailwind dynamiques (`text-${color}-500`) | Les couleurs ne s'affichent pas (purge CSS) |
| `streamText` + accumulation manuelle dans l'API | Streaming inutilisé, code incohérent |
| Double barre de modes sur `/fiches/revision` | UX confuse, navigation en double |
| Sélecteur de matière sur `/fiches/flashcard` | Ne fait rien, code mort |
| `app/accueil/` — redirect client incorrecte | `redirect()` serveur utilisé dans un composant client |
| Options "Bientôt" (PDF, Examen) non fonctionnelles | Fausse promesse utilisateur |
| Aucun dark/light mode toggle | Variables CSS prêtes mais inaccessibles |
| Page `/cours` a sa propre sidebar shadcn isolée | Incohérent avec le reste de l'app |

---

## Décisions de design

| Sujet | Décision |
|---|---|
| Structure de navigation | Sidebar icônes verticale (68px), partagée via route group `(app)` |
| Persistance des données | `localStorage` — fiches conservées entre sessions |
| Thème | Toggle dark/light dans la sidebar, `defaultTheme="system"` via `next-themes` |
| Options "Bientôt" | Supprimées — page `/fiches/creer-fiche` ne garde que l'option Base de données |

---

## Architecture

### Route groups Next.js

```
app/
├── (app)/                        ← route group : layout partagé
│   ├── layout.tsx                ← sidebar + ThemeProvider + background
│   ├── page.tsx                  ← accueil
│   ├── fiches/
│   │   ├── page.tsx              ← liste des fiches
│   │   ├── creer-fiche/
│   │   │   ├── page.tsx          ← choix matière + génération (simplifié)
│   │   │   └── database/
│   │   │       └── page.tsx      ← configuration chapitre/parties
│   │   ├── revision/
│   │   │   └── page.tsx          ← fiche + quiz (tabs unifiés)
│   │   └── flashcard/
│   │       └── page.tsx          ← flashcards
│   └── cours/
│       └── page.tsx              ← cours par matière
├── accueil/                      ← SUPPRIMÉ
├── api/
│   └── chat-fiche/
│       └── route.ts              ← generateText (remplace streamText)
├── globals.css
└── layout.tsx                    ← root (fonts, Toaster, html/body)
```

### Composant sidebar (`components/app-sidebar.tsx`)

- Largeur fixe 68px
- Logo DinoBot en haut (gradient purple→pink)
- 3 liens de navigation avec icône + tooltip au survol : Accueil, Fiches, Cours
- Bouton "+" (Créer une fiche) avec style gradient, prominent
- Toggle dark/light en bas
- Indicateur de page active : fond `purple/20` + barre gauche `purple`
- Sur mobile : drawer latéral accessible via bouton burger

---

## Changements par fichier

### `app/(app)/layout.tsx` — NOUVEAU
- Importe et monte `<AppSidebar>`
- Enveloppe `children` dans `<ThemeProvider defaultTheme="system" storageKey="dinobot-theme">`
- Background blobs ici (une seule fois)
- Retire la duplication du `<Toaster>` (reste dans le root layout)

### `app/(app)/page.tsx` — MODIFIÉ
- Suppression du header et des background blobs (hérités du layout)
- Stats : `ficheCount` lit depuis `localStorage` au lieu de `sessionStorage`
- Fix classes Tailwind dynamiques → classes statiques hardcodées par couleur

### `app/(app)/fiches/page.tsx` — MODIFIÉ
- Suppression header, background blobs
- Lecture fiches depuis `localStorage`
- Suppression modal matière → remplacer par un simple `<select>` ou pills dans la page

### `app/(app)/fiches/creer-fiche/page.tsx` — SIMPLIFIÉ
- Suppression des options "Bientôt" (PDF, Examen)
- Sélection matière directement via pills cliquables sur la page
- Redirige directement vers `/fiches/creer-fiche/database?subject=X`

### `app/(app)/fiches/creer-fiche/database/page.tsx` — MODIFIÉ
- Suppression header
- Écriture dans `localStorage` au lieu de `sessionStorage`

### `app/(app)/fiches/revision/page.tsx` — MODIFIÉ
- Suppression header
- **Une seule barre de tabs** : Fiche · Infos clés · Flashcards · Quiz (suppression de la double barre)
- Lecture depuis `localStorage`

### `app/(app)/fiches/flashcard/page.tsx` — MODIFIÉ
- Suppression header
- Suppression du sélecteur de matière (code mort)
- Lecture depuis `localStorage`

### `app/(app)/cours/page.tsx` — MODIFIÉ
- Suppression du `<SidebarProvider>` local shadcn (remplacé par la sidebar globale)
- Suppression header

### `app/api/chat-fiche/route.ts` — MODIFIÉ
- Remplace `streamText` + accumulation manuelle par `generateText`
- Même comportement, code plus clair

### `app/accueil/` — SUPPRIMÉ
- Dossier entier supprimé

### `components/app-sidebar.tsx` — NOUVEAU
- Composant sidebar avec navigation, CTA, toggle thème
- Utilise `usePathname()` pour l'état actif
- Tooltips via `<Tooltip>` shadcn/ui

---

## Corrections de code (hors UI)

1. **localStorage** — toutes les lectures/écritures `sessionStorage` → `localStorage`
2. **Classes Tailwind statiques** — dans `page.tsx`, les features cards utilisent des classes dynamiques cassées ; remplacer par un mapping statique couleur→classes
3. **generateText** — dans `api/chat-fiche/route.ts`, remplace le pattern `streamText` + boucle manuelle
4. **redirect() client** — `app/accueil/page.tsx` utilise `redirect()` serveur dans un composant client ; supprimé car inutile

---

## Ce qui ne change pas

- Le design visuel global (couleurs, typographie, style glassmorphism)
- La logique de génération IA (prompt, structure JSON)
- Les données de cours (`data/courses.ts`)
- Le root layout (`app/layout.tsx`)
- Les composants shadcn/ui dans `components/ui/`
