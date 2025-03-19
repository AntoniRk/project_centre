import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

// Import biblioteki MathJax w komponencie
declare global {
  interface Window {
    MathJax: any;
  }
}

interface MathDisplayProps {
  expression: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ expression }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Funkcja do renderowania wyrażenia matematycznego
    const renderMath = () => {
      if (window.MathJax && containerRef.current) {
        containerRef.current.innerHTML = `\\[${expression}\\]`;
        window.MathJax.typeset([containerRef.current]);
      }
    };

    // Załaduj MathJax jeśli jeszcze nie jest załadowany
    if (!window.MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        renderMath(); // Wywołaj renderMath po załadowaniu skryptu
      };
    } else {
      renderMath(); // Wywołaj renderMath jeśli MathJax jest już załadowany
    }
  }, [expression]); // Zależność od expression

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        fontSize: '1.2rem', 
        py: 2,
        overflowX: 'auto'
      }}
    >
      {/* MathJax zrenderuje tutaj wyrażenie */}
    </Box>
  );
};

export default MathDisplay;