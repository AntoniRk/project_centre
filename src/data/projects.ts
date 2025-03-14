import { Project } from '../types';

export const projects: Project[] = [

    {
        id: 1,
        title: 'Task Management App',
        description: 'Aplikacja do zarządzania zadaniami z możliwością dodawania, usuwania, edycji i przenoszenia zadań między kolumnami',
        //        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'DnD-Kit', 'LocalStorage'],
        path: '/projects/task-manager'
    },
    {
        id: 2,
        title: 'Todo Application',
        description: 'Lista zadań z możliwością dodawania, usuwania i oznaczania jako wykonane',
        //        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'LocalStorage'],
        path: '/projects/todo'
    },
    {
        id: 3,
        title: 'Component Analyzer',
        description: 'Narzędzie do analizy i optymalizacji wydajności komponentów React',
        technologies: ['React', 'TypeScript', 'Performance API', 'React Internals'],
        path: '/projects/component-analyzer'
      },
];