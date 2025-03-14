import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ComponentHighlight from './ComponentHighlight';
import ComponentDetailsPanel from './ComponentDetailsPanel';
import ControlPanel from './ControlPanel';
import { patchReactInternals, restoreReactInternals } from './utils/reactInternals';
import { findReactComponentFromDOMNode } from './utils/componentFinder';
import { setupPerformanceObserver } from './utils/metricsCollector';

interface ComponentData {
  [componentId: string]: {
    name: string;
    renderCount: number;
    lastRenderDuration: number;
    averageRenderDuration: number;
    props: Record<string, any>;
    domNode?: Element;
  };
}

const ComponentAnalyzer: React.FC = () => {
  const [componentData, setComponentData] = useState<ComponentData>({});
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isInspectionModeActive, setIsInspectionModeActive] = useState(false);
  
  useEffect(() => {
    console.log('Component Analyzer activated');
    
    // 1. Patch React internals to track components
    const originalMethods = patchReactInternals((id, data) => {
      setComponentData(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          ...data,
          renderCount: (prev[id]?.renderCount || 0) + 1
        }
      }));
    });
    
    // 2. Setup performance observer
    const perfObserver = setupPerformanceObserver((entries) => {
      // Process performance entries
      entries.forEach(entry => {
        if (entry.entryType === 'measure' && entry.name.startsWith('React-render-')) {
          const componentId = entry.name.replace('React-render-', '');
          setComponentData(prev => ({
            ...prev,
            [componentId]: {
              ...prev[componentId],
              lastRenderDuration: entry.duration,
              averageRenderDuration: prev[componentId] 
                ? (prev[componentId].averageRenderDuration * prev[componentId].renderCount + entry.duration) / (prev[componentId].renderCount + 1)
                : entry.duration
            }
          }));
        }
      });
    });
    
    // 3. Setup click handler for inspection mode
    const handleClick = (e: MouseEvent) => {
      if (!isInspectionModeActive) return;
      
      const component = findReactComponentFromDOMNode(e.target as Element);
      if (component) {
        setSelectedComponentId(component.id);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener('click', handleClick, true);
    
    // Cleanup
    return () => {
      console.log('Component Analyzer deactivated');
      restoreReactInternals(originalMethods);
      perfObserver.disconnect();
      document.removeEventListener('click', handleClick, true);
    };
  }, [isInspectionModeActive]);
  
  // Render analyzer overlay using portal
  return createPortal(
    <div className="component-analyzer-container" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}>
      <ControlPanel 
        isInspectionModeActive={isInspectionModeActive}
        onToggleInspectionMode={() => setIsInspectionModeActive(!isInspectionModeActive)}
      />
      
      {/* Highlight all tracked components */}
      {Object.entries(componentData).map(([id, data]) => (
        <ComponentHighlight 
          key={id} 
          componentId={id} 
          metrics={data} 
          isSelected={id === selectedComponentId}
          onClick={() => setSelectedComponentId(id)}
        />
      ))}
      
      {/* Show details panel for selected component */}
      {selectedComponentId && componentData[selectedComponentId] && (
        <ComponentDetailsPanel 
          componentId={selectedComponentId}
          data={componentData[selectedComponentId]}
          onClose={() => setSelectedComponentId(null)}
        />
      )}
    </div>,
    document.body
  );
};

export default ComponentAnalyzer;