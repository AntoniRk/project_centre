import React from 'react';
import { IconButton, IconButtonProps, Tooltip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  transition: 'background-color 0.3s',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'dark' 
      ? 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)' 
      : 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(0,0,0,0) 70%)',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
  
  '& svg': {
    transition: 'transform 0.3s ease-in-out',
  },
  
  '&:hover svg': {
    transform: 'rotate(30deg)',
  }
}));

// Rozszerzamy właściwości IconButton, ale pomijamy children, które zdefiniujemy sami
type ThemeToggleProps = Omit<IconButtonProps, 'children'>;

const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const { toggleColorMode } = useThemeContext();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Łączymy przekazane właściwości z naszymi domyślnymi
  const iconButtonProps = {
    ...props,
    onClick: props.onClick || toggleColorMode,
    'aria-label': isDarkMode ? "light mode" : "dark mode"
  };
  
  return (
    <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
      <StyledIconButton {...iconButtonProps}>
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ThemeToggle;