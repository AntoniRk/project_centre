import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Typography, useTheme } from '@mui/material';

interface SortableLetterProps {
  id: string;
  letter: string;
  value: number;
  isNew?: boolean;
}

const SortableLetter: React.FC<SortableLetterProps> = ({ id, letter, value, isNew }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={3}
      className={isNew ? 'letter-tile new-letter' : 'letter-tile'}
      sx={{
        width: '60px',
        height: '60px',
        margin: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        userSelect: 'none',
        backgroundColor: isDarkMode ? '#424242' : '#f8f3e6',
        border: isDarkMode ? '1px solid #616161' : '1px solid #d4c8a8',
        color: isDarkMode ? '#ffffff' : 'inherit',
        position: 'relative',
      }}
    >
      <Typography variant="h4" component="div">
        {letter}
      </Typography>
      <Typography 
        variant="caption" 
        component="div" 
        sx={{ 
          fontSize: '10px', 
          position: 'absolute', 
          bottom: '5px', 
          right: '5px',
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default SortableLetter;