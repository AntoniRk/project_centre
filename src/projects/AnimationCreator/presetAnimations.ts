import { AnimationPreset } from './types';
import { generateId } from './utils';

export const presetAnimations: AnimationPreset[] = [
  {
    id: 'fade-in',
    name: 'Zanikanie',
    description: 'Prosta animacja stopniowego pojawiania się elementu',
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
    name: 'Wjeżdżanie',
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
  }
];