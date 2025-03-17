import { Project } from '../types';

export const projects: Project[] = [

    {
        id: 1,
        title: 'Menadżer zadań',
        description: 'Aplikacja do zarządzania zadaniami z możliwością dodawania, usuwania, edycji i przenoszenia zadań między kolumnami',
        //        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'DnD-Kit', 'LocalStorage'],
        path: '/projects/task-manager'
    },
    {
        id: 2,
        title: 'Lista do zrobienia',
        description: 'Lista zadań z możliwością dodawania, usuwania i oznaczania jako wykonane',
        technologies: ['React', 'TypeScript', 'Material UI', 'LocalStorage'],
        path: '/projects/todo'
    },
    {
        id: 3,
        title: 'Inspektor elementów',
        description: 'Narzędzie do analizy komponentów React, dzikie i głupie.',
        technologies: ['React', 'TypeScript', 'Performance API', 'React Internals'],
        path: '/projects/component-analyzer'
    },
    {
        id: 4,
        title: "Eksplorator Stylów CSS",
        description: "Interaktywne narzędzie do eksperymentowania z właściwościami CSS i podglądem zmian w czasie rzeczywistym.",
        technologies: ["React", "TypeScript", "Material UI", "CSS"],
        path: "/projects/css-style-explorer"
    }
];