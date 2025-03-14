import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Fab, Tooltip } from '@mui/material';
import { BugReport as BugReportIcon } from '@mui/icons-material';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Lobby from './pages/Lobby';
import ProjectDetails from './pages/ProjectDetails';
import TodoApp from './projects/TodoApp';
import TaskManager from './projects/TaskManager/TaskManager';
import './App.css';
import ComponentAnalyzer from './projects/ComponentAnalyzer';

const App: React.FC = () => {
  const [analyzerActive, setAnalyzerActive] = useState(false);

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
          <Route path="/projects/component-analyzer" element={
            <div style={{ padding: '20px' }}>
              <h1>Component Analyzer</h1>
              <p>Aktywuj analizator, aby monitorować wydajność komponentów React na tej stronie.</p>
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
        
        {/* Nakładka analizatora, aktywowana warunkowo */}
        {analyzerActive && <ComponentAnalyzer />}
        
        {/* Pływający przycisk do szybkiej aktywacji/deaktywacji analizatora */}
        {analyzerActive && (
          <Tooltip title="Wyłącz analizator komponentów">
            <Fab 
              color="secondary" 
              size="medium"
              style={{ 
                position: 'fixed', 
                bottom: 20, 
                right: 20,
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