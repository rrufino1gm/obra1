
import type { Phase } from './types';

export const PROJECT_DATA: Phase[] = [
    {
        id: 1,
        name: "1. Início da Obra - Pag. Inicial",
        percentageWeight: 10,
        activities: [
            { id: 1, name: "Limpeza", dueDate: "2025-09-21", completed: false, photos: [] },
            { id: 2, name: "Barraco", dueDate: "2025-09-21", completed: false, photos: [] },
            { id: 3, name: "Fundação", dueDate: "2025-10-21", completed: false, photos: [] },
        ]
    },
    {
        id: 2,
        name: "2. Estrutura e Cobertura",
        percentageWeight: 27,
        activities: [
            { id: 4, name: "Levantar parede", dueDate: "2025-12-20", completed: false, photos: [] },
            { id: 5, name: "Laje", dueDate: "2025-12-20", completed: false, photos: [] },
            { id: 6, name: "Telhado", dueDate: "2026-01-19", completed: false, photos: [] },
        ]
    },
    {
        id: 3,
        name: "3. Rebocos e Instalações",
        percentageWeight: 22,
        activities: [
            { id: 7, name: "Reboco", dueDate: "2026-03-20", completed: false, photos: [] },
            { id: 8, name: "Elétrica", dueDate: "2026-03-20", completed: false, photos: [] },
            { id: 9, name: "Hidráulica", dueDate: "2026-04-19", completed: false, photos: [] },
            { id: 10, name: "Ar-condicionado", dueDate: "2026-04-19", completed: false, photos: [] },
        ]
    },
    {
        id: 4,
        name: "4. Gesso e Pisos",
        percentageWeight: 16,
        activities: [
            { id: 11, name: "Gesso", dueDate: "2026-06-18", completed: false, photos: [] },
            { id: 12, name: "Forro", dueDate: "2026-06-18", completed: false, photos: [] },
            { id: 13, name: "Piso", dueDate: "2026-07-18", completed: false, photos: [] },
            { id: 14, name: "Acabamento", dueDate: "2026-07-18", completed: false, photos: [] },
        ]
    },
    {
        id: 5,
        name: "5. Portas e Louças",
        percentageWeight: 17,
        activities: [
            { id: 15, name: "Porta", dueDate: "2026-09-16", completed: false, photos: [] },
            { id: 16, name: "Janela", dueDate: "2026-09-16", completed: false, photos: [] },
            { id: 17, name: "Pias", dueDate: "2026-09-16", completed: false, photos: [] },
            { id: 18, name: "Metais", dueDate: "2026-09-16", completed: false, photos: [] },
            { id: 19, name: "Elétrica final", dueDate: "2026-09-16", completed: false, photos: [] },
        ]
    },
    {
        id: 6,
        name: "6. Pintura e Entrega",
        percentageWeight: 8,
        activities: [
            { id: 20, name: "Pintura interna e externa", dueDate: "2026-11-15", completed: false, photos: [] },
            { id: 21, name: "Limpeza final", dueDate: "2026-11-15", completed: false, photos: [] },
        ]
    }
];

export const CHART_DATA = [
    { name: "1. Início Obra", value: 10, color: '#f87171' }, // red-400
    { name: "2. Estrutura e Cobertura", value: 27, color: '#fb923c' }, // orange-400
    { name: "3. Rebocos e Instalações", value: 22, color: '#facc15' }, // yellow-400
    { name: "4. Gesso e Pisos", value: 16, color: '#4ade80' }, // green-400
    { name: "5. Portas e Louças", value: 17, color: '#60a5fa' }, // blue-400
    { name: "6. Pintura e Entrega", value: 8, color: '#a78bfa' }, // violet-400
];
