import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Slider, 
  IconButton, 
  useTheme,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Animation, Keyframe } from './types';
import { generateId } from './utils';

interface AnimationTimelineProps {
  animation: Animation;
  selectedKeyframeId: string | null;
  onSelectKeyframe: (id: string) => void;
  onUpdateAnimation: (animation: Animation) => void;
}

const AnimationTimeline: React.FC<AnimationTimelineProps> = ({ 
  animation, 
  selectedKeyframeId, 
  onSelectKeyframe,
  onUpdateAnimation
}) => {
  const theme = useTheme();

  // Dodanie nowej klatki kluczowej
  const handleAddKeyframe = () => {
    const currentKeyframes = [...animation.keyframes];
    
    // Sortowanie klatek według pozycji
    currentKeyframes.sort((a, b) => a.position - b.position);
    
    // Znajdź najdłuższy interwał między klatkami
    let maxInterval = 0;
    let insertPosition = 50; // Domyślna pozycja, jeśli nie znajdziemy lepszej
    
    for (let i = 0; i < currentKeyframes.length - 1; i++) {
      const interval = currentKeyframes[i + 1].position - currentKeyframes[i].position;
      if (interval > maxInterval) {
        maxInterval = interval;
        // Wstawiamy nową klatkę w środku największego interwału
        insertPosition = currentKeyframes[i].position + interval / 2;
      }
    }
    
    // Stwórz nową klatkę kluczową
    const newKeyframe: Keyframe = {
      id: generateId(),
      position: Math.round(insertPosition), // Zaokrąglamy do pełnych wartości
      properties: [
        { property: 'opacity', value: '1' }
      ]
    };
    
    // Zaktualizuj animację
    const updatedAnimation = {
      ...animation,
      keyframes: [...animation.keyframes, newKeyframe]
    };
    
    onUpdateAnimation(updatedAnimation);
    onSelectKeyframe(newKeyframe.id);
  };

  // Alternatywna metoda: równomierne rozmieszczenie wszystkich klatek kluczowych
  const redistributeKeyframes = () => {
    // Zachowujemy klatki 0% i 100%
    const startKeyframe = animation.keyframes.find(kf => kf.position === 0);
    const endKeyframe = animation.keyframes.find(kf => kf.position === 100);
    
    // Pobieramy środkowe klatki (wszystkie poza 0% i 100%)
    const middleKeyframes = animation.keyframes.filter(kf => kf.position !== 0 && kf.position !== 100);
    
    // Obliczamy nowe pozycje dla środkowych klatek
    const totalKeyframes = middleKeyframes.length + 2; // +2 dla klatek 0% i 100%
    const step = 100 / (totalKeyframes - 1);
    
    // Aktualizujemy pozycje środkowych klatek
    const updatedMiddleKeyframes = middleKeyframes.map((kf, index) => ({
      ...kf,
      position: Math.round(step * (index + 1)) // +1 bo zaczynamy od 1 (po klatce 0%)
    }));
    
    // Składamy wszystkie klatki razem
    const updatedKeyframes = [
      startKeyframe,
      ...updatedMiddleKeyframes,
      endKeyframe
    ].filter(Boolean) as Keyframe[]; // Filtrujemy undefined values
    
    // Aktualizujemy animację
    const updatedAnimation = {
      ...animation,
      keyframes: updatedKeyframes
    };
    
    onUpdateAnimation(updatedAnimation);
  };

  // Usunięcie klatki kluczowej
  const handleDeleteKeyframe = (id: string) => {
    // Nie pozwól usunąć wszystkich klatek kluczowych
    if (animation.keyframes.length <= 2) {
      alert('Animacja musi mieć co najmniej dwie klatki kluczowe (0% i 100%)');
      return;
    }
    
    const updatedKeyframes = animation.keyframes.filter(kf => kf.id !== id);
    const updatedAnimation = {
      ...animation,
      keyframes: updatedKeyframes
    };
    
    onUpdateAnimation(updatedAnimation);
    
    // Jeśli usunięto wybraną klatkę, wybierz pierwszą dostępną
    if (id === selectedKeyframeId && updatedKeyframes.length > 0) {
      onSelectKeyframe(updatedKeyframes[0].id);
    }
  };

  // Zmiana pozycji klatki kluczowej
  const handleKeyframePositionChange = (id: string, newPosition: number) => {
    // Sprawdź, czy pozycja nie jest już zajęta
    if (animation.keyframes.some(kf => kf.id !== id && kf.position === newPosition)) {
      alert(`Pozycja ${newPosition}% jest już zajęta przez inną klatkę kluczową`);
      return;
    }
    
    const updatedKeyframes = animation.keyframes.map(kf => 
      kf.id === id ? { ...kf, position: newPosition } : kf
    );
    
    const updatedAnimation = {
      ...animation,
      keyframes: updatedKeyframes
    };
    
    onUpdateAnimation(updatedAnimation);
  };

  // Sortowanie klatek kluczowych według pozycji
  const sortedKeyframes = [...animation.keyframes].sort((a, b) => a.position - b.position);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
        width: '100%', // Pełna szerokość kontenera
        overflow: 'hidden', // Zapobiega wystającym elementom
        boxSizing: 'border-box' // Uwzględnia padding w szerokości
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Oś czasu animacji</Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />} 
            onClick={handleAddKeyframe}
            size="small"
            sx={{ mr: 1 }}
          >
            Dodaj klatkę
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            onClick={redistributeKeyframes}
          >
            Równe odstępy
          </Button>
        </Box>
      </Box>
      
      {/* Wizualizacja osi czasu */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: '60px', 
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
          borderRadius: '4px',
          my: 2,
          mx: 2, // Dodajemy margines po bokach
          width: 'calc(100% - 16px)' // Kompensujemy margines
        }}
      >
          <Box 
            sx={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              bottom: 0, 
              width: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#bdbdbd',
              zIndex: 1
            }}
          />

        
        {/* Etykiety procentowe */}
        {[0, 25, 50, 75, 100].map(percent => (
          <Typography 
            key={percent} 
            variant="caption" 
            sx={{ 
              position: 'absolute', 
              left: `${percent}%`, 
              bottom: -20, 
              transform: 'translateX(-50%)',
              color: theme.palette.text.secondary
            }}
          >
            {percent}%
          </Typography>
        ))}
        
        {/* Klatki kluczowe */}
        {sortedKeyframes.map(keyframe => (
          <Box 
            key={keyframe.id}
            onClick={() => onSelectKeyframe(keyframe.id)}
            sx={{ 
              position: 'absolute', 
              left: `${keyframe.position}%`, 
              top: '50%', 
              transform: 'translate(-50%, -50%)',
              width: 20, 
              height: 20, 
              borderRadius: '50%', 
              backgroundColor: keyframe.id === selectedKeyframeId 
                ? theme.palette.secondary.main 
                : theme.palette.primary.main,
              border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
              cursor: 'pointer',
              zIndex: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.2)',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)'
              }
            }}
          />
        ))}
      </Box>
      
      {/* Lista klatek kluczowych */}
      <Typography variant="subtitle2" gutterBottom>
        Klatki kluczowe:
      </Typography>
      
      <Box sx={{ maxHeight: '200px', overflow: 'auto' }}>
        {sortedKeyframes.map(keyframe => (
          <Box 
            key={keyframe.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              p: 1,
              mb: 1,
              borderRadius: '4px',
              backgroundColor: keyframe.id === selectedKeyframeId 
                ? theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
              }
            }}
          >
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.primary.main,
                mr: 1
              }}
            />
            
            <Typography 
              variant="body2" 
              sx={{ 
                cursor: 'pointer',
                fontWeight: keyframe.id === selectedKeyframeId ? 'bold' : 'normal'
              }}
              onClick={() => onSelectKeyframe(keyframe.id)}
            >
              {keyframe.position}%
            </Typography>
            
            <Box sx={{ ml: 2, flexGrow: 1, maxWidth: 200 }}>
              <Slider
                value={keyframe.position}
                min={0}
                max={100}
                step={1}
                onChange={(_, value) => handleKeyframePositionChange(keyframe.id, value as number)}
                size="small"
                valueLabelDisplay="auto"
                disabled={keyframe.position === 0 || keyframe.position === 100}
              />
            </Box>
            
            <IconButton 
              size="small" 
              onClick={() => handleDeleteKeyframe(keyframe.id)}
              disabled={keyframe.position === 0 || keyframe.position === 100}
              sx={{ ml: 1 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AnimationTimeline;