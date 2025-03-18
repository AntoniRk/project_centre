import { AnimationPreset } from './types';
import { generateId } from './utils';

export const presetAnimations: AnimationPreset[] = [
  {
    id: 'fade-in',
    name: 'Pojawianie',
    description: 'Animacja stopniowego pojawiania się elementu',
    animation: {
      id: generateId(),
      name: 'fadeIn',
      duration: 1,
      timingFunction: 'ease',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'opacity', value: '0' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'opacity', value: '1' }
          ]
        }
      ]
    }
  },
  {
    id: 'bounce',
    name: 'Odbijanie',
    description: 'Animacja odbijania się elementu',
    animation: {
      id: generateId(),
      name: 'bounce',
      duration: 1.5,
      timingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      iterationCount: 'infinite',
      direction: 'alternate',
      fillMode: 'both',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'translateY(0)' }
          ]
        },
        {
          id: generateId(),
          position: 50,
          properties: [
            { property: 'transform', value: 'translateY(-30px)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'translateY(0)' }
          ]
        }
      ]
    }
  },
  {
    id: 'rotate',
    name: 'Obracanie',
    description: 'Animacja obracania elementu',
    animation: {
      id: generateId(),
      name: 'rotate',
      duration: 2,
      timingFunction: 'linear',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'none',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'rotate(0deg)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'rotate(360deg)' }
          ]
        }
      ]
    }
  },
  {
    id: 'pulse',
    name: 'Pulsowanie',
    description: 'Animacja pulsowania elementu',
    animation: {
      id: generateId(),
      name: 'pulse',
      duration: 1,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'none',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'scale(1)' }
          ]
        },
        {
          id: generateId(),
          position: 50,
          properties: [
            { property: 'transform', value: 'scale(1.1)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'scale(1)' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide-in',
    name: 'Wjeżdżanie z lewej',
    description: 'Animacja wjeżdżania elementu z lewej strony',
    animation: {
      id: generateId(),
      name: 'slideIn',
      duration: 1,
      timingFunction: 'ease-out',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'translateX(-100%)' },
            { property: 'opacity', value: '0' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'translateX(0)' },
            { property: 'opacity', value: '1' }
          ]
        }
      ]
    }
  },
  {
    id: 'fade-out',
    name: 'Zanikanie',
    description: 'Animacja stopniowego znikania elementu',
    animation: {
      id: generateId(),
      name: 'fadeOut',
      duration: 1,
      timingFunction: 'ease',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'opacity', value: '1' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'opacity', value: '0' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide-in-top',
    name: 'Wjeżdżanie z góry',
    description: 'Animacja wjeżdżania elementu z góry',
    animation: {
      id: generateId(),
      name: 'slideInTop',
      duration: 1,
      timingFunction: 'ease-out',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'translateY(-100%)' },
            { property: 'opacity', value: '0' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'translateY(0)' },
            { property: 'opacity', value: '1' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide-in-right',
    name: 'Wjeżdżanie z prawej',
    description: 'Animacja wjeżdżania elementu z prawej strony',
    animation: {
      id: generateId(),
      name: 'slideInRight',
      duration: 1,
      timingFunction: 'ease-out',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'translateX(100%)' },
            { property: 'opacity', value: '0' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'translateX(0)' },
            { property: 'opacity', value: '1' }
          ]
        }
      ]
    }
  },
  {
    id: 'zoom-in',
    name: 'Powiększanie',
    description: 'Animacja powiększania elementu',
    animation: {
      id: generateId(),
      name: 'zoomIn',
      duration: 0.8,
      timingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'scale(0)' },
            { property: 'opacity', value: '0' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'scale(1)' },
            { property: 'opacity', value: '1' }
          ]
        }
      ]
    }
  },
  {
    id: 'swing',
    name: 'Huśtanie',
    description: 'Animacja huśtania elementu',
    animation: {
      id: generateId(),
      name: 'swing',
      duration: 1.5,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      fillMode: 'none',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'rotate(15deg)' }
          ]
        },
        {
          id: generateId(),
          position: 50,
          properties: [
            { property: 'transform', value: 'rotate(-15deg)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'rotate(15deg)' }
          ]
        }
      ]
    }
  },
  {
    id: 'floating',
    name: 'Unoszenie',
    description: 'Animacja unoszącego się elementu',
    animation: {
      id: generateId(),
      name: 'floating',
      duration: 3,
      timingFunction: 'ease-in-out',
      iterationCount: 'infinite',
      direction: 'alternate',
      fillMode: 'none',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'transform', value: 'translateY(0px)' }
          ]
        },
        {
          id: generateId(),
          position: 50,
          properties: [
            { property: 'transform', value: 'translateY(-15px)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'transform', value: 'translateY(0px)' }
          ]
        }
      ]
    }
  },
  {
    id: 'highlight',
    name: 'Podświetlenie',
    description: 'Animacja podświetlenia elementu',
    animation: {
      id: generateId(),
      name: 'highlight',
      duration: 2,
      timingFunction: 'ease',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      keyframes: [
        {
          id: generateId(),
          position: 0,
          properties: [
            { property: 'background-color', value: 'transparent' }
          ]
        },
        {
          id: generateId(),
          position: 30,
          properties: [
            { property: 'background-color', value: 'rgba(255, 255, 0, 0.4)' }
          ]
        },
        {
          id: generateId(),
          position: 100,
          properties: [
            { property: 'background-color', value: 'transparent' }
          ]
        }
      ]
    }
  }
];