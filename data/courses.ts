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
              content: `Un acide est une espèce chimique capable de céder un proton H⁺ (définition de Brønsted-Lowry). Par exemple, l'acide chlorhydrique HCl se dissocie en solution aqueuse pour donner H⁺ et Cl⁻.

À l'inverse, une base est une espèce capable de capter un proton. L'ion hydroxyde OH⁻ est un exemple de base courante.

On définit un couple acide-base comme deux espèces liées par l'échange d'un proton : AH/A⁻. L'acide AH peut perdre un proton pour former sa base conjuguée A⁻.

La force d'un acide se mesure par sa constante d'acidité Ka. Plus Ka est grand, plus l'acide est fort. On utilise généralement le pKa = -log(Ka). Plus le pKa est faible, plus l'acide est fort.

Exemples de couples acide-base courants :
- CH₃COOH/CH₃COO⁻ (acide acétique/ion acétate) : pKa = 4,75
- NH₄⁺/NH₃ (ion ammonium/ammoniac) : pKa = 9,25`,
              keywords: ["acide", "base", "pH", "pKa", "couple acide-base"]
            },
            {
              id: "2",
              name: "Calculs de pH",
              content: `Le pH (potentiel hydrogène) mesure l'acidité d'une solution. Il est défini par la formule : pH = -log₁₀[H₃O⁺]

où [H₃O⁺] est la concentration en ions oxonium (ou hydronium) dans la solution.

Échelle de pH :
- pH < 7 : solution acide
- pH = 7 : solution neutre (eau pure à 25°C)
- pH > 7 : solution basique

Pour calculer le pH d'une solution d'acide fort (totalement dissocié) de concentration Ca :
pH = -log₁₀(Ca)

Exemple : HCl à 0,01 mol/L → pH = -log(0,01) = 2

Pour une base forte de concentration Cb :
pH = 14 + log₁₀(Cb)

Pour les acides et bases faibles, on utilise l'équation de Henderson-Hasselbalch :
pH = pKa + log₁₀([A⁻]/[AH])

Cette formule est particulièrement utile pour les solutions tampons, qui résistent aux variations de pH.`,
              keywords: ["pH", "concentration", "dilution", "Ka", "Kb", "Henderson-Hasselbalch"]
            },
            {
              id: "3",
              name: "Titrages acido-basiques",
              content: `Un titrage acido-basique permet de déterminer la concentration d'une solution acide ou basique inconnue. On ajoute progressivement une solution de concentration connue (le titrant) jusqu'à atteindre l'équivalence.

Le point d'équivalence est atteint lorsque les quantités de matière d'acide et de base sont égales : n(acide) = n(base).

À l'équivalence : Ca × Va = Cb × Vb

Pour repérer l'équivalence, on utilise :
1. Un indicateur coloré (comme le BBT ou la phénolphtaléine) qui change de couleur dans une zone de pH précise
2. Un pH-mètre pour tracer la courbe de titrage

La courbe de titrage présente un saut de pH important au point d'équivalence. Pour un acide fort par une base forte, le pH à l'équivalence vaut 7.

Pour un acide faible titré par une base forte, le pH à la demi-équivalence (Va = Ve/2) est égal au pKa de l'acide faible. C'est une méthode pour déterminer expérimentalement le pKa.`,
              keywords: ["titrage", "équivalence", "indicateur coloré", "courbe", "BBT", "phénolphtaléine"]
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
              content: `Une réaction d'oxydoréduction (ou réaction redox) implique un transfert d'électrons entre deux espèces chimiques.

**L'oxydation** est une perte d'électrons. L'espèce qui perd des électrons est appelée **réducteur**.
**La réduction** est un gain d'électrons. L'espèce qui capte des électrons est appelée **oxydant**.

Mnémotechnique : "Le Réducteur Donne des électrons (il s'oxyde), l'Oxydant Gagne des électrons (il se réduit)"

Un couple redox s'écrit : Ox/Red
Exemple : Fe³⁺/Fe²⁺, Cu²⁺/Cu, MnO₄⁻/Mn²⁺

Le nombre d'oxydation (n.o.) permet de suivre les transferts d'électrons :
- Un élément à l'état libre a un n.o. de 0 (Fe, O₂, N₂)
- L'oxygène a généralement un n.o. de -II
- L'hydrogène a généralement un n.o. de +I
- Dans un ion monoatomique, le n.o. = charge de l'ion

Exemple : Dans MnO₄⁻, Mn a un n.o. de +VII
Calcul : n.o.(Mn) + 4×(-II) = -1 → n.o.(Mn) = +VII`,
              keywords: ["oxydation", "réduction", "redox", "électrons", "nombre d'oxydation"]
            },
            {
              id: "2",
              name: "Équations d'oxydoréduction",
              content: `Pour écrire une équation redox, on utilise la méthode des demi-équations électroniques.

**Étape 1 : Écrire les deux demi-équations**
- Demi-équation de réduction : Ox + ne⁻ → Red
- Demi-équation d'oxydation : Red → Ox + ne⁻

**Étape 2 : Équilibrer chaque demi-équation**
1. Équilibrer les éléments autres que O et H
2. Équilibrer O en ajoutant H₂O
3. Équilibrer H en ajoutant H⁺
4. Équilibrer les charges en ajoutant des électrons e⁻

**Étape 3 : Égaliser le nombre d'électrons**
Multiplier les demi-équations pour que les électrons disparaissent.

**Exemple complet :**
Réaction entre les ions permanganate MnO₄⁻ et les ions Fe²⁺ en milieu acide.

Réduction : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O
Oxydation : Fe²⁺ → Fe³⁺ + e⁻   (×5)

Équation bilan :
MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O`,
              keywords: ["équation", "équilibrage", "demi-équation", "électrons", "bilan"]
            },
            {
              id: "3",
              name: "Piles électrochimiques",
              content: `Une pile électrochimique transforme l'énergie chimique d'une réaction redox spontanée en énergie électrique.

**Constitution d'une pile :**
- Deux électrodes (anode et cathode) plongées dans des solutions électrolytiques
- Un pont salin assurant la conduction ionique
- Un circuit électrique externe

**Fonctionnement :**
- À l'anode (pôle -) : oxydation du réducteur, libération d'électrons
- À la cathode (pôle +) : réduction de l'oxydant, consommation d'électrons
- Les électrons circulent dans le circuit externe de l'anode vers la cathode

**Exemple : Pile Daniell (Cu²⁺/Cu // Zn²⁺/Zn)**
- Anode : Zn → Zn²⁺ + 2e⁻ (oxydation)
- Cathode : Cu²⁺ + 2e⁻ → Cu (réduction)
- Tension : environ 1,1 V

**Potentiel standard E°**
Chaque couple redox a un potentiel standard E° mesuré par rapport à l'électrode standard à hydrogène (E° = 0 V).

Plus E° est élevé, plus l'oxydant est fort.
Plus E° est faible, plus le réducteur est fort.

La tension (force électromotrice) d'une pile :
E(pile) = E°(cathode) - E°(anode)

Applications : piles salines, piles alcalines, piles à combustible, batteries lithium-ion.`,
              keywords: ["pile", "potentiel", "électrode", "voltage", "anode", "cathode", "Daniell"]
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
              content: `La vitesse d'une réaction chimique quantifie la rapidité de transformation des réactifs en produits. Elle dépend de plusieurs facteurs qu'il est essentiel de maîtriser.

**Définition mathématique**
Pour une réaction aA + bB → cC + dD, la vitesse volumique est :
v = -(1/a) × d[A]/dt = -(1/b) × d[B]/dt = (1/c) × d[C]/dt = (1/d) × d[D]/dt

L'unité SI est le mol·L⁻¹·s⁻¹.

**Suivi cinétique expérimental**
On peut suivre l'évolution d'une réaction en mesurant différentes grandeurs :
- Absorbance (si une espèce est colorée)
- Conductivité (si des ions interviennent)
- Volume de gaz dégagé
- Pression (en système fermé)
- pH (pour les réactions acido-basiques)

**Temps de demi-réaction t₁/₂**
C'est le temps nécessaire pour que la moitié des réactifs soient consommés. Plus t₁/₂ est court, plus la réaction est rapide.

Pour une réaction d'ordre 1 : t₁/₂ = ln(2)/k ≈ 0,693/k
Cette valeur est indépendante de la concentration initiale.`,
              keywords: ["vitesse", "réaction", "concentration", "temps", "demi-réaction", "cinétique"]
            },
            {
              id: "2",
              name: "Lois de vitesse et ordre",
              content: `La loi de vitesse exprime la vitesse de réaction en fonction des concentrations des réactifs.

**Ordre de réaction**
Pour une réaction aA + bB → produits, on écrit généralement :
v = k[A]ᵅ[B]ᵝ

- α est l'ordre partiel par rapport à A
- β est l'ordre partiel par rapport à B
- α + β est l'ordre global de la réaction
- k est la constante de vitesse

**Réaction d'ordre 0**
v = k (indépendante de la concentration)
Cas rare : catalyse hétérogène à saturation

**Réaction d'ordre 1**
v = k[A]
Évolution exponentielle : [A](t) = [A]₀ × exp(-kt)
Exemples : désintégration radioactive, décomposition de N₂O₅

**Réaction d'ordre 2**
v = k[A]² ou v = k[A][B]
1/[A](t) = 1/[A]₀ + kt

**Détermination expérimentale de l'ordre**
- Méthode différentielle : tracer ln(v) en fonction de ln[A]
- Méthode intégrale : tester différentes lois intégrées
- Méthode des temps de demi-réaction

La constante k dépend de la température selon la loi d'Arrhenius :
k = A × exp(-Ea/RT)
où Ea est l'énergie d'activation.`,
              keywords: ["ordre", "constante", "demi-réaction", "loi de vitesse", "Arrhenius"]
            },
            {
              id: "3",
              name: "Catalyse et mécanismes",
              content: `Un catalyseur est une espèce qui accélère une réaction chimique sans être consommée. Il permet d'atteindre l'équilibre plus rapidement en abaissant l'énergie d'activation.

**Types de catalyse**

**1. Catalyse homogène**
Le catalyseur et les réactifs sont dans la même phase.
Exemple : Décomposition de H₂O₂ par les ions Fe³⁺
2H₂O₂ → 2H₂O + O₂ (très lente sans catalyseur)

**2. Catalyse hétérogène**
Le catalyseur est dans une phase différente des réactifs (souvent un solide).
Exemple : Hydrogénation des alcènes sur platine
C₂H₄(g) + H₂(g) --Pt(s)--> C₂H₆(g)

Applications industrielles :
- Pot catalytique automobile (Pt, Pd, Rh)
- Synthèse de l'ammoniac (Fe)
- Raffinage du pétrole

**3. Catalyse enzymatique**
Les enzymes sont des protéines qui catalysent les réactions biologiques avec une grande spécificité.
Exemple : La catalase décompose H₂O₂ à raison de 10⁷ molécules/seconde !

**Diagramme énergétique**
Le catalyseur propose un chemin réactionnel alternatif avec une énergie d'activation Ea plus faible.
Sans catalyseur : Ea élevée → réaction lente
Avec catalyseur : Ea diminuée → réaction rapide

Important : Le catalyseur ne modifie pas l'état d'équilibre final, seulement la vitesse pour l'atteindre.`,
              keywords: ["catalyseur", "activation", "mécanisme", "enzyme", "homogène", "hétérogène"]
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
              name: "Cinématique du point matériel",
              content: `La cinématique étudie le mouvement des corps sans s'intéresser aux causes (forces).

**Repérage dans l'espace**
Pour décrire le mouvement d'un point M, on choisit un référentiel (système de référence) muni d'un repère (O, i, j, k).

Le vecteur position à l'instant t : OM(t) = x(t)i + y(t)j + z(t)k

**Vecteur vitesse**
La vitesse instantanée est la dérivée du vecteur position par rapport au temps :
v = dOM/dt

En coordonnées cartésiennes : v = vₓi + vᵧj + vᵤk
La vitesse (scalaire) est : v = √(vₓ² + vᵧ² + vᵤ²) en m/s

Le vecteur vitesse est tangent à la trajectoire.

**Vecteur accélération**
L'accélération est la dérivée de la vitesse :
a = dv/dt = d²OM/dt² en m/s²

**Mouvements particuliers**
- **MRU (Mouvement Rectiligne Uniforme)** : v = constante, a = 0
  Équation horaire : x(t) = x₀ + vt
  
- **MRUV (Mouvement Rectiligne Uniformément Varié)** : a = constante
  v(t) = v₀ + at
  x(t) = x₀ + v₀t + ½at²
  
- **Chute libre** : Cas particulier avec a = g = 9,81 m/s² vers le bas
  Équations : v(t) = v₀ + gt  et  h(t) = h₀ + v₀t + ½gt²
  
- **Mouvement circulaire uniforme** : Trajectoire circulaire, ||v|| = constante
  L'accélération est centripète (vers le centre) : a = v²/R`,
              keywords: ["position", "vitesse", "accélération", "mouvement", "MRU", "MRUV", "chute libre"]
            },
            {
              id: "2",
              name: "Dynamique newtonienne",
              content: `La dynamique étudie les causes du mouvement : les forces.

**Les trois lois de Newton**

**1ère loi : Principe d'inertie**
Si la somme des forces est nulle (ΣF = 0), alors le mouvement est rectiligne uniforme (ou repos).
Un corps persiste dans son état de repos ou de mouvement rectiligne uniforme si aucune force ne s'exerce sur lui.

**2ème loi : Principe fondamental de la dynamique (PFD)**
ΣF = m × a

La somme vectorielle des forces appliquées à un corps de masse m est égale au produit de sa masse par son vecteur accélération.

C'est la loi fondamentale qui permet de résoudre tous les problèmes de mécanique.

**3ème loi : Principe des actions réciproques**
Si un corps A exerce une force F(A→B) sur un corps B, alors B exerce sur A une force F(B→A) telle que :
F(A→B) = -F(B→A)

Ces deux forces ont même intensité, même direction, mais sont de sens opposés.

**Forces usuelles**
- **Poids** : P = mg (vertical, vers le bas)
- **Réaction normale** : N ⊥ au support
- **Tension** : T le long du fil
- **Frottement** : f = μN (opposé au mouvement)
- **Force élastique** : F = -kx (loi de Hooke pour un ressort)

**Méthode de résolution**
1. Faire un bilan des forces
2. Choisir un repère adapté
3. Appliquer le PFD : ΣF = ma
4. Projeter sur les axes
5. Résoudre les équations`,
              keywords: ["Newton", "force", "masse", "énergie", "PFD", "dynamique"]
            },
            {
              id: "3",
              name: "Travail et énergie",
              content: `Le travail et l'énergie sont des concepts fondamentaux en physique.

**Travail d'une force**
Le travail d'une force constante F lors d'un déplacement AB est :
W(F) = F · AB = F × AB × cos(α)

où α est l'angle entre F et AB.

Unité : le joule (J)

- Si α < 90° : travail moteur (W > 0)
- Si α = 90° : travail nul (force perpendiculaire)
- Si α > 90° : travail résistant (W < 0)

Exemple : Le travail du poids entre A et B :
W(P) = mg(zA - zB) = -mgΔz

**Puissance**
C'est le travail effectué par unité de temps :
P = W/Δt = F · v

Unité : le watt (W) = J/s

**Énergie cinétique**
L'énergie cinétique d'un objet de masse m animé d'une vitesse v :
Ec = ½mv²

**Théorème de l'énergie cinétique**
La variation d'énergie cinétique est égale à la somme des travaux des forces :
ΔEc = Ec(B) - Ec(A) = ΣW(forces)

**Énergie potentielle de pesanteur**
Ep = mgz (en prenant z = 0 comme référence)

**Énergie mécanique**
Em = Ec + Ep

**Conservation de l'énergie mécanique**
Si toutes les forces sont conservatives (pas de frottements), alors :
Em = constante

Exemple : Chute libre sans frottements → mgh₀ = ½mv² + mgh`,
              keywords: ["énergie", "conservation", "puissance", "travail", "cinétique", "potentielle"]
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
              content: `Le courant électrique est un flux de charges électriques, principalement des électrons dans les métaux.

**Grandeurs fondamentales**
- Intensité I (ampère, A) : quantité de charges par seconde, I = Q/t
- Tension U (volt, V) : différence de potentiel entre deux points
- Résistance R (ohm, Ω) : opposition au passage du courant

**Loi d'Ohm** : U = R × I

Plus R est grand, plus il faut de tension pour le même courant.

**Associations de résistances**
Série : Réq = R₁ + R₂ + ...  (même courant)
Parallèle : 1/Réq = 1/R₁ + 1/R₂ + ... (même tension)

**Lois de Kirchhoff**
- Loi des nœuds : ΣIentrantes = ΣIsortantes
- Loi des mailles : ΣU = 0 (sur une boucle fermée)`,
              keywords: ["Ohm", "résistance", "Kirchhoff", "circuit", "courant", "tension"]
            },
            {
              id: "2",
              name: "Condensateurs et bobines",
              content: `**Condensateur**
Composant qui stocke des charges électriques.
Capacité C en farad (F) : Q = C × U
Énergie stockée : E = ½CU²

Charge : U augmente exponentiellement jusqu'à E
Décharge : U diminue exponentiellement jusqu'à 0

**Bobine (inductance)**
Composant qui s'oppose aux variations de courant.
Inductance L en henry (H)
Tension aux bornes : U = L × dI/dt

Applications : filtres, oscillateurs, transformateurs`,
              keywords: ["condensateur", "bobine", "capacité", "inductance", "charge", "décharge"]
            },
            {
              id: "3",
              name: "Courant alternatif",
              content: `Le courant alternatif (AC) change périodiquement de sens, contrairement au courant continu (DC).

**Signal sinusoïdal**
u(t) = Um × sin(ωt + φ)
- Um : amplitude (valeur maximale)
- ω = 2πf : pulsation (f = fréquence en Hz)
- φ : phase à l'origine

**Valeur efficace**
Ueff = Um/√2  et  Ieff = Im/√2

C'est la valeur mesurée par un multimètre. En France : Ueff = 230 V, f = 50 Hz

**Impédance**
Généralisation de la résistance en AC :
- Résistance : Z = R
- Condensateur : Z = 1/(Cω)
- Bobine : Z = Lω

**Déphasage**
Le courant et la tension peuvent ne pas être en phase.`,
              keywords: ["alternatif", "impédance", "déphasage", "fréquence", "sinusoïdal", "efficace"]
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
              name: "Fonctions et limites",
              content: `Une fonction f associe à chaque élément x d'un ensemble de départ (domaine de définition) un unique élément y = f(x).

**Domaine de définition Df**
Ensemble des valeurs de x pour lesquelles f(x) existe.
Exemples :
- f(x) = 1/x : Df = ℝ* (tous les réels sauf 0)
- f(x) = √x : Df = [0, +∞[ (réels positifs)
- f(x) = ln(x) : Df = ]0, +∞[ (réels strictement positifs)

**Limites**
La limite décrit le comportement de f(x) quand x s'approche d'une valeur a.

Notation : lim(x→a) f(x) = L

**Limites usuelles**
- lim(x→+∞) 1/x = 0
- lim(x→0+) 1/x = +∞
- lim(x→+∞) ln(x) = +∞
- lim(x→+∞) eˣ = +∞

**Opérations sur les limites**
Si lim f = L et lim g = L', alors :
- lim(f + g) = L + L'
- lim(f × g) = L × L'
- lim(f/g) = L/L' si L' ≠ 0

**Formes indéterminées** (nécessitent un calcul) :
∞ - ∞, 0/0, ∞/∞, 0 × ∞

**Continuité**
f est continue en a si : lim(x→a) f(x) = f(a)

Les fonctions usuelles (polynômes, exp, ln, sin, cos) sont continues sur leur domaine.`,
              keywords: ["fonction", "limite", "continuité", "dérivée", "domaine"]
            },
            {
              id: "2",
              name: "Dérivation",
              content: `La dérivée mesure le taux de variation instantané d'une fonction.

**Définition**
f'(a) = lim(h→0) [f(a+h) - f(a)]/h

Interprétation géométrique : f'(a) est le coefficient directeur de la tangente au point (a, f(a)).

**Dérivées usuelles**
- (xⁿ)' = nxⁿ⁻¹
- (eˣ)' = eˣ
- (ln x)' = 1/x
- (sin x)' = cos x
- (cos x)' = -sin x
- (√x)' = 1/(2√x)

**Opérations**
- (u + v)' = u' + v'
- (ku)' = ku' (k constante)
- (uv)' = u'v + uv'
- (u/v)' = (u'v - uv')/v²
- (u∘v)' = v' × u'(v) (dérivée d'une composée)

**Étude de fonctions**
1. Domaine de définition
2. Limites aux bornes
3. Calcul de f'(x)
4. Tableau de signes de f'
5. Tableau de variations
6. Asymptotes éventuelles
7. Courbe représentative

**Théorème**
- Si f' > 0 sur I, alors f est strictement croissante sur I
- Si f' < 0 sur I, alors f est strictement décroissante sur I
- Si f' = 0, on a un extremum local`,
              keywords: ["dérivée", "tangente", "variation", "croissance", "extremum"]
            },
            {
              id: "3",
              name: "Intégration",
              content: `L'intégrale calcule l'aire sous la courbe d'une fonction.

**Primitive**
F est une primitive de f si F' = f
Toutes les primitives de f diffèrent d'une constante : F(x) + k

**Primitives usuelles**
- ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
- ∫ 1/x dx = ln|x| + C
- ∫ eˣ dx = eˣ + C
- ∫ cos x dx = sin x + C
- ∫ sin x dx = -cos x + C

**Intégrale définie**
∫[a,b] f(x) dx = [F(x)]ₐᵇ = F(b) - F(a)

Interprétation : aire algébrique entre la courbe et l'axe des abscisses.

**Propriétés**
- Linéarité : ∫(αf + βg) = α∫f + β∫g
- Relation de Chasles : ∫[a,c] f = ∫[a,b] f + ∫[b,c] f
- ∫[a,b] f = -∫[b,a] f

**Calcul d'aire**
Aire entre f et g sur [a,b] : A = ∫[a,b] |f(x) - g(x)| dx

**Valeur moyenne**
Sur [a,b] : μ = 1/(b-a) × ∫[a,b] f(x) dx

**Applications**
- Calculs d'aires
- Volumes de solides de révolution
- Travail d'une force
- Distance parcourue à partir de la vitesse`,
              keywords: ["intégrale", "primitive", "aire", "calcul", "définition"]
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
              content: `**Équations du second degré**
Forme générale : ax² + bx + c = 0 (avec a ≠ 0)

Discriminant : Δ = b² - 4ac

Solutions :
- Si Δ > 0 : deux solutions réelles x₁ = (-b - √Δ)/(2a) et x₂ = (-b + √Δ)/(2a)
- Si Δ = 0 : une solution double x₀ = -b/(2a)
- Si Δ < 0 : pas de solution réelle (deux solutions complexes)

**Forme factorisée**
Si Δ ≥ 0 : ax² + bx + c = a(x - x₁)(x - x₂)

**Formules de Viète**
Somme des racines : x₁ + x₂ = -b/a
Produit des racines : x₁ × x₂ = c/a

**Inéquations**
Résoudre ax² + bx + c > 0 :
1. Calculer Δ et trouver les racines
2. Faire un tableau de signes
3. Lire la solution selon le signe de a

**Systèmes linéaires**
{ ax + by = e
{ cx + dy = f

Méthodes : substitution, combinaison, Cramer (avec déterminants)`,
              keywords: ["équation", "inéquation", "système", "second degré", "discriminant"]
            },
            {
              id: "2",
              name: "Polynômes",
              content: `Un polynôme P est une expression de la forme :
P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀

Le degré est n (si aₙ ≠ 0).

**Racines**
α est une racine de P si P(α) = 0

**Théorème de factorisation**
Si α est racine, alors P(x) = (x - α) × Q(x)
où Q est un polynôme de degré n-1.

**Multiplicité**
Si P(x) = (x - α)ᵏ × Q(x) avec Q(α) ≠ 0, alors α est racine de multiplicité k.

**Théorème fondamental de l'algèbre**
Un polynôme de degré n admet exactement n racines (comptées avec multiplicité) dans ℂ.

**Identité remarquables**
- (a + b)² = a² + 2ab + b²
- (a - b)² = a² - 2ab + b²
- a² - b² = (a + b)(a - b)
- (a + b)³ = a³ + 3a²b + 3ab² + b³
- a³ + b³ = (a + b)(a² - ab + b²)
- a³ - b³ = (a - b)(a² + ab + b²)

**Division euclidienne**
P(x) = Q(x) × D(x) + R(x)
avec deg(R) < deg(D)`,
              keywords: ["polynôme", "racine", "factorisation", "degré", "identité"]
            },
            {
              id: "3",
              name: "Matrices et déterminants",
              content: `Une matrice est un tableau rectangulaire de nombres.

**Notations**
Matrice A de taille m×n (m lignes, n colonnes)
Coefficient ligne i, colonne j : aᵢⱼ

**Opérations**
Addition : (A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ
Multiplication par scalaire : (kA)ᵢⱼ = k × aᵢⱼ
Multiplication : (AB)ᵢⱼ = Σₖ aᵢₖ × bₖⱼ

Attention : AB ≠ BA en général !

**Matrice identité Iₙ**
Diagonale = 1, reste = 0
A × Iₙ = Iₙ × A = A

**Matrice inverse**
Si det(A) ≠ 0, il existe A⁻¹ telle que A × A⁻¹ = A⁻¹ × A = I

Pour une matrice 2×2 :
A = [a b; c d]
A⁻¹ = 1/det(A) × [d -b; -c a]

**Déterminant 2×2**
det([a b; c d]) = ad - bc

**Déterminant 3×3** (règle de Sarrus)
det = a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂
    - a₁₃a₂₂a₃₁ - a₁₁a₂₃a₃₂ - a₁₂a₂₁a₃₃

**Application : résolution de systèmes**
AX = B → X = A⁻¹B (si A inversible)`,
              keywords: ["matrice", "déterminant", "système", "inverse", "multiplication"]
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
              name: "ADN et expression génique",
              content: `L'ADN (acide désoxyribonucléique) est le support de l'information génétique.

**Structure de l'ADN**
L'ADN est une double hélice formée de deux brins complémentaires. Chaque brin est une succession de nucléotides composés de :
- Un sucre (désoxyribose)
- Un groupement phosphate
- Une base azotée : Adénine (A), Thymine (T), Guanine (G), Cytosine (C)

**Complémentarité des bases**
- A s'apparie avec T (2 liaisons hydrogène)
- G s'apparie avec C (3 liaisons hydrogène)

Un gène est un segment d'ADN codant pour une protéine.

**Réplication de l'ADN**
Avant la division cellulaire, l'ADN se duplique. L'enzyme ADN polymérase synthétise deux molécules identiques en utilisant chaque brin comme matrice. C'est un mécanisme semi-conservatif.

**Du gène à la protéine (expression génique)**

**1. Transcription** (dans le noyau)
L'ARN polymérase copie un gène en ARN messager (ARNm). L'ARNm est une copie simple brin où U (uracile) remplace T.

**2. Traduction** (dans le cytoplasme, sur les ribosomes)
L'ARNm est lu par codons (triplets de nucléotides). Chaque codon code pour un acide aminé. Les ARN de transfert (ARNt) apportent les acides aminés correspondants.

Exemple : AUG code pour la méthionine (codon start)

La chaîne d'acides aminés forme une protéine.`,
              keywords: ["ADN", "gène", "chromosome", "mutation", "transcription", "traduction", "ARN"]
            },
            {
              id: "2",
              name: "Hérédité mendélienne",
              content: `Gregor Mendel (1822-1884) a découvert les lois fondamentales de l'hérédité en étudiant les pois.

**Vocabulaire**
- **Gène** : unité d'hérédité
- **Allèle** : version d'un gène (ex : A pour grand, a pour petit)
- **Génotype** : ensemble des allèles d'un individu (AA, Aa, aa)
- **Phénotype** : caractéristique observable (grand ou petit)
- **Dominant** : allèle qui s'exprime même en une seule copie (A)
- **Récessif** : allèle qui ne s'exprime qu'en deux copies (a)
- **Homozygote** : deux allèles identiques (AA ou aa)
- **Hétérozygote** : deux allèles différents (Aa)

**Première loi de Mendel : Uniformité de F1**
Le croisement de deux lignées pures (homozygotes) donne une génération F1 uniforme.

Exemple : AA × aa → 100% Aa (phénotype dominant)

**Deuxième loi : Ségrégation en F2**
Le croisement de deux F1 donne en F2 un rapport 3:1 (phénotypes) ou 1:2:1 (génotypes).

Aa × Aa → 1 AA : 2 Aa : 1 aa
Phénotypes : 3 grands (AA + Aa) : 1 petit (aa)

**Échiquier de Punnett**
Outil pour prévoir les génotypes et phénotypes des descendants.

**Troisième loi : Indépendance des caractères**
Les gènes situés sur des chromosomes différents se transmettent indépendamment.

Croisement AaBb × AaBb → 9:3:3:1 en F2`,
              keywords: ["Mendel", "allèle", "génotype", "phénotype", "dominant", "récessif", "hérédité"]
            },
            {
              id: "3",
              name: "Génétique humaine et maladies",
              content: `**Transmission des maladies génétiques**

**1. Transmission autosomique récessive**
L'allèle malade est récessif (noté a), porté par un chromosome non sexuel (autosome).
Pour être malade : génotype aa
Porteurs sains : Aa (n'expriment pas la maladie)

Exemples : mucoviscidose, drépanocytose, phénylcétonurie

Si deux porteurs sains (Aa × Aa) ont un enfant :
- 25% sain (AA)
- 50% porteur sain (Aa)
- 25% malade (aa)

**2. Transmission autosomique dominante**
L'allèle malade est dominant (A). Une seule copie suffit pour être malade.

Exemples : maladie de Huntington, achondroplasie

Si un parent malade Aa × parent sain aa :
- 50% malades (Aa)
- 50% sains (aa)

**3. Transmission liée au chromosome X**
Le gène est sur le chromosome X.
- Femmes XX : peuvent être porteuses saines
- Hommes XY : si allèle malade sur X, ils sont malades

Exemples : hémophilie, daltonisme, myopathie de Duchenne

**Conseil génétique**
Évaluation du risque de transmettre une maladie génétique. Établissement d'un arbre généalogique (pedigree) pour calculer les probabilités.

**Mutations**
Modifications de l'ADN pouvant causer des maladies. Types : substitution, délétion, insertion.`,
              keywords: ["maladie", "génétique", "hérédité", "autosome", "chromosome X", "mutation", "conseil"]
            }
          ]
        },
        {
          id: "02",
          name: "Évolution",
          description: "Mécanismes et preuves de l'évolution",
          parts: [
            {
              id: "1",
              name: "Théorie de l'évolution",
              content: `**Théorie de Darwin (1859)**
Les espèces évoluent au cours du temps par sélection naturelle.

**Observations**
- Les individus d'une espèce présentent des variations
- Plus d'individus naissent qu'il ne peut en survivre
- Les ressources sont limitées → lutte pour la survie

**Déduction : Sélection naturelle**
Les individus les mieux adaptés à leur environnement survivent et se reproduisent davantage. Ils transmettent leurs caractères avantageux à leur descendance.

Génération après génération, les caractères favorables deviennent plus fréquents.

**Exemple célèbre : phalènes du bouleau**
Avant la révolution industrielle : papillons clairs (camouflage sur écorce claire)
Après pollution : papillons sombres avantagés (camouflage sur écorce noircie)

**Adaptation**
Caractéristique d'un organisme qui améliore sa survie et reproduction dans son milieu.

**Spéciation**
Formation de nouvelles espèces à partir d'une espèce ancestrale, souvent par isolement géographique.`,
              keywords: ["évolution", "Darwin", "sélection naturelle", "adaptation", "spéciation"]
            },
            {
              id: "2",
              name: "Preuves de l'évolution",
              content: `**1. Fossiles**
Restes d'organismes anciens conservés dans les roches. Les fossiles montrent que les espèces ont changé au cours du temps.

La datation des fossiles permet de reconstituer l'histoire de la vie :
- Paléozoïque : poissons, premiers vertébrés terrestres
- Mésozoïque : dinosaures
- Cénozoïque : mammifères, humains

**2. Anatomie comparée**
Les organes homologues ont la même origine embryonnaire mais des fonctions différentes.

Exemple : membre antérieur des vertébrés
- Bras humain, aile de chauve-souris, nageoire de baleine, patte de cheval
→ même structure osseuse = ancêtre commun

**Organes vestigiaux** : structures réduites sans fonction (appendice humain, os du bassin chez les baleines)

**3. Embryologie**
Les embryons de vertébrés se ressemblent beaucoup au début du développement → ancêtre commun.

**4. Biologie moléculaire**
Comparaison des séquences d'ADN et de protéines.
Plus deux espèces sont proches, plus leur ADN est similaire.

Exemple : ADN humain et chimpanzé : 98,8% identique

**5. Biogéographie**
Distribution géographique des espèces expliquée par l'histoire évolutive.`,
              keywords: ["fossile", "anatomie", "embryologie", "ADN", "preuve", "homologie"]
            },
            {
              id: "3",
              name: "Mécanismes de l'évolution",
              content: `**1. Mutations**
Changements aléatoires de l'ADN créant de nouveaux allèles.
Source première de la variabilité génétique.

Types : substitution, insertion, délétion, duplication

**2. Sélection naturelle**
Mécanisme principal de l'évolution. Les allèles favorables augmentent en fréquence.

Types :
- **Sélection directionnelle** : favorise un extrême (ex : girafes à long cou)
- **Sélection stabilisante** : favorise la moyenne (ex : poids des bébés)
- **Sélection diversifiante** : favorise les extrêmes (polymorphisme)

**3. Dérive génétique**
Variation aléatoire des fréquences alléliques, surtout dans les petites populations.
Effet fondateur, goulot d'étranglement.

**4. Flux génétique**
Échange d'allèles entre populations par migration.

**5. Sélection sexuelle**
Choix du partenaire influence la reproduction.
Exemple : queue du paon (préférée par les femelles)

**Coévolution**
Évolution simultanée de deux espèces en interaction (prédateur-proie, plante-pollinisateur).

**Évolution convergente**
Espèces non apparentées développent des caractères similaires (ailes d'insectes vs oiseaux).`,
              keywords: ["mutation", "sélection", "dérive", "flux génétique", "coévolution"]
            }
          ]
        }
      ]
    }
  ]
}