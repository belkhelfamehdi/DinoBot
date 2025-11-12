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
