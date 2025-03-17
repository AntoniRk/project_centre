import React from 'react';

interface ControlPanelProps {
  isInspectionModeActive: boolean;
  onToggleInspectionMode: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  isInspectionModeActive, 
  onToggleInspectionMode 
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '60px',
      right: '20px',
      backgroundColor: '#333',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 10002,
      pointerEvents: 'auto'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Inspektor</h3>

      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#4caf50', marginRight: '5px' }}></div>
          <span>Szybkie renderowanie (&lt; 5ms)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#ff9800', marginRight: '5px' }}></div>
          <span>Średnie renderowanie (5-15ms)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#f44336', marginRight: '5px' }}></div>
          <span>Wolne renderowanie (&gt; 15ms)</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;