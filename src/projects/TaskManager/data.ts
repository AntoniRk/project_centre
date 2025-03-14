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
      title: 'Implement authentication',
      description: 'Add login, registration and password reset',
      status: 'inProgress',
      priority: 'high',
      dueDate: new Date(2023, 1, 20),
      createdAt: new Date(2023, 0, 20),
      tags: ['auth', 'security']
    },
    'task-3': {
      id: 'task-3',
      title: 'Design dashboard UI',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date(2023, 1, 25),
      createdAt: new Date(2023, 0, 25),
      tags: ['ui', 'design']
    },
    'task-4': {
      id: 'task-4',
      title: 'Add data visualization',
      description: 'Implement charts and graphs for analytics',
      status: 'todo',
      priority: 'low',
      createdAt: new Date(2023, 0, 30),
      tags: ['charts', 'data']
    }
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-3', 'task-4']
    },
    'inProgress': {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: ['task-2']
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-1']
    }
  },
  columnOrder: ['todo', 'inProgress', 'done']
};