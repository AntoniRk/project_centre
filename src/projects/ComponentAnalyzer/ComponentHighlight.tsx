import React, { useEffect, useState } from 'react';
import { findDOMNodeByComponentId } from './utils/componentFinder';

interface ComponentHighlightProps {
  componentId: string;
  metrics: {
    name: string;
    renderCount: number;
    lastRenderDuration: number;
    averageRenderDuration: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

const ComponentHighlight: React.FC<ComponentHighlightProps> = ({ 
  componentId, 
  metrics, 
  isSelected,
  onClick
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Find DOM node and update position
    const updatePosition = () => {
      const domNode = findDOMNodeByComponentId(componentId);
      if (domNode) {
        const rect = domNode.getBoundingClientRect();
        setPosition({
          top: window.scrollY + rect.top,
          left: window.scrollX + rect.left,
          width: rect.width,
          height: rect.height
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    updatePosition();
    
    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    // Update position periodically to catch any changes
    const interval = setInterval(updatePosition, 1000);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      clearInterval(interval);
    };
  }, [componentId]);
  
  if (!isVisible) return null;
  
  // Determine color based on render duration
  const getHighlightColor = () => {
    const duration = metrics.lastRenderDuration;
    if (duration < 5) return '#4caf50'; // Green - fast
    if (duration < 15) return '#ff9800'; // Orange - medium
    return '#f44336'; // Red - slow
  };
  
  const color = getHighlightColor();
  
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
        border: `2px solid ${color}`,
        backgroundColor: `${color}20`, // Semi-transparent
        pointerEvents: 'auto', // Allow interaction
        zIndex: isSelected ? 10001 : 10000,
        boxSizing: 'border-box',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {(isSelected || metrics.lastRenderDuration > 10) && (
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '0',
          backgroundColor: color,
          color: 'white',
          padding: '2px 6px',
          fontSize: '10px',
          borderRadius: '2px',
          whiteSpace: 'nowrap'
        }}>
          {metrics.name} - {metrics.lastRenderDuration.toFixed(2)}ms
        </div>
      )}
    </div>
  );
};

export default ComponentHighlight;