import { TaskBoard } from './types';

// Przykładowe dane początkowe
export const initialData: TaskBoard = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Stwórz podstawę projektu',
      description: 'Strona główna, routing, konteksty',
      status: 'done',
      priority: 'high',
      createdAt: new Date(2025, 3, 13),
      tags: ['setup', 'architecture']
    },
    'task-2': {
      id: 'task-2',
      title: 'Przetestuj stronę',
      description: 'No klikam tam i siam',
      status: 'inProgress',
      priority: 'high',
      dueDate: new Date(2025, 1, 20),
      createdAt: new Date(2025, 0, 20),
      tags: ['auth', 'security']
    },
    'task-3': {
      id: 'task-3',
      title: 'Ładne style',
      status: 'inProgress',
      priority: 'medium',
      dueDate: new Date(2025, 1, 25),
      createdAt: new Date(2025, 0, 25),
      tags: ['ui', 'design']
    },
    'task-4': {
      id: 'task-4',
      title: 'Udostępnij',
      description: 'Wysyłam w ether',
      status: 'todo',
      priority: 'low',
      createdAt: new Date(2025, 0, 30),
      tags: ['charts', 'data']
    }
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'Do zrobienia',
      taskIds: ['task-3', 'task-4']
    },
    'inProgress': {
      id: 'inProgress',
      title: 'W trakcie',
      taskIds: ['task-2']
    },
    'done': {
      id: 'done',
      title: 'Zrobione',
      taskIds: ['task-1']
    }
  },
  columnOrder: ['todo', 'inProgress', 'done']
};