import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Menu, 
  MenuItem,
  ListItemIcon,
  ListItemText,
  // Usuwamy CardActionArea
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Label as LabelIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskPriority } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, isDragging = false }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1
  };
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClose();
    onEdit();
  };
  
  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClose();
    onDelete();
  };
  
  // Mapowanie priorytetów na kolory
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'info';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        mb: 2,
        boxShadow: isDragging ? 8 : 1,
        position: 'relative',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing'
        },
        // Dodajemy hover effect, który był na CardActionArea
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      onClick={onEdit} // Przenosimy onClick tutaj
    >
      {/* Zastępujemy CardActionArea zwykłym Box */}
      <Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="div" sx={{ mb: 1, pr: 4 }}>
              {task.title}
            </Typography>
            <IconButton
              size="small"
              aria-label="more"
              aria-controls={open ? 'task-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          
          {task.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {task.description}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip 
              size="small" 
              label={task.priority} 
              color={getPriorityColor(task.priority)}
            />
            
            {task.tags.map(tag => (
              <Chip
                key={tag}
                size="small"
                icon={<LabelIcon />}
                label={tag}
                variant="outlined"
              />
            ))}
          </Box>
          
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Box>
      
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'task-actions',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default TaskCard;