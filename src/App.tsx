// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Lobby from './pages/Lobby';
import ProjectDetails from './pages/ProjectDetails';
import TodoApp from './projects/TodoApp';
import TaskManager from './projects/TaskManager/TaskManager';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline /> {/* Reset CSS dla spójnego wyglądu */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/projects/todo" element={<TodoApp />} />
          <Route path="/projects/task-manager" element={<TaskManager />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;