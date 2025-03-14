import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Column, Task } from '../types';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks, onEditTask, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id
  });
  
  // Mapowanie statusów na kolory
  const getColumnColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'primary.main';
      case 'inProgress':
        return 'warning.main';
      case 'done':
        return 'success.main';
      default:
        return 'grey.500';
    }
  };
  
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '600px',
        borderTop: 3,
        borderColor: getColumnColor(column.id),
        transition: 'background-color 0.2s ease',
        bgcolor: isOver ? 'action.hover' : 'background.paper'
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Typography 
          variant="h6" 
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          {column.title} ({tasks.length})
        </Typography>
      </Box>
      
      <Box
        ref={setNodeRef}
        sx={{
          p: 2,
          flexGrow: 1,
          minHeight: '100px',
          overflowY: 'auto'
        }}
      >
        <SortableContext 
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default TaskColumn;