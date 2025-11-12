import { GoogleGenerativeAI } from "@google/generative-ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { message, subject, topic } = await req.json()

  const systemPrompt = `Tu es DinoBot, un assistant pédagogique sympathique et expert en ${subject}. 
Tu aides les élèves à comprendre le cours sur "${topic}".

Contexte du cours sur les Acides et Bases :
- Modèles acide-base : Arrhenius, Brønsted-Lowry, Lewis
- Couple acide-base : AH/A⁻
- Calcul de pH : pH = −log₁₀[H₃O⁺]
- pH < 7 : acide, pH = 7 : neutre, pH > 7 : basique
- Solutions tampons : résistent aux variations de pH

Réponds de manière claire, pédagogique et encourageante. Utilise des exemples concrets quand c'est pertinent.
Si l'élève pose une question hors sujet, ramène-le gentiment au cours.`

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent({
    contents: [
      { role: "user", parts: [{ text: systemPrompt + "\n\n" + message }] }
    ],
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
    },
  })

  const fullText = result.response.text()

  return Response.json({ response: fullText })
}
