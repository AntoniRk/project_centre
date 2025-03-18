import React, { useState } from 'react';
import { 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Tooltip,
  Collapse
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';
import MathDisplay from './MathDisplay';
import { SolutionStep } from '../types';

interface SolutionStepsProps {
  steps: SolutionStep[];
}

const SolutionSteps: React.FC<SolutionStepsProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {expanded ? 'Rozwiązanie szczegółowe' : 'Rozwiązanie skrócone'}
        </Typography>
        <Tooltip title={expanded ? "Zwiń szczegóły" : "Rozwiń szczegóły"}>
          <IconButton onClick={handleExpandToggle}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      
      {!expanded && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="medium">
            Wynik końcowy:
          </Typography>
          <MathDisplay expression={steps[steps.length - 1].expression} />
        </Box>
      )}
      
      <Collapse in={expanded}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} completed={index < activeStep}>
              <StepLabel 
                onClick={() => handleStepClick(index)}
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="subtitle1">{step.title}</Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <MathDisplay expression={step.expression} />
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                    <InfoIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.3 }} />
                    <Typography variant="body2" color="text.secondary">
                      {step.explanation}
                    </Typography>
                  </Box>
                  {step.rule && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1, fontStyle: 'italic' }}>
                      Zastosowana reguła: {step.rule}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Wstecz
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Zakończ' : 'Dalej'}
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Wszystkie kroki rozwiązania zostały wykonane!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Pokaż ponownie
            </Button>
          </Paper>
        )}
      </Collapse>
    </Paper>
  );
};

export default SolutionSteps;