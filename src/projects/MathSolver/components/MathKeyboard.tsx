import React, { useState } from 'react';
import { 
  Grid, 
  Button, 
  Paper, 
  Box, 
  Typography, 
  Divider, 
  Tabs, 
  Tab, 
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Backspace as BackspaceIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

interface MathKeyboardProps {
  onButtonClick: (value: string) => void;
}

const MathKeyboard: React.FC<MathKeyboardProps> = ({ onButtonClick }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Kategorie przycisków klawiatury matematycznej
  const keyboardCategories = [
    {
      name: 'Podstawowe',
      buttons: [
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '(', value: '(' },
        { label: ')', value: ')' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '+', value: '+' },
        { label: '−', value: '-' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '×', value: '*' },
        { label: '÷', value: '/' },
        { label: '0', value: '0' },
        { label: '.', value: '.' },
        { label: 'π', value: 'pi' },
        { label: 'e', value: 'e' },
        { label: '=', value: '=' },
      ]
    },
    {
      name: 'Funkcje',
      buttons: [
        { label: 'sin', value: 'sin(' },
        { label: 'cos', value: 'cos(' },
        { label: 'tan', value: 'tan(' },
        { label: 'asin', value: 'asin(' },
        { label: 'acos', value: 'acos(' },
        { label: 'atan', value: 'atan(' },
        { label: 'ln', value: 'ln(' },
        { label: 'log', value: 'log(' },
        { label: 'exp', value: 'exp(' },
        { label: 'abs', value: 'abs(' },
        { label: 'sinh', value: 'sinh(' },
        { label: 'cosh', value: 'cosh(' },
        { label: 'tanh', value: 'tanh(' },
        { label: 'floor', value: 'floor(' },
        { label: 'ceil', value: 'ceil(' },
      ]
    },
    {
      name: 'Algebra',
      buttons: [
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
        { label: 'z', value: 'z' },
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
        { label: 'x²', value: 'x^2' },
        { label: 'x³', value: 'x^3' },
        { label: 'x^n', value: 'x^' },
        { label: '√', value: 'sqrt(' },
        { label: '∛', value: 'cbrt(' },
        { label: '∞', value: 'inf' },
        { label: 'i', value: 'i' },
        { label: 'x!', value: 'factorial(' },
        { label: 'nPr', value: 'permutations(' },
        { label: 'nCr', value: 'combinations(' },
      ]
    },
    {
      name: 'Zaawansowane',
      buttons: [
        { label: '∫', value: 'integrate(' },
        { label: '∂/∂x', value: 'derivative(' },
        { label: 'lim', value: 'limit(' },
        { label: 'Σ', value: 'sum(' },
        { label: '∏', value: 'product(' },
        { label: '|x|', value: 'abs(' },
        { label: '⌊x⌋', value: 'floor(' },
        { label: '⌈x⌉', value: 'ceil(' },
        { label: 'det', value: 'det(' },
        { label: 'gcd', value: 'gcd(' },
        { label: 'lcm', value: 'lcm(' },
        { label: 'mod', value: 'mod(' },
        { label: '≤', value: '<=' },
        { label: '≥', value: '>=' },
        { label: '≠', value: '!=' },
      ]
    }
  ];

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Klawiatura matematyczna
        </Typography>
        <Box>
          <Tooltip title="Backspace">
            <IconButton onClick={() => onButtonClick('\b')} size="small">
              <BackspaceIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Wyczyść wszystko">
            <IconButton onClick={() => onButtonClick('\c')} size="small" color="error">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        sx={{ mb: 2 }}
      >
        {keyboardCategories.map((category, index) => (
          <Tab key={index} label={category.name} />
        ))}
      </Tabs>
      
      {keyboardCategories.map((category, categoryIndex) => (
        <Box 
          key={categoryIndex} 
          sx={{ 
            display: tabValue === categoryIndex ? 'block' : 'none'
          }}
        >
          <Grid container spacing={1}>
            {category.buttons.map((button, buttonIndex) => (
              <Grid item key={buttonIndex} xs={2} sm={button.label.length > 2 ? 3 : 2} md={button.label.length > 3 ? 3 : 2}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => onButtonClick(button.value)}
                  sx={{ 
                    minWidth: 0,
                    fontFamily: button.label.length <= 2 ? 'inherit' : 'monospace',
                    fontSize: button.label.length <= 2 ? '1rem' : '0.875rem'
                  }}
                >
                  {button.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="body2" color="text.secondary">
        Kliknij na przycisk, aby dodać symbol do wyrażenia. Użyj backspace, aby usunąć ostatni znak.
      </Typography>
    </Paper>
  );
};

export default MathKeyboard;