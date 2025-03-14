export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  tags: string[];
}

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string[];
}

export interface TaskBoard {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}