import { CoursesData } from '@/hooks/use-courses'

export const coursesData: CoursesData = {
  subjects: [
    {
      id: "chimie",
      name: "Chimie",
      icon: "🧪",
      bgColor: "#F0E7FF",
      color: "#7C3AED",
      chapters: [
        {
          id: "01",
          name: "Acides et bases",
          description: "Étude des propriétés acides et basiques, calculs de pH, titrages",
          parts: [
            {
              id: "1",
              name: "Définitions et concepts",
              content: "Modèles acide-base : Arrhenius, Brønsted-Lowry, Lewis. Couple acide-base : AH/A⁻. Force des acides et bases.",
              keywords: ["acide", "base", "pH", "pKa", "couple acide-base"]
            },
            {
              id: "2",
              name: "Calculs de pH",
              content: "Formule de pH : pH = −log₁₀[H₃O⁺]. pH < 7 : acide, pH = 7 : neutre, pH > 7 : basique. Calculs pour acides forts, bases fortes, solutions tampons.",
              keywords: ["pH", "concentration", "dilution", "Ka", "Kb"]
            },
            {
              id: "3",
              name: "Titrages",
              content: "Titrage acido-basique, point d'équivalence, indicateurs colorés, courbes de titrage.",
              keywords: ["titrage", "équivalence", "indicateur", "courbe"]
            }
          ]
        },
        {
          id: "02",
          name: "Réactions d'oxydoréduction",
          description: "Étude des transferts d'électrons, couples redox, piles électrochimiques",
          parts: [
            {
              id: "1",
              name: "Oxydants et réducteurs",
              content: "Définitions, couples redox, nombres d'oxydation, demi-équations électroniques.",
              keywords: ["oxydation", "réduction", "redox", "électrons"]
            },
            {
              id: "2",
              name: "Équations d'oxydoréduction",
              content: "Écriture et équilibrage des équations redox, méthode des demi-équations.",
              keywords: ["équation", "équilibrage", "demi-équation"]
            },
            {
              id: "3",
              name: "Piles électrochimiques",
              content: "Principe des piles, potentiel standard, pile Daniell, applications.",
              keywords: ["pile", "potentiel", "électrode", "voltage"]
            }
          ]
        },
        {
          id: "03",
          name: "Cinétique chimique",
          description: "Étude de la vitesse des réactions chimiques et des facteurs qui l'influencent",
          parts: [
            {
              id: "1",
              name: "Vitesse de réaction",
              content: "Définition de la vitesse de réaction, facteurs cinétiques (température, concentration, catalyseurs).",
              keywords: ["vitesse", "réaction", "concentration", "temps"]
            },
            {
              id: "2",
              name: "Lois de vitesse",
              content: "Ordre de réaction, constante de vitesse, temps de demi-réaction.",
              keywords: ["ordre", "constante", "demi-réaction"]
            },
            {
              id: "3",
              name: "Catalyse",
              content: "Catalyseurs homogènes et hétérogènes, mécanismes catalytiques, énergie d'activation.",
              keywords: ["catalyseur", "activation", "mécanisme"]
            }
          ]
        },
        {
          id: "04",
          name: "Équilibres chimiques",
          description: "Étude des réactions réversibles et de leur état d'équilibre",
          parts: [
            {
              id: "1",
              name: "Constante d'équilibre",
              content: "Définition de K, quotient réactionnel Q, loi d'action de masse.",
              keywords: ["équilibre", "constante", "quotient", "masse"]
            },
            {
              id: "2",
              name: "Déplacement d'équilibre",
              content: "Principe de Le Chatelier, influence de la température, pression, concentration.",
              keywords: ["Le Chatelier", "déplacement", "perturbation"]
            },
            {
              id: "3",
              name: "Applications",
              content: "Équilibres acido-basiques, solubilité, complexation.",
              keywords: ["application", "solubilité", "complexe"]
            }
          ]
        },
        {
          id: "05",
          name: "Thermodynamique",
          description: "Étude des échanges d'énergie dans les réactions chimiques",
          parts: [
            {
              id: "1",
              name: "Premier principe",
              content: "Conservation de l'énergie, enthalpie, réactions endo/exothermiques.",
              keywords: ["énergie", "enthalpie", "chaleur", "travail"]
            },
            {
              id: "2",
              name: "Entropie et second principe",
              content: "Notion d'entropie, évolution spontanée, énergie libre de Gibbs.",
              keywords: ["entropie", "Gibbs", "spontané", "désordre"]
            },
            {
              id: "3",
              name: "Applications thermodynamiques",
              content: "Prévision de la spontanéité des réactions, calculs thermodynamiques.",
              keywords: ["spontanéité", "calcul", "prévision"]
            }
          ]
        }
      ]
    },
    {
      id: "physique",
      name: "Physique",
      icon: "⚛️",
      bgColor: "#E0F2FE",
      color: "#0284C7",
      chapters: [
        {
          id: "01",
          name: "Mécanique",
          description: "Étude du mouvement et des forces",
          parts: [
            {
              id: "1",
              name: "Cinématique",
              content: "Position, vitesse, accélération, mouvements rectilignes et circulaires.",
              keywords: ["position", "vitesse", "accélération", "mouvement"]
            },
            {
              id: "2",
              name: "Dynamique",
              content: "Lois de Newton, force, masse, travail, énergie.",
              keywords: ["Newton", "force", "masse", "énergie"]
            },
            {
              id: "3",
              name: "Énergétique",
              content: "Énergie cinétique, potentielle, conservation de l'énergie.",
              keywords: ["énergie", "conservation", "puissance"]
            }
          ]
        },
        {
          id: "02",
          name: "Électricité",
          description: "Circuits électriques et lois fondamentales",
          parts: [
            {
              id: "1",
              name: "Circuits en courant continu",
              content: "Loi d'Ohm, résistances, lois de Kirchhoff.",
              keywords: ["Ohm", "résistance", "Kirchhoff", "circuit"]
            },
            {
              id: "2",
              name: "Condensateurs et bobines",
              content: "Capacité, inductance, charge et décharge.",
              keywords: ["condensateur", "bobine", "capacité", "inductance"]
            },
            {
              id: "3",
              name: "Courant alternatif",
              content: "Signaux sinusoïdaux, impédance, déphasage.",
              keywords: ["alternatif", "impédance", "déphasage", "fréquence"]
            }
          ]
        }
      ]
    },
    {
      id: "mathematiques",
      name: "Mathématiques",
      icon: "📐",
      bgColor: "#FEF3C7",
      color: "#D97706",
      chapters: [
        {
          id: "01",
          name: "Analyse",
          description: "Fonctions, dérivées et intégrales",
          parts: [
            {
              id: "1",
              name: "Fonctions",
              content: "Limites, continuité, dérivabilité.",
              keywords: ["fonction", "limite", "continuité", "dérivée"]
            },
            {
              id: "2",
              name: "Dérivation",
              content: "Calculs de dérivées, applications géométriques.",
              keywords: ["dérivée", "tangente", "variation"]
            },
            {
              id: "3",
              name: "Intégration",
              content: "Primitives, intégrales définies, calcul d'aires.",
              keywords: ["intégrale", "primitive", "aire"]
            }
          ]
        },
        {
          id: "02",
          name: "Algèbre",
          description: "Équations, polynômes et matrices",
          parts: [
            {
              id: "1",
              name: "Équations et inéquations",
              content: "Résolution d'équations du second degré, systèmes linéaires.",
              keywords: ["équation", "inéquation", "système"]
            },
            {
              id: "2",
              name: "Polynômes",
              content: "Factorisation, racines, théorème de Bézout.",
              keywords: ["polynôme", "racine", "factorisation"]
            },
            {
              id: "3",
              name: "Matrices",
              content: "Opérations matricielles, déterminants, systèmes linéaires.",
              keywords: ["matrice", "déterminant", "système"]
            }
          ]
        }
      ]
    },
    {
      id: "svt",
      name: "SVT",
      icon: "🧬",
      bgColor: "#DCFCE7",
      color: "#16A34A",
      chapters: [
        {
          id: "01",
          name: "Génétique",
          description: "Hérédité et variation génétique",
          parts: [
            {
              id: "1",
              name: "ADN et gènes",
              content: "Structure de l'ADN, réplication, transcription, traduction.",
              keywords: ["ADN", "gène", "chromosome", "mutation"]
            },
            {
              id: "2",
              name: "Hérédité mendélienne",
              content: "Lois de Mendel, allèles dominants et récessifs.",
              keywords: ["Mendel", "allèle", "génotype", "phénotype"]
            },
            {
              id: "3",
              name: "Génétique humaine",
              content: "Maladies génétiques, conseil génétique.",
              keywords: ["maladie", "génétique", "hérédité"]
            }
          ]
        }
      ]
    }
  ]
}