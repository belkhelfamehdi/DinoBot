import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"
import { coursesData } from "@/data/courses"

export const maxDuration = 30

export async function POST(req: Request) {
  const { 
    cours,
    chapitre,
    parties,
    difficulte,
    promptPerso
  } = await req.json()

  // Récupérer le contenu du cours depuis la data
  const subject = coursesData.subjects.find(s => s.name === cours)
  const chapter = subject?.chapters.find(c => c.name === chapitre)
  
  // Construire le contexte à partir des parties sélectionnées
  let contexte = ""
  if (chapter && parties && parties.length > 0) {
    for (const partieName of parties) {
      const partie = chapter.parts.find(p => p.name === partieName)
      if (partie) {
        contexte += `\n\n## ${partie.name}\n${partie.content}`
      }
    }
  }

  // Adapter le niveau selon la difficulté
  let niveauDifficulte = ""
  if (difficulte === 1) {
    niveauDifficulte = "Utilise un langage simple et des exemples très concrets. Décompose bien chaque étape."
  } else if (difficulte === 2) {
    niveauDifficulte = "Utilise un niveau intermédiaire avec des explications claires et des exemples."
  } else {
    niveauDifficulte = "Utilise un niveau avancé avec des concepts plus complexes et des démonstrations rigoureuses."
  }

  const systemPrompt = `Tu es DinoBot, un assistant pédagogique sympathique et expert en ${cours}. 
Tu dois créer une fiche de révision complète ET des flashcards sur le chapitre "${chapitre}".

${contexte ? `Contenu du cours à utiliser :\n${contexte}` : ""}

INSTRUCTIONS - Tu dois générer 2 formats distincts :

════════════════════════════════════════
📚 PARTIE 1 : FICHE DE RÉVISION
════════════════════════════════════════

Structure OBLIGATOIRE avec sections cliquables :

## 📝 DÉFINITIONS
Crée 4-6 cartes de définitions (format compact pour affichage en cartes) :
**Titre :** [Nom du concept]
**Définition :** [Explication claire en 1-2 phrases]

## 📐 FORMULES CLÉS
Crée 3-4 cartes de formules avec applications :
**Formule :** [Expression mathématique]
**Explication :** [Ce que représente la formule]
**Exemple :** [Application numérique concrète]

## 💡 EXEMPLES D'APPLICATION
Crée 3-4 exercices types question/réponse :
**Question :** [Exercice concret]
**Réponse :** [Solution détaillée étape par étape]

## 🎯 POINTS CLÉS À RETENIR
Crée 1-2 conseils méthodologiques :
**Conseil :** [Conseil principal en 1 phrase]
**Méthodes :**
• [Méthode pratique 1]
• [Méthode pratique 2]
• [Méthode pratique 3]
• [Méthode pratique 4]
• [Méthode pratique 5]

## ⚠️ ERREURS COURANTES
Crée 2-3 pièges à éviter :
**Erreur :** [Description de l'erreur fréquente]
**Conseil :** [Comment l'éviter]

════════════════════════════════════════
🎴 PARTIE 2 : FLASHCARDS
════════════════════════════════════════

Crée 8-12 flashcards (questions courtes, réponses claires) :

[FLASHCARD 1]
Question: [Question concise et directe]
Réponse: [Réponse précise en 1-2 phrases max]

[FLASHCARD 2]
Question: [Question concise et directe]
Réponse: [Réponse précise en 1-2 phrases max]

... (continue jusqu'à 8-12 flashcards)

════════════════════════════════════════

Consignes supplémentaires :
- Niveau de difficulté : ${difficulte}/3
- ${niveauDifficulte}
${promptPerso ? `- Demandes spécifiques : ${promptPerso}` : ""}

IMPORTANT : 
- Sépare bien les 2 parties avec les délimiteurs ════
- Utilise les emojis et formats EXACTEMENT comme indiqué
- Les flashcards doivent être courtes et mémorisables
- La fiche doit être détaillée et complète`

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Génère maintenant la fiche de révision complète." }
    ],
    temperature: 0.7,
  })

  const textStream = result.textStream
  let fullText = ""

  for await (const chunk of textStream) {
    fullText += chunk
  }

  return Response.json({ 
    success: true,
    response: fullText,
    metadata: {
      cours,
      chapitre,
      parties,
      difficulte
    }
  })
}
