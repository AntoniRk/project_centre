import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Fab, Tooltip } from '@mui/material';
import { BugReport as BugReportIcon } from '@mui/icons-material';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Lobby from './pages/Lobby';
import About from './pages/About';
import ProjectDetails from './pages/ProjectDetails';
import TodoApp from './projects/TodoApp';
import TaskManager from './projects/TaskManager/TaskManager';
import './App.css';
import ComponentAnalyzer from './projects/ComponentAnalyzer';
import CssStyleExplorer from './projects/CssStyleExplorer/CssStyleExplorer';

const App: React.FC = () => {
  const [analyzerActive, setAnalyzerActive] = useState(false);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/about" element={<About />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/projects/todo" element={<TodoApp />} />
          <Route path="/projects/task-manager" element={<TaskManager />} />
          <Route path="/projects/css-style-explorer" element={<CssStyleExplorer />} />
          <Route path="/projects/component-analyzer" element={
            <div style={{ padding: '20px' }}>
              <h1>Inspektor elementów</h1>
              <p>Aktywuj, aby odkryć tajemnice React (na własną odpowiedzialność). <br></br>
                Tryb inspekcji tylko dla odważnych.
              </p>
              <button
                onClick={() => setAnalyzerActive(!analyzerActive)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: analyzerActive ? '#f44336' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {analyzerActive ? 'Deaktywuj Analizator' : 'Aktywuj Analizator'}
              </button>
            </div>
          } />
        </Routes>

        {analyzerActive && <ComponentAnalyzer />}

        {analyzerActive && (
          <Tooltip title="Wyłącz analizator komponentów">
            <Fab
              color="secondary"
              size="medium"
              style={{
                position: 'fixed',
                bottom: 20,
                left: 20,
                zIndex: 10000
              }}
              onClick={() => setAnalyzerActive(false)}
            >
              <BugReportIcon />
            </Fab>
          </Tooltip>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;