import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Divider,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
        priority
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handlePriorityChange = (e: SelectChangeEvent) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    return todo.completed;
  });

  const priorityColors = {
    low: 'success',
    medium: 'info',
    high: 'error'
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Lista do zrobienia
        </Typography>

        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Dodaj nowe zadanie"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mr: 2 }}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priorytet</InputLabel>
            <Select
              value={priority}
              label="Priorytet"
              onChange={handlePriorityChange}
            >
              <MenuItem value="low">Niski</MenuItem>
              <MenuItem value="medium">Średni</MenuItem>
              <MenuItem value="high">Wysoki</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTodo}
            sx={{ ml: 2 }}
          >
            Dodaj
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilter('all')}
            sx={{ mx: 1 }}
          >
            Wszystko
          </Button>
          <Button
            variant={filter === 'active' ? 'contained' : 'outlined'}
            onClick={() => setFilter('active')}
            sx={{ mx: 1 }}
          >
            Aktywne
          </Button>
          <Button
            variant={filter === 'completed' ? 'contained' : 'outlined'}
            onClick={() => setFilter('completed')}
            sx={{ mx: 1 }}
          >
            Skończone
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <List>
          {filteredTodos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Brak zadań do wyświetlenia
              </Typography>
            </Box>
          ) : (
            filteredTodos.map(todo => (
              <React.Fragment key={todo.id}>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary'
                        }}
                      >
                        {todo.text}
                      </Typography>
                    }
                  />
                  <Chip
                    label={todo.priority}
                    color={priorityColors[todo.priority] as any}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, color: 'text.secondary' }}>
          <Typography variant="body2">
            Pozostało {todos.filter(t => !t.completed).length} zadań
          </Typography>
          <Typography variant="body2">
            Łącznie {todos.length} zadań
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TodoApp;