import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Animation } from './types';

interface AnimationPreviewProps {
  animation: Animation;
  elementContent: string;
  elementType: string;
  isPlaying: boolean;
  resetKey: number;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({ 
  animation, 
  elementContent, 
  elementType,
  isPlaying,
  resetKey
}) => {
  const theme = useTheme();
  const previewRef = useRef<HTMLDivElement>(null);
  const styleSheetRef = useRef<HTMLStyleElement | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Funkcja do faktycznego resetowania animacji
  const resetAnimation = useCallback(() => {
    if (previewRef.current) {
      // 1. Zapisz referencję do elementu
      const element = previewRef.current;
      
      // 2. Usuń wszystkie właściwości animacji
      element.style.animation = 'none';
      
      // 3. Wymuś reflow - to kluczowe dla faktycznego resetowania stanu renderowania
      void element.offsetWidth;
      
      // 4. Zastosuj początkowe style z pierwszej klatki kluczowej
      const firstKeyframe = animation.keyframes.find(kf => kf.position === 0);
      if (firstKeyframe) {
        firstKeyframe.properties.forEach(prop => {
          if (prop.property === 'transform') {
            element.style.transform = prop.value;
          } else if (prop.property === 'opacity') {
            element.style.opacity = prop.value;
          } else {
            try {
              // Próba ustawienia właściwości CSS jako string
              const cssProperty = prop.property.replace(/([A-Z])/g, '-$1').toLowerCase();
              element.style.setProperty(cssProperty, prop.value);
            } catch (e) {
              console.error('Nie można ustawić właściwości:', prop.property);
            }
          }
        });
      }
      
      // 5. Krótkie opóźnienie przed ponownym zastosowaniem animacji
      setTimeout(() => {
        // 6. Przywróć animację
        const animationString = `${animation.name} ${animation.duration}s ${animation.timingFunction} ${animation.iterationCount} ${animation.direction} ${animation.fillMode}`;
        element.style.animation = animationString;
        element.style.animationPlayState = isPlaying ? 'running' : 'paused';
      }, 50);
    }
  }, [animation, isPlaying]);

  // Efekt wykrywający resetowanie
  useEffect(() => {
    if (resetKey > 0) {
      setIsResetting(true);
      
      // Wywołaj faktyczne resetowanie animacji
      resetAnimation();
      
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [resetKey, resetAnimation]);

  // Główny efekt do zarządzania animacją
  useEffect(() => {
    // Tworzenie stylu animacji
    if (!styleSheetRef.current) {
      styleSheetRef.current = document.createElement('style');
      document.head.appendChild(styleSheetRef.current);
    }

    // Generowanie kodu CSS dla animacji
    const keyframesCode = `@keyframes ${animation.name} {
${animation.keyframes
  .sort((a, b) => a.position - b.position)
  .map(keyframe => 
    `  ${keyframe.position}% {
${keyframe.properties.map(prop => `    ${prop.property}: ${prop.value};`).join('\n')}
  }`
  ).join('\n')}
}`;

    styleSheetRef.current.textContent = keyframesCode;

    // Zastosowanie animacji do elementu podglądu
    if (previewRef.current) {
      // Zawsze stosuj podstawowe właściwości animacji (jeśli nie jest w trakcie resetowania)
      if (!isResetting) {
        const baseAnimationStyle: React.CSSProperties = {
          animationName: animation.name,
          animationDuration: `${animation.duration}s`,
          animationTimingFunction: animation.timingFunction,
          animationIterationCount: animation.iterationCount,
          animationDirection: animation.direction as any,
          animationFillMode: animation.fillMode as any,
          // Dodajemy stan odtwarzania
          animationPlayState: isPlaying ? 'running' : 'paused'
        };
        
        Object.assign(previewRef.current.style, baseAnimationStyle);
      }
    }

    // Czyszczenie przy odmontowywaniu
    return () => {
      if (styleSheetRef.current) {
        document.head.removeChild(styleSheetRef.current);
        styleSheetRef.current = null;
      }
    };
  }, [animation, isPlaying, isResetting]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '300px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            opacity: 0.7 
          }}
        >
          {isResetting 
            ? 'Resetowanie pozycji...' 
            : isPlaying 
              ? 'Animacja aktywna' 
              : 'Animacja wstrzymana'}
        </Typography>
        
        <Box 
          sx={{ 
            transition: 'all 0.3s ease',
            filter: isResetting ? 'blur(2px)' : 'none',
            opacity: isResetting ? 0.7 : 1
          }}
        >
          <div
            ref={previewRef}
            style={{
              padding: '20px',
              backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#fff',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ddd'}`,
              borderRadius: '4px',
              display: 'inline-block',
              transform: 'translate(0)',
            }}
          >
            {elementType === 'text' ? (
              <Typography variant="h6">{elementContent}</Typography>
            ) : elementType === 'box' ? (
              <Box 
                sx={{ 
                  width: '100px', 
                  height: '100px', 
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff'
                }}
              >
                {elementContent}
              </Box>
            ) : (
              <Box 
                component="img" 
                src="https://via.placeholder.com/100" 
                alt="Element animacji"
                sx={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            )}
          </div>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnimationPreview;