export const overlayStyles = {
    container: {
      position: 'fixed',
      zIndex: 9999,
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    } as React.CSSProperties,
    
    controlPanel: {
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
    } as React.CSSProperties,
    
    button: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px'
    } as React.CSSProperties,
    
    buttonActive: {
      backgroundColor: '#f44336',
    } as React.CSSProperties,
  };
  
  export const highlightStyles = {
    component: (color: string, isSelected: boolean) => ({
      position: 'absolute',
      border: `2px solid ${color}`,
      backgroundColor: `${color}20`, // Semi-transparent
      pointerEvents: 'auto',
      zIndex: isSelected ? 10001 : 10000,
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-in-out'
    } as React.CSSProperties),
    
    label: (color: string) => ({
      position: 'absolute',
      top: '-20px',
      left: '0',
      backgroundColor: color,
      color: 'white',
      padding: '2px 6px',
      fontSize: '10px',
      borderRadius: '2px',
      whiteSpace: 'nowrap'
    } as React.CSSProperties),
  };
  
  export const detailsPanelStyles = {
    container: {
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
    } as React.CSSProperties,
    
    header: {
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '10px'
    } as React.CSSProperties,
    
    title: {
      margin: 0, 
      fontSize: '16px'
    } as React.CSSProperties,
    
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    } as React.CSSProperties,
    
    pre: {
      backgroundColor: '#f5f5f5', 
      padding: '10px', 
      borderRadius: '4px',
      fontSize: '12px',
      overflow: 'auto',
      maxHeight: '200px'
    } as React.CSSProperties,
  };