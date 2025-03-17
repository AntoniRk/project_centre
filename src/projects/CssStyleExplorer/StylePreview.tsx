import React from 'react';
import { useTheme } from '@mui/material';

interface StylePreviewProps {
  styles: Record<string, string>;
  content: string;
}

const StylePreview: React.FC<StylePreviewProps> = ({ styles, content }) => {
  const theme = useTheme();
  
  // Podstawowe style z uwzględnieniem trybu ciemnego
  const baseStyles = {
    padding: '20px',
    minWidth: '100px',
    minHeight: '50px',
    // Dynamiczny kolor tła w zależności od trybu
    backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#f0f0f0',
    // Dynamiczny kolor tekstu w zależności od trybu
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: theme.palette.mode === 'dark' ? '1px solid #777' : '1px solid #ddd',
    ...styles
  };
  
  return (
    <div 
      className="css-explorer-preview-element"
      style={baseStyles as React.CSSProperties}
    >
      {content}
    </div>
  );
};

export default StylePreview;