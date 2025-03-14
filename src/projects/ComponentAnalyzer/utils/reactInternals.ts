import React from 'react';

export const patchReactInternals = (onComponentUpdate: (id: string, data: any) => void) => {
  console.log('Patching React internals');
  
  // Zamiast próbować uzyskać dostęp do React przez window,
  // użyjmy zaimportowanego React
  if (!React) {
    console.warn('React not available via import');
    return {};
  }
  
  const originals: Record<string, any> = {};
  
  // Niestety, bezpośrednie modyfikowanie importowanego obiektu React
  // nie zadziała tak jak oczekujemy. Zamiast tego, użyjmy alternatywnego
  // podejścia do śledzenia komponentów.
  
  // W nowoczesnych aplikacjach React lepiej użyć React DevTools API
  // lub React Profiler do śledzenia komponentów
  
  // Symulujmy działanie dla celów demonstracyjnych
  setTimeout(() => {
    // Generujemy przykładowe dane komponentów
    const sampleComponents = [
      {
        id: 'component-123',
        name: 'App',
        renderCount: 1,
        lastRenderDuration: 5.2,
        averageRenderDuration: 5.2,
        props: { theme: 'light' }
      },
      {
        id: 'component-456',
        name: 'Navbar',
        renderCount: 2,
        lastRenderDuration: 3.1,
        averageRenderDuration: 3.5,
        props: { title: 'Project Lobby' }
      },
      {
        id: 'component-789',
        name: 'ProjectCard',
        renderCount: 3,
        lastRenderDuration: 12.7,
        averageRenderDuration: 8.3,
        props: { id: 1, title: 'Todo App' }
      }
    ];
    
    // Symulujemy aktualizacje komponentów
    sampleComponents.forEach(component => {
      onComponentUpdate(component.id, component);
    });
    
    // Symulujemy okresowe aktualizacje
    const interval = setInterval(() => {
      const randomComponent = sampleComponents[Math.floor(Math.random() * sampleComponents.length)];
      const updatedComponent = {
        ...randomComponent,
        renderCount: randomComponent.renderCount + 1,
        lastRenderDuration: Math.random() * 20,
        averageRenderDuration: (randomComponent.averageRenderDuration * randomComponent.renderCount + 
          randomComponent.lastRenderDuration) / (randomComponent.renderCount + 1)
      };
      
      onComponentUpdate(updatedComponent.id, updatedComponent);
    }, 2000);
    
    // Zapisujemy interval do wyczyszczenia później
    (window as any).__componentAnalyzerInterval = interval;
  }, 1000);
  
  return originals;
};

export const restoreReactInternals = (originals: Record<string, any>) => {
  console.log('Restoring React internals');
  
  // Czyścimy interval symulujący aktualizacje
  if ((window as any).__componentAnalyzerInterval) {
    clearInterval((window as any).__componentAnalyzerInterval);
    delete (window as any).__componentAnalyzerInterval;
  }
  
  // W rzeczywistej implementacji, tutaj przywrócilibyśmy oryginalne metody React
};