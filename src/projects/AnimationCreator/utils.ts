import { Animation, Keyframe, KeyframeProperty } from './types';

// Generowanie unikalnych ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Generowanie kodu CSS dla animacji
export const generateCssCode = (animation: Animation): string => {
  // Generowanie klatek kluczowych
  const keyframesCode = `@keyframes ${animation.name} {
${animation.keyframes
  .sort((a, b) => a.position - b.position)
  .map(keyframe => 
    `  ${keyframe.position}% {
${keyframe.properties.map(prop => `    ${prop.property}: ${prop.value};`).join('\n')}
  }`
  ).join('\n')}
}`;

  // Generowanie właściwości animacji
  const animationCode = `.${animation.name} {
  animation-name: ${animation.name};
  animation-duration: ${animation.duration}s;
  animation-timing-function: ${animation.timingFunction};
  animation-iteration-count: ${animation.iterationCount};
  animation-direction: ${animation.direction};
  animation-fill-mode: ${animation.fillMode};
}`;

  return `${keyframesCode}\n\n${animationCode}`;
};

// Funkcja tworząca nową animację
export const createNewAnimation = (): Animation => {
  return {
    id: generateId(),
    name: 'myAnimation',
    duration: 1,
    timingFunction: 'ease',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'none',
    keyframes: [
      {
        id: generateId(),
        position: 0,
        properties: [
          { property: 'opacity', value: '1' },
          { property: 'transform', value: 'none' }
        ]
      },
      {
        id: generateId(),
        position: 100,
        properties: [
          { property: 'opacity', value: '1' },
          { property: 'transform', value: 'none' }
        ]
      }
    ]
  };
};

// Funkcja tworząca nową klatkę kluczową
export const createNewKeyframe = (position: number): Keyframe => {
  return {
    id: generateId(),
    position,
    properties: [
      { property: 'opacity', value: '1' }
    ]
  };
};

// Funkcja tworząca nową właściwość
export const createNewProperty = (): KeyframeProperty => {
  return {
    property: 'transform',
    value: 'translateX(0)'
  };
};

// Zapisywanie animacji do localStorage
export const saveAnimation = (animation: Animation): void => {
  const savedAnimations = getSavedAnimations();
  
  // Sprawdź, czy animacja o takiej nazwie już istnieje i zaktualizuj ją
  const existingIndex = savedAnimations.findIndex(a => a.name === animation.name);
  
  if (existingIndex >= 0) {
    savedAnimations[existingIndex] = animation;
  } else {
    savedAnimations.push(animation);
  }
  
  localStorage.setItem('savedAnimations', JSON.stringify(savedAnimations));
};

// Pobieranie zapisanych animacji z localStorage
export const getSavedAnimations = (): Animation[] => {
  const savedAnimationsJson = localStorage.getItem('savedAnimations');
  return savedAnimationsJson ? JSON.parse(savedAnimationsJson) : [];
};

// Eksport animacji do CssStyleExplorer
export const exportToCssExplorer = (cssCode: string): void => {
  localStorage.setItem('cssExplorerAnimation', cssCode);
};

// Dostępne właściwości CSS do animacji
export const animatableProperties = [
  'opacity',
  'transform',
  'background-color',
  'color',
  'width',
  'height',
  'margin',
  'padding',
  'border-radius',
  'box-shadow',
  'text-shadow',
  'filter',
  'letter-spacing',
  'word-spacing',
  'line-height',
  'top',
  'left',
  'right',
  'bottom'
];

// Dostępne funkcje transformacji
export const transformFunctions = [
  'translateX()',
  'translateY()',
  'translateZ()',
  'translate()',
  'rotate()',
  'rotateX()',
  'rotateY()',
  'rotateZ()',
  'scale()',
  'scaleX()',
  'scaleY()',
  'skew()',
  'skewX()',
  'skewY()'
];