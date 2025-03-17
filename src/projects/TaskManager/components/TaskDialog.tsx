import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  SelectChangeEvent,
  FormHelperText,
  IconButton,
  InputAdornment,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (task: Task) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [titleError, setTitleError] = useState('');

  // Inicjalizacja formularza przy otwarciu
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate) : null);
      setTags(task.tags);
    } else {
      // Wartości domyślne dla nowego zadania
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate(null);
      setTags([]);
    }
    setTitleError('');
  }, [task, open]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as TaskStatus);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as TaskPriority);
  };

  const handleAddTag = () => {
    if (tag.trim() !== '' && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(t => t !== tagToDelete));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    // Walidacja
    if (title.trim() === '') {
      setTitleError('Tytuł nie może być pusty');
      return;
    }

    const updatedTask: Task = {
      id: task ? task.id : uuidv4(),
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate || undefined,
      createdAt: task ? task.createdAt : new Date(),
      tags
    };

    onSave(updatedTask);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edytuj zadanie' : 'Stwórz nowe zadanie'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Tytuł zadania"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim() !== '') {
                setTitleError('');
              }
            }}
            error={!!titleError}
            helperText={titleError}
            required
          />

          <TextField
            margin="dense"
            label="Opis"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="todo">Do zrobienia</MenuItem>
                  <MenuItem value="inProgress">W trakcie</MenuItem>
                  <MenuItem value="done">Zrobione</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="priority-label">Priorytet</InputLabel>
                <Select
                  labelId="priority-label"
                  value={priority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  <MenuItem value="low">Niski</MenuItem>
                  <MenuItem value="medium">Średni</MenuItem>
                  <MenuItem value="high">Wysoki</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data końcowa"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'dense'
                }
              }}
            />
          </LocalizationProvider>

          <FormControl fullWidth margin="dense">
            <TextField
              label="Dodaj tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add tag"
                      onClick={handleAddTag}
                      edge="end"
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText>Kliknij Enter lub przycisk + aby dodać</FormHelperText>
          </FormControl>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {task ? 'Zaktualizuj' : 'Stwórz'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;