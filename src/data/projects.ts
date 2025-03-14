import { Project } from '../types';

export const projects: Project[] = [

    {
        id: 1,
        title: 'Task Management App',
        description: 'A drag-and-drop task management application with Kanban board layout',
        //        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'DnD-Kit', 'LocalStorage'],
        path: '/projects/task-manager'
    },
    {
        id: 2,
        title: 'Todo Application',
        description: 'A feature-rich todo list application with filtering and priority management',
        //        imageUrl: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'TypeScript', 'Material UI', 'LocalStorage'],
        path: '/projects/todo'
    },
];