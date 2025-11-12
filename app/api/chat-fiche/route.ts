import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

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

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.7,
  })

  const textStream = result.textStream
  let fullText = ""

  for await (const chunk of textStream) {
    fullText += chunk
  }

  return Response.json({ response: fullText })
}
