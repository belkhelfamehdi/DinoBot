import { GoogleGenerativeAI } from "@google/generative-ai"

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { subject, chapter, parts, difficulty, customPrompt } = await req.json()

    // Mapping des difficultés
    const difficultyLevels: Record<number, string> = {
      1: "Niveau débutant - Explications très simples avec beaucoup d'exemples",
      2: "Niveau intermédiaire - Équilibre entre théorie et pratique",
      3: "Niveau avancé - Approche approfondie avec concepts complexes"
    }

    const systemPrompt = `Tu es un expert pédagogique en ${subject}.
Génère une fiche de révision complète et structurée.

**Sujet** : Chapitre ${chapter}
**Parties à couvrir** : ${parts.join(", ")}
**Niveau** : ${difficultyLevels[difficulty]}

${customPrompt ? `**Instructions personnalisées** : ${customPrompt}\n` : ''}

Structure obligatoire de la fiche :

# 📚 ${chapter}

## 🎯 Objectifs d'apprentissage
- Liste des compétences à maîtriser pour ce chapitre

## 📖 Résumé des concepts clés
${parts.map((part: string) => `### ${part}\n- Points essentiels\n- Définitions claires et précises`).join('\n\n')}

## 🔑 Formules et théorèmes importants
- Formules avec leurs conditions d'application
- Théorèmes avec démonstrations simplifiées (si pertinent)

## 💡 Exemples concrets
- 2-3 exemples détaillés par partie
- Applications pratiques dans la vie courante

## ⚠️ Pièges à éviter
- Erreurs courantes des élèves
- Confusions fréquentes
- Astuces pour les éviter

## ✅ Points de contrôle
- Questions pour s'auto-évaluer
- QCM rapide (5 questions avec réponses)

## 📝 Exercices types
- 3 exercices progressifs avec solutions détaillées

## 🎓 Méthodologie
- Comment aborder les exercices de ce chapitre
- Conseils pour les examens
- Temps recommandé pour maîtriser ce chapitre

---
**Ton** : Clair, pédagogique, motivant et bienveillant
**Format** : Markdown avec emojis pour faciliter la lecture
**Longueur** : Complète mais concise (adapte selon la difficulté)`

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 3000,
        temperature: 0.7,
      }
    })

    const result = await model.generateContent(systemPrompt)
    const ficheContent = result.response.text()

    return Response.json({ 
      success: true,
      fiche: ficheContent,
      metadata: {
        subject,
        chapter,
        parts,
        difficulty,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erreur génération fiche:', error)
    return Response.json({ 
      success: false, 
      error: 'Erreur lors de la génération de la fiche' 
    }, { status: 500 })
  }
}
