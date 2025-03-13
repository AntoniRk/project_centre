import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A fully responsive e-commerce website with cart functionality',
    imageUrl: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'Redux', 'Styled Components']
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A drag-and-drop task management application',
    imageUrl: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'TypeScript', 'React DnD']
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather updates with location detection',
    imageUrl: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'OpenWeather API', 'Axios']
  },
  {
    id: 4,
    title: 'Todo Application',
    description: 'A feature-rich todo list application with filtering and priority management',
    imageUrl: 'https://via.placeholder.com/300x200',
    technologies: ['React', 'TypeScript', 'Material UI', 'LocalStorage'],
    path: '/projects/todo'
  },
];