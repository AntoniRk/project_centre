import { Project } from '../types';

export const projects: Project[] = [

    {
        id: 1,
        title: 'Lista do zrobienia',
        description: '13.03.25r. Lista zadań z możliwością dodawania, usuwania i oznaczania jako wykonane',
        //imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'LocalStorage'],
        path: '/projects/todo'
    },
    {
        id: 2,
        title: 'Menadżer zadań',
        description: '14.03.25r. Aplikacja do zarządzania zadaniami z możliwością dodawania, usuwania, edycji i przenoszenia zadań między kolumnami',
        technologies: ['React', 'TypeScript', 'Material UI', 'DnD-Kit', 'LocalStorage'],
        path: '/projects/task-manager'
    },
    {
        id: 3,
        title: 'Inspektor elementów',
        description: '14.03.25r. Narzędzie do analizy komponentów React, dzikie i głupie.',
        technologies: ['React', 'TypeScript', 'Performance API', 'React Internals'],
        path: '/projects/component-analyzer'
    },
    {
        id: 4,
        title: "Eksplorator Stylów CSS",
        description: "17.03.25r. Interaktywne narzędzie do eksperymentowania z właściwościami CSS i podglądem zmian w czasie rzeczywistym.",
        technologies: ["React", "TypeScript", "Material UI", "CSS"],
        path: "/projects/css-style-explorer"
    },
    {
        id: 5,
        title: "Kreator Animacji CSS",
        description: "18.03.25r. Kreator animacji CSS z podglądem w czasie rzeczywistym i możliwością eksportu kodu CSS.",
        technologies: ["React", "TypeScript", "Material UI", "CSS", "localStorage"],
        path: "/projects/animation-creator"
    }
];