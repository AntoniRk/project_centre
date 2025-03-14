import React from 'react';

interface ComponentDetailsPanelProps {
  componentId: string;
  data: {
    name: string;
    renderCount: number;
    lastRenderDuration: number;
    averageRenderDuration: number;
    props: Record<string, any>;
  };
  onClose: () => void;
}

const ComponentDetailsPanel: React.FC<ComponentDetailsPanelProps> = ({ 
  componentId, 
  data, 
  onClose 
}) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      maxHeight: '400px',
      overflowY: 'auto',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 10002,
      pointerEvents: 'auto',
      padding: '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>{data.name}</h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>ID:</strong> {componentId}
        </div>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>Liczba renderowań:</strong> {data.renderCount}
        </div>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>Ostatni czas renderowania:</strong> {data.lastRenderDuration.toFixed(2)}ms
        </div>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          <strong>Średni czas renderowania:</strong> {data.averageRenderDuration.toFixed(2)}ms
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Props:</h4>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto',
          maxHeight: '200px'
        }}>
          {JSON.stringify(data.props, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Optymalizacja:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
          {data.renderCount > 3 && data.averageRenderDuration > 10 && (
            <li>Rozważ użycie React.memo dla tego komponentu</li>
          )}
          {data.lastRenderDuration > 20 && (
            <li>Ten komponent renderuje się wolno - sprawdź, czy można zoptymalizować jego logikę</li>
          )}
          <li>Sprawdź, czy wszystkie przekazywane props są niezbędne</li>
        </ul>
      </div>
    </div>
  );
};

export default ComponentDetailsPanel;