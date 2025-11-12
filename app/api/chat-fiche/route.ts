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
Tu dois créer du contenu pédagogique complet sur le chapitre "${chapitre}".

${contexte ? `Contenu du cours à utiliser :\n${contexte}` : ""}

IMPORTANT - Tu dois générer un JSON avec 3 parties :

{
  "revision": {
    "definitions": [
      {
        "title": "Titre du concept",
        "definition": "Explication claire et concise"
      }
    ],
    "formulas": [
      {
        "title": "Formule mathématique",
        "explanation": "Ce que représente la formule",
        "example": "Application numérique concrète"
      }
    ],
    "examples": [
      {
        "question": "Exercice concret",
        "answer": "Solution détaillée étape par étape"
      }
    ],
    "revisionCards": [
      {
        "title": "Conseil méthodologique principal",
        "methods": ["Méthode 1", "Méthode 2", "Méthode 3", "Méthode 4", "Méthode 5"]
      }
    ],
    "errors": [
      {
        "title": "Description de l'erreur fréquente",
        "advice": "Comment l'éviter"
      }
    ]
  },
  "flashcards": [
    {
      "question": "Question concise et directe",
      "answer": "Réponse précise en 1-2 phrases max"
    }
  ],
  "quiz": [
    {
      "question": "Question du quiz",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Explication de la bonne réponse"
    }
  ]
}

Consignes :
- Crée 4-6 définitions
- Crée 3-4 formules avec exemples
- Crée 3-4 exercices types
- Crée 1-2 conseils de révision avec 5 méthodes chacun
- Crée 2-3 erreurs courantes
- Crée 8-12 flashcards
- Crée 6-10 questions de quiz (4 options chacune)
- Niveau de difficulté : ${difficulte}/3
- ${niveauDifficulte}
${promptPerso ? `- Demandes spécifiques : ${promptPerso}` : ""}

RETOURNE UNIQUEMENT LE JSON, SANS MARKDOWN NI TEXTE SUPPLÉMENTAIRE.`

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Génère le JSON complet avec revision, flashcards et quiz." }
    ],
    temperature: 0.7,
  })

  const textStream = result.textStream
  let fullText = ""

  for await (const chunk of textStream) {
    fullText += chunk
  }

  // Parser le JSON
  let parsedData
  try {
    // Nettoyer le texte (enlever les markdown code blocks si présents)
    const cleanText = fullText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    parsedData = JSON.parse(cleanText)
  } catch (error) {
    console.error("Erreur de parsing JSON:", error)
    return Response.json({ 
      success: false,
      error: "Format de réponse invalide",
      rawResponse: fullText
    }, { status: 500 })
  }

  return Response.json({ 
    success: true,
    data: parsedData,
    metadata: {
      cours,
      chapitre,
      parties,
      difficulte
    }
  })
}
