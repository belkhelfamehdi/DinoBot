export interface Fiche {
    id: string;
    subjectId: string;
    subject: string;
    type: "fiche" | "flashcard" | "quiz";
    title: string;
    subtitle: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
}

export interface FicheGroup {
    date: string;
    items: Fiche[];
}

export const fichesData: FicheGroup[] = [
    {
        date: "jeudi, 30 oct.",
        items: [
            {
                id: "fiche-001",
                subjectId: "chimie",
                subject: "Chimie",
                type: "fiche",
                title: "Acides et bases (Terminale)",
                subtitle: "Concepts, calculs et méthodes",
                content: `# Acides et bases

## Définitions
Un acide est une espèce chimique capable de céder un proton H⁺. Une base est capable de capter un proton.

## Calculs de pH
- pH = -log₁₀[H₃O⁺]
- pH < 7 : acide
- pH = 7 : neutre
- pH > 7 : basique

## Titrages
Le point d'équivalence est atteint quand n(acide) = n(base).`,
                createdAt: "2024-10-30T08:38:00",
                updatedAt: "2024-10-30T08:38:00",
                icon: "🧪",
            },
        ],
    },
    {
        date: "dimanche, 19 oct.",
        items: [
            {
                id: "fiche-002",
                subjectId: "mathematiques",
                subject: "Mathématiques",
                type: "fiche",
                title: "Fonctions exponentielles",
                subtitle: "Propriétés et applications",
                content: `# Fonctions exponentielles

## Définition
La fonction exponentielle f(x) = eˣ est définie sur ℝ.

## Propriétés
- (eˣ)' = eˣ
- eᵃ × eᵇ = eᵃ⁺ᵇ
- eᵃ / eᵇ = eᵃ⁻ᵇ
- (eᵃ)ⁿ = eᵃⁿ

## Limites
- lim(x→+∞) eˣ = +∞
- lim(x→-∞) eˣ = 0`,
                createdAt: "2024-10-19T16:06:00",
                updatedAt: "2024-10-19T16:06:00",
                icon: "📐",
            },
        ],
    },
    {
        date: "lundi, 13 oct.",
        items: [
            {
                id: "fiche-003",
                subjectId: "svt",
                subject: "SVT",
                type: "flashcard",
                title: "Génétique et hérédité",
                subtitle: "ADN, gènes et lois de Mendel",
                content: `# Génétique et hérédité

## ADN
L'ADN est le support de l'information génétique. Structure en double hélice.

## Gènes et allèles
- Gène : unité d'hérédité
- Allèle : version d'un gène
- Génotype : ensemble des allèles
- Phénotype : caractéristique observable

## Lois de Mendel
1. Uniformité de F1
2. Ségrégation en F2 (3:1)
3. Indépendance des caractères`,
                createdAt: "2024-10-13T10:15:00",
                updatedAt: "2024-10-13T10:15:00",
                icon: "🧬",
            },
        ],
    },
    {
        date: "vendredi, 10 oct.",
        items: [
            {
                id: "fiche-004",
                subjectId: "physique",
                subject: "Physique",
                type: "fiche",
                title: "Mécanique newtonienne",
                subtitle: "Lois du mouvement et forces",
                content: `# Mécanique newtonienne

## Les trois lois de Newton

### 1ère loi : Principe d'inertie
Un corps persiste dans son état de repos ou de mouvement rectiligne uniforme si ΣF = 0

### 2ème loi : PFD
ΣF = m × a

### 3ème loi : Actions réciproques
F(A→B) = -F(B→A)

## Forces usuelles
- Poids : P = mg
- Réaction normale : N ⊥ au support
- Frottement : f = μN`,
                createdAt: "2024-10-10T14:22:00",
                updatedAt: "2024-10-10T14:22:00",
                icon: "⚛️",
            },
        ],
    },
    {
        date: "mercredi, 8 oct.",
        items: [
            {
                id: "fiche-005",
                subjectId: "mathematiques",
                subject: "Mathématiques",
                type: "flashcard",
                title: "Dérivées usuelles",
                subtitle: "Formules et règles de dérivation",
                content: `# Dérivées usuelles

## Fonctions de base
- (xⁿ)' = nxⁿ⁻¹
- (eˣ)' = eˣ
- (ln x)' = 1/x
- (sin x)' = cos x
- (cos x)' = -sin x

## Règles
- (u + v)' = u' + v'
- (ku)' = ku'
- (uv)' = u'v + uv'
- (u/v)' = (u'v - uv')/v²
- (u∘v)' = v' × u'(v)`,
                createdAt: "2024-10-08T11:30:00",
                updatedAt: "2024-10-08T11:30:00",
                icon: "📐",
            },
            {
                id: "fiche-006",
                subjectId: "chimie",
                subject: "Chimie",
                type: "fiche",
                title: "Réactions d'oxydoréduction",
                subtitle: "Couples redox et équations",
                content: `# Réactions d'oxydoréduction

## Définitions
- Oxydation : perte d'électrons
- Réduction : gain d'électrons
- Oxydant : capte les électrons
- Réducteur : donne les électrons

## Couples redox
Ox/Red : Fe³⁺/Fe²⁺, Cu²⁺/Cu, MnO₄⁻/Mn²⁺

## Méthode des demi-équations
1. Équilibrer les éléments autres que O et H
2. Équilibrer O avec H₂O
3. Équilibrer H avec H⁺
4. Équilibrer les charges avec e⁻`,
                createdAt: "2024-10-08T09:45:00",
                updatedAt: "2024-10-08T09:45:00",
                icon: "🧪",
            },
        ],
    },
];

// Couleurs par matière (cohérentes avec courses.ts)
export const subjectColors: Record<string, { color: string; bgColor: string; gradient: string; iconBg: string }> = {
    chimie: {
        color: "text-[#7C3AED]",
        bgColor: "bg-[#F0E7FF]",
        gradient: "from-purple-500 to-purple-600",
        iconBg: "from-purple-100 to-purple-50",
    },
    physique: {
        color: "text-[#0284C7]",
        bgColor: "bg-[#E0F2FE]",
        gradient: "from-blue-500 to-blue-600",
        iconBg: "from-blue-100 to-blue-50",
    },
    mathematiques: {
        color: "text-[#D97706]",
        bgColor: "bg-[#FEF3C7]",
        gradient: "from-orange-500 to-orange-600",
        iconBg: "from-orange-100 to-orange-50",
    },
    svt: {
        color: "text-[#16A34A]",
        bgColor: "bg-[#DCFCE7]",
        gradient: "from-green-500 to-green-600",
        iconBg: "from-green-100 to-green-50",
    },
};
