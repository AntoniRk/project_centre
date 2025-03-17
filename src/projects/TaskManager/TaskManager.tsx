import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  useTheme
} from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Add as AddIcon } from '@mui/icons-material';
import TaskColumn from './components/TaskColumn';
import TaskCard from './components/TaskCard';
import TaskDialog from './components/TaskDialog';
import { TaskBoard, Task, TaskStatus } from './types';
import { initialData } from './data';

const TaskManager: React.FC = () => {
  const [board, setBoard] = useState<TaskBoard>(() => {
    const savedBoard = localStorage.getItem('taskBoard');
    return savedBoard ? JSON.parse(savedBoard) : initialData;
  });

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const theme = useTheme();

  // Konfiguracja sensorów dla dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Zapisywanie stanu w localStorage
  useEffect(() => {
    localStorage.setItem('taskBoard', JSON.stringify(board));
  }, [board]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Znajdź źródłową i docelową kolumnę
    const activeColumnId = findColumnOfTask(activeId);
    const overColumnId = findColumnContainingId(overId);

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) return;

    setBoard(prev => {
      const activeColumn = prev.columns[activeColumnId];
      const overColumn = prev.columns[overColumnId];

      // Usuń zadanie z aktywnej kolumny
      const newActiveTaskIds = [...activeColumn.taskIds];
      const activeIndex = newActiveTaskIds.indexOf(activeId);
      newActiveTaskIds.splice(activeIndex, 1);

      // Dodaj zadanie do docelowej kolumny
      const newOverTaskIds = [...overColumn.taskIds];
      newOverTaskIds.push(activeId);

      // Aktualizuj status zadania
      const updatedTasks = {
        ...prev.tasks,
        [activeId]: {
          ...prev.tasks[activeId],
          status: overColumnId as TaskStatus
        }
      };

      return {
        ...prev,
        tasks: updatedTasks,
        columns: {
          ...prev.columns,
          [activeColumnId]: {
            ...activeColumn,
            taskIds: newActiveTaskIds
          },
          [overColumnId]: {
            ...overColumn,
            taskIds: newOverTaskIds
          }
        }
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeColumnId = findColumnOfTask(activeId);
    const overColumnId = findColumnOfTask(overId);

    if (activeColumnId && overColumnId && activeColumnId === overColumnId) {
      // Zmiana kolejności w tej samej kolumnie
      setBoard(prev => {
        const column = prev.columns[activeColumnId];
        const oldIndex = column.taskIds.indexOf(activeId);
        const newIndex = column.taskIds.indexOf(overId);

        const newTaskIds = arrayMove(column.taskIds, oldIndex, newIndex);

        return {
          ...prev,
          columns: {
            ...prev.columns,
            [activeColumnId]: {
              ...column,
              taskIds: newTaskIds
            }
          }
        };
      });
    }
  };

  // Funkcja pomocnicza do znalezienia kolumny zawierającej zadanie
  const findColumnOfTask = (taskId: string): string | null => {
    for (const columnId of board.columnOrder) {
      if (board.columns[columnId].taskIds.includes(taskId)) {
        return columnId;
      }
    }
    return null;
  };

  // Funkcja pomocnicza do znalezienia kolumny na podstawie id
  const findColumnContainingId = (id: string): string | null => {
    // Sprawdź, czy id to id kolumny
    if (board.columns[id]) {
      return id;
    }

    // Sprawdź, czy id to id zadania i znajdź jego kolumnę
    return findColumnOfTask(id);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const columnId = findColumnOfTask(taskId);

    if (!columnId) return;

    const column = board.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);

    const newTasks = { ...board.tasks };
    delete newTasks[taskId];

    setBoard({
      ...board,
      tasks: newTasks,
      columns: {
        ...board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds
        }
      }
    });
  };

  const handleSaveTask = (task: Task) => {
    const isNewTask = !board.tasks[task.id];

    const newTasks = {
      ...board.tasks,
      [task.id]: task
    };

    if (isNewTask) {
      const column = board.columns[task.status];
      const newTaskIds = [...column.taskIds, task.id];

      setBoard({
        ...board,
        tasks: newTasks,
        columns: {
          ...board.columns,
          [task.status]: {
            ...column,
            taskIds: newTaskIds
          }
        }
      });
    } else {
      const oldTask = board.tasks[task.id];

      if (oldTask.status !== task.status) {
        const sourceColumn = board.columns[oldTask.status];
        const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== task.id);

        const destColumn = board.columns[task.status];
        const newDestTaskIds = [...destColumn.taskIds, task.id];

        setBoard({
          ...board,
          tasks: newTasks,
          columns: {
            ...board.columns,
            [oldTask.status]: {
              ...sourceColumn,
              taskIds: newSourceTaskIds
            },
            [task.status]: {
              ...destColumn,
              taskIds: newDestTaskIds
            }
          }
        });
      } else {
        setBoard({
          ...board,
          tasks: newTasks
        });
      }
    }

    setIsTaskDialogOpen(false);
  };

  // Znajdź aktywne zadanie dla DragOverlay
  const activeTask = activeId ? board.tasks[activeId] : null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Menedżer zadań
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
        >
          Dodaj zadanie
        </Button>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          borderRadius: 2
        }}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 2
            }}
          >
            {board.columnOrder.map(columnId => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map(taskId => board.tasks[taskId]);

              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              );
            })}
          </Box>

          <DragOverlay>
            {activeTask ? (
              <TaskCard
                task={activeTask}
                onEdit={() => { }}
                onDelete={() => { }}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Paper>

      <TaskDialog
        open={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        task={currentTask}
        onSave={handleSaveTask}
      />
    </Container>
  );
};

export default TaskManager;