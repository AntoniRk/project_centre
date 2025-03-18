export interface KeyframeProperty {
    property: string;
    value: string;
  }
  
  export interface Keyframe {
    id: string;
    position: number; // Pozycja w procentach (0-100)
    properties: KeyframeProperty[];
  }
  
  export interface Animation {
    id: string;
    name: string;
    duration: number; // w sekundach
    timingFunction: string;
    iterationCount: string;
    direction: string;
    fillMode: string;
    keyframes: Keyframe[];
  }
  
  export interface AnimationPreset {
    id: string;
    name: string;
    description: string;
    animation: Animation;
  }
  
  export type TimingFunction = 
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'cubic-bezier';
  
  export type AnimationDirection = 
    | 'normal'
    | 'reverse'
    | 'alternate'
    | 'alternate-reverse';
  
  export type AnimationFillMode = 
    | 'none'
    | 'forwards'
    | 'backwards'
    | 'both';