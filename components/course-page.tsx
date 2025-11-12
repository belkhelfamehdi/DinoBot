"use client"

import { useState, type TouchEvent } from "react"
import { ChevronLeft, MoreVertical, X, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function CoursePage() {
  const [selectedSubject, setSelectedSubject] = useState("Physique-Chimie")
  const [activeSubTab, setActiveSubTab] = useState<"fiche" | "infos">("fiche")
  const [subjectSelectorOpen, setSubjectSelectorOpen] = useState(false)
  const [section1Open, setSection1Open] = useState(true)
  const [section2Open, setSection2Open] = useState(true)

  const [exemplesOpen, setExemplesOpen] = useState(true)
  const [currentExampleCard, setCurrentExampleCard] = useState(0) // Added for example card navigation
  const [definitionsOpen, setDefinitionsOpen] = useState(true)
  const [currentDefinitionCard, setCurrentDefinitionCard] = useState(0) // Added for definition card navigation
  const [formulesOpen, setFormulesOpen] = useState(true)
  const [currentFormulaCard, setCurrentFormulaCard] = useState(0) // Added for formula card navigation
  const [conseilsOpen, setConseilsOpen] = useState(true)
  const [currentRevisionCard, setCurrentRevisionCard] = useState(0) // Added for revision card navigation
  const [demonstrationsOpen, setDemonstrationsOpen] = useState(true)
  const [currentDemoCard, setCurrentDemoCard] = useState(0) // Added for demo card navigation
  const [erreursOpen, setErreursOpen] = useState(true)
  const [currentErrorCard, setCurrentErrorCard] = useState(0) // Added for error card navigation

  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (currentCard: number, setCard: (n: number) => void, totalCards: number) => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      if (currentCard < totalCards - 1) {
        setCard(currentCard + 1)
      }
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      if (currentCard > 0) {
        setCard(currentCard - 1)
      }
    }
  }

  const subjects = [
    { name: "Mathématiques", icon: "📐", color: "from-[#C8D8FF] to-[#D8E4FF]" },
    { name: "Physique-Chimie", icon: "⚗️", color: "from-[#D8C8FF] to-[#E8D8FF]" },
    { name: "SVT", icon: "🌿", color: "from-[#D0F0E0] to-[#E0F8E8]" },
    { name: "Français", icon: "📚", color: "from-[#FFD8D8] to-[#FFE8E8]" },
  ]

  const exampleCards = [
    {
      title: "Titrage d'un acide fort par une base forte",
      problem: "C(HCl) = 0,10 mol·L⁻¹, Vₐ = 25,0 mL. On ajoute V = 10,0 mL de NaOH 0,10 mol·L⁻¹. Calculer le pH.",
      resolution: [
        "n(HCl)ᵢₙᵢₜᵢₐₗ = 2,50 × 10⁻³ mol ; n(NaOH) ajoutée = 1,00 × 10⁻³ mol. Excès d'acide :",
        "n(H₃O⁺)ₑₓcₑₛ = 1,50 × 10⁻³ mol.",
        "Vₜₒₜₐₗ = 35,0 mL ⇒ [H₃O⁺]ₑₓcₑₛ = (1,50 × 10⁻³)/(35,0 × 10⁻³) =",
        "∴ pH = −log₁₀(4,29 × 10⁻²) ≈ 1,37.",
      ],
      answer: "pH ≈ 1,37 (avant équivalence, milieu acide).",
    },
    {
      title: "Calcul de pH d'une solution tampon",
      problem: "Solution contenant CH₃COOH (0,1 M) et CH₃COO⁻ (0,1 M). pKₐ = 4,76. Calculer le pH.",
      resolution: [
        "Utiliser Henderson-Hasselbalch : pH = pKₐ + log₁₀([A⁻]/[AH])",
        "pH = 4,76 + log₁₀(0,1/0,1) = 4,76 + log₁₀(1) = 4,76 + 0",
      ],
      answer: "pH = 4,76 (solution tampon à pH égal au pKₐ).",
    },
    {
      title: "pH d'un acide faible",
      problem: "Solution d'acide acétique CH₃COOH à 0,01 M. pKₐ = 4,76. Calculer le pH.",
      resolution: [
        "Pour un acide faible : pH ≈ ½(pKₐ − log₁₀(Cₐ))",
        "pH ≈ ½(4,76 − log₁₀(0,01)) = ½(4,76 − (−2))",
        "pH ≈ ½(4,76 + 2) = ½(6,76) = 3,38",
      ],
      answer: "pH ≈ 3,38 (milieu acide).",
    },
    {
      title: "pH d'une base forte",
      problem: "Solution de NaOH à 0,001 M. Calculer le pH.",
      resolution: [
        "Pour une base forte : pH = 14 + log₁₀(Cᵦ)",
        "pH = 14 + log₁₀(0,001) = 14 + log₁₀(10⁻³)",
        "pH = 14 + (−3) = 11",
      ],
      answer: "pH = 11 (milieu basique).",
    },
  ]

  const formulaCards = [
    {
      title: "pH = −log₁₀([H₃O⁺]) et [H₃O⁺] = 10⁻ᵖᴴ",
      explanation: "Définition du pH en solution aqueuse, issue de la concentration en ions oxonium.",
      example: "Si [H₃O⁺] = 1,0 × 10⁻³ mol·L⁻¹ alors pH = 3,00.",
    },
    {
      title: "Kₐ = [A⁻][H₃O⁺]/[AH]",
      explanation: "Constante d'acidité pour un couple acide/base AH/A⁻.",
      example: "Pour CH₃COOH/CH₃COO⁻, Kₐ = 1,8 × 10⁻⁵ donc pKₐ = 4,76.",
    },
    {
      title: "pH = pKₐ + log₁₀([A⁻]/[AH])",
      explanation: "Équation de Henderson-Hasselbalch pour les solutions tampons.",
      example: "Si [A⁻] = [AH], alors pH = pKₐ.",
    },
  ]

  const revisionCards = [
    {
      title:
        "Avant tout calcul, identifie le modèle (acide/base fort(e) ou faible), pose l'équilibre et le domaine d'approximation. Cette préparation t'évite 80 % des erreurs et accélère tes résolutions.",
      methods: [
        "Refaire des cartes mémos des couples AH/A⁻ avec leurs pKₐ et domaines de prédominance.",
        "S'entraîner à dériver Henderson-Hasselbalch et le lien pKₐ + pKᵦ = 14 pour les retenir durablement.",
        "Réaliser des courbes de titrage simulées (tableur) pour visualiser avant/équivalence/après.",
        "Vérifier systématiquement les ordres de grandeur : pH plausible et cohérent avec la nature de la solution.",
        "S'exercer à choisir un indicateur en comparant zones de virage et sauts de pH.",
      ],
    },
  ]

  const demoCards = [
    {
      title: "Formule de Henderson-Hasselbalch",
      hypotheses: [
        "Solution contenant un acide faible AH et sa base conjuguée A⁻",
        "Équilibre AH + H₂O ⇌ A⁻ + H₃O⁺ et activité ≈ concentration (solution diluée)",
      ],
      demonstration: [
        "Par définition : Kₐ = [A⁻][H₃O⁺]/[AH]. On isole",
        "[H₃O⁺] : [H₃O⁺] = Kₐ · [AH]/[A⁻]. En prenant",
        "−log₁₀ des deux côtés :",
        "−log₁₀([H₃O⁺]) = −log₁₀(Kₐ) − log₁₀([AH]/[A⁻])",
        "∴ Donc pH = pKₐ + log₁₀([A⁻]/[AH]).",
      ],
      application:
        "Calcul du pH d'un tampon et détermination des proportions de AH/A⁻ nécessaires pour atteindre un pH cible.",
    },
    {
      title: "Relation Kₐ × Kᵦ = Kₑ",
      hypotheses: ["Couple acide/base conjugué AH/A⁻", "Produit ionique de l'eau Kₑ = [H₃O⁺][OH⁻] = 10⁻¹⁴ à 25°C"],
      demonstration: [
        "Pour l'acide : AH + H₂O ⇌ A⁻ + H₃O⁺, Kₐ = [A⁻][H₃O⁺]/[AH]",
        "Pour la base : A⁻ + H₂O ⇌ AH + OH⁻, Kᵦ = [AH][OH⁻]/[A⁻]",
        "Multiplier : Kₐ × Kᵦ = ([A⁻][H₃O⁺]/[AH]) × ([AH][OH⁻]/[A⁻])",
        "= [H₃O⁺][OH⁻] = Kₑ",
        "∴ Donc pKₐ + pKᵦ = pKₑ = 14 à 25°C",
      ],
      application: "Permet de calculer Kᵦ connaissant Kₐ et vice-versa.",
    },
  ]

  const definitionCards = [
    {
      title: "Acide (Arrhenius)",
      definition: "Espèce chimique qui libère des ions H⁺ en solution aqueuse.",
    },
    {
      title: "Base (Arrhenius)",
      definition: "Espèce chimique qui libère des ions OH⁻ en solution aqueuse.",
    },
    {
      title: "Acide (Brønsted-Lowry)",
      definition: "Espèce chimique capable de donner un proton H⁺.",
    },
    {
      title: "Base (Brønsted-Lowry)",
      definition: "Espèce chimique capable d'accepter un proton H⁺.",
    },
    {
      title: "Solution tampon",
      definition:
        "Solution qui résiste aux variations de pH lors de l'ajout d'acide ou de base, composée d'un couple acide/base conjugué.",
    },
    {
      title: "Équivalence (titrage)",
      definition: "Point où les quantités de matière de l'acide et de la base sont en proportions stœchiométriques.",
    },
  ]

  const errorCards = [
    {
      title: "Confondre concentration formelle C₀ et concentration à l'équilibre",
      advice:
        "Écris systématiquement les quantités de matière et le tableau d'avancement pour identifier la concentration effective après réaction ou dilution.",
    },
    {
      title: "Oublier le produit ionique de l'eau",
      advice: "Toujours vérifier que [H₃O⁺] × [OH⁻] = 10⁻¹⁴ à 25°C, surtout pour les bases.",
    },
    {
      title: "Négliger les approximations",
      advice: "Vérifier que l'approximation (α << 1 ou Cₐ/Kₐ > 100) est valide avant de simplifier les calculs.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF] flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-md">
        <Link href="/fiches" className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>

        <div className="flex items-center gap-3 flex-1 justify-center">
          <Link href="/accueil">
            <img
              src="/images/design-mode/dinobot-logo.png"
              alt="Dinobot"
              className="w-10 h-10 md:w-12 md:h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <button
            onClick={() => setSubjectSelectorOpen(true)}
            className="bg-gradient-to-r from-[#6B8EFF] to-[#8BADFF] hover:from-[#5B7FFF] hover:to-[#7B9FFF] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            {selectedSubject}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <button className="p-2 -mr-2 opacity-0 pointer-events-none">
          <MoreVertical className="w-6 h-6 text-gray-900" />
        </button>
      </header>

      <div className="bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] px-4 py-4 flex gap-3 justify-center sticky top-[57px] z-10 shadow-md">
        <button
          onClick={() => setActiveSubTab("fiche")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeSubTab === "fiche"
              ? "bg-white text-purple-700 shadow-md"
              : "bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
          }`}
        >
          Fiche
        </button>
        <button
          onClick={() => setActiveSubTab("infos")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeSubTab === "infos"
              ? "bg-white text-purple-700 shadow-md"
              : "bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
          }`}
        >
          Savoir faire
        </button>
        <Link
          href="/fiches/flashcard"
          className="px-5 py-2 rounded-full text-sm font-medium transition-all bg-[#E8D8FF] text-purple-700 hover:bg-[#F0E4FF]"
        >
          Flashcards
        </Link>
      </div>

      <div className="px-4 py-4 bg-gradient-to-b from-[#F0E4FF] to-transparent border-b border-purple-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Acides et bases</h1>
      </div>

      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto bg-white">
        {activeSubTab === "fiche" && (
          <>
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
              <button
                onClick={() => setSection1Open(!section1Open)}
                className="w-full flex items-center justify-between gap-3 mb-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-blue-500">1.</span>
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                    RÉFÉRENCES ET DÉFINITIONS
                  </h2>
                </div>
                {section1Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {section1Open && (
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">MODÈLES ACIDE-BASE</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Arrhenius</span> : acide → libère{" "}
                        <span className="text-blue-500 font-medium">H⁺</span> en solution aqueuse ;{" "}
                        <span className="font-semibold">base</span> → libère{" "}
                        <span className="text-blue-500 font-medium">OH⁻</span>.
                      </li>
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Brønsted-Lowry</span> : acide = donneur de{" "}
                        <span className="font-semibold">proton</span>{" "}
                        <span className="text-blue-500 font-medium">H⁺</span> ; base = accepteur de proton{" "}
                        <span className="text-blue-500 font-medium">H⁺</span>.
                      </li>
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Couple acide/base</span> conjugués :{" "}
                        <span className="text-blue-500 font-medium">AH/A⁻</span> ;{" "}
                        <span className="text-blue-500 font-medium">BH⁺/B</span>.
                      </li>
                      <li className="leading-relaxed">
                        - Espèce <span className="font-semibold">amphotère/ampholyte</span> : peut agir comme{" "}
                        <span className="font-semibold">acide</span> ou <span className="font-semibold">base</span> (ex.
                        : <span className="text-blue-500 font-medium">H₂O</span>,{" "}
                        <span className="text-blue-500 font-medium">HCO₃⁻</span>).
                      </li>
                      <li className="leading-relaxed">
                        - Réaction <span className="font-semibold">acide-base</span> = transfert de proton :{" "}
                        <span className="text-blue-500 font-medium">AH + B ⇌ A⁻ + BH⁺</span>.
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">FORCES ET CONSTANTES</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - Constante d'acidité <span className="text-blue-500 font-medium">K_a</span> (à{" "}
                        <span className="text-blue-500 font-medium">T</span> donnée) :
                        <div className="my-2 text-center">
                          <span className="text-blue-500 font-medium text-base">K_a = [A⁻][H₃O⁺] / [AH]</span>
                        </div>
                      </li>
                      <li className="leading-relaxed">
                        - <span className="text-blue-500 font-medium">pK_a = −log₁₀(K_a)</span>. Plus{" "}
                        <span className="text-blue-500 font-medium">pK_a</span> est petit, plus l'
                        <span className="font-semibold">acide est fort</span>.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
              <button
                onClick={() => setSection2Open(!section2Open)}
                className="w-full flex items-center justify-between gap-3 mb-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-purple-500">2.</span>
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">CALCUL DE pH</h2>
                </div>
                {section2Open ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {section2Open && (
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">DÉFINITION DU pH</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - Le <span className="font-semibold">pH</span> (potentiel hydrogène) mesure l'acidité ou la
                        basicité d'une solution.
                      </li>
                      <li className="leading-relaxed">
                        - Formule :{" "}
                        <div className="my-2 text-center">
                          <span className="text-purple-500 font-medium text-base">pH = −log₁₀[H₃O⁺]</span>
                        </div>
                      </li>
                      <li className="leading-relaxed">
                        - Relation inverse : <span className="text-purple-500 font-medium">[H₃O⁺] = 10⁻ᵖᴴ</span>
                      </li>
                      <li className="leading-relaxed">
                        - Échelle de pH : de <span className="font-semibold">0</span> (très acide) à{" "}
                        <span className="font-semibold">14</span> (très basique), neutre à{" "}
                        <span className="font-semibold">pH = 7</span> (à 25°C).
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">ACIDES ET BASES FORTS</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Acide fort</span> : dissociation totale dans l'eau.
                        <div className="my-2 pl-4">
                          <span className="text-purple-500 font-medium">pH = −log₁₀(C_a)</span>
                        </div>
                        où <span className="text-purple-500 font-medium">C_a</span> est la concentration de l'acide.
                      </li>
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Base forte</span> : dissociation totale dans l'eau.
                        <div className="my-2 pl-4">
                          <span className="text-purple-500 font-medium">pH = 14 + log₁₀(C_b)</span>
                        </div>
                        où <span className="text-purple-500 font-medium">C_b</span> est la concentration de la base.
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">ACIDES ET BASES FAIBLES</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Acide faible</span> : dissociation partielle.
                        <div className="my-2 pl-4">
                          <span className="text-purple-500 font-medium">pH ≈ ½(pK_a − log₁₀(C_a))</span>
                        </div>
                      </li>
                      <li className="leading-relaxed">
                        - <span className="font-semibold">Base faible</span> : dissociation partielle.
                        <div className="my-2 pl-4">
                          <span className="text-purple-500 font-medium">pH ≈ 7 + ½(pK_a + log₁₀(C_b))</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">SOLUTIONS TAMPONS</h3>
                    <ul className="space-y-3 text-sm text-gray-800">
                      <li className="leading-relaxed">
                        - Une <span className="font-semibold">solution tampon</span> résiste aux variations de pH lors
                        de l'ajout d'acide ou de base.
                      </li>
                      <li className="leading-relaxed">
                        - Composée d'un <span className="font-semibold">couple acide/base</span> conjugué en proportions
                        comparables.
                      </li>
                      <li className="leading-relaxed">
                        - Équation de <span className="font-semibold">Henderson-Hasselbalch</span> :
                        <div className="my-2 text-center">
                          <span className="text-purple-500 font-medium text-base">pH = pK_a + log₁₀([A⁻]/[AH])</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeSubTab === "infos" && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setExemplesOpen(!exemplesOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Exemples</h2>
                {exemplesOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {exemplesOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentExampleCard, setCurrentExampleCard, exampleCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentExampleCard * 100}%)` }}
                    >
                      {exampleCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">
                              {card.title}: {card.problem}
                            </h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Résolution</h4>
                            <div className="text-xs text-gray-700 space-y-1 mb-4">
                              {card.resolution.map((line, i) => (
                                <p key={i} className="leading-relaxed">
                                  {line}
                                </p>
                              ))}
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Réponse</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {exampleCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentExampleCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentExampleCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setDefinitionsOpen(!definitionsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Définitions clés</h2>
                {definitionsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {definitionsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() =>
                      handleTouchEnd(currentDefinitionCard, setCurrentDefinitionCard, definitionCards.length)
                    }
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentDefinitionCard * 100}%)` }}
                    >
                      {definitionCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <p className="text-sm text-gray-700 leading-relaxed">{card.definition}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {definitionCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDefinitionCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentDefinitionCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setFormulesOpen(!formulesOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Formules importantes</h2>
                {formulesOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {formulesOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentFormulaCard, setCurrentFormulaCard, formulaCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentFormulaCard * 100}%)` }}
                    >
                      {formulaCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Explication</h4>
                            <p className="text-xs text-gray-700 leading-relaxed mb-3">{card.explanation}</p>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Exemple concret</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {formulaCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFormulaCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentFormulaCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setConseilsOpen(!conseilsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Conseils de révision</h2>
                {conseilsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {conseilsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentRevisionCard, setCurrentRevisionCard, revisionCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentRevisionCard * 100}%)` }}
                    >
                      {revisionCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-sm leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Méthodes recommandées</h4>
                            <ul className="space-y-2">
                              {card.methods.map((method, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
                                  <span className="flex-shrink-0">•</span>
                                  <span>{method}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {revisionCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentRevisionCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentRevisionCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setDemonstrationsOpen(!demonstrationsOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Démonstrations clés</h2>
                {demonstrationsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {demonstrationsOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentDemoCard, setCurrentDemoCard, demoCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentDemoCard * 100}%)` }}
                    >
                      {demoCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Hypothèses</h4>
                            <ul className="space-y-1 mb-3">
                              {card.hypotheses.map((hyp, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-2">
                                  <span className="flex-shrink-0">•</span>
                                  <span>{hyp}</span>
                                </li>
                              ))}
                            </ul>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Démonstration</h4>
                            <div className="text-xs text-gray-700 space-y-1 mb-3">
                              {card.demonstration.map((line, i) => (
                                <p key={i} className="leading-relaxed">
                                  {line}
                                </p>
                              ))}
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Application</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.application}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {demoCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDemoCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentDemoCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setErreursOpen(!erreursOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-900">Erreurs fréquentes</h2>
                {erreursOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {erreursOpen && (
                <div className="relative">
                  <div
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(currentErrorCard, setCurrentErrorCard, errorCards.length)}
                  >
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${currentErrorCard * 100}%)` }}
                    >
                      {errorCards.map((card, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-1">
                          <div className="bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] rounded-t-2xl p-4">
                            <h3 className="font-bold text-base leading-snug text-slate-800">{card.title}</h3>
                          </div>
                          <div className="bg-white rounded-b-2xl p-4 border border-t-0 border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-gray-900 mb-2">Le conseil de DinoBot</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">{card.advice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {errorCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentErrorCard(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentErrorCard ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {subjectSelectorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 animate-in slide-in-from-bottom md:slide-in-from-bottom-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Choisis ta matière</h3>
              <button onClick={() => setSubjectSelectorOpen(false)} className="p-2 -mr-2">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => {
                    setSelectedSubject(subject.name)
                    setSubjectSelectorOpen(false)
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedSubject === subject.name
                      ? "bg-gradient-to-r " + subject.color + " text-white shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-900"
                  }`}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <span className="font-bold text-lg">{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
