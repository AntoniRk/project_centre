// src/projects/MathSolver/MathSolver.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Paper, Typography, Box, useTheme, Divider, Alert, Fade } from '@mui/material';
import MathInput from './components/MathInput';
import MathKeyboard from './components/MathKeyboard';
import SolutionSteps from './components/SolutionSteps';
import { parseExpression, preprocessExpression } from './utils/mathParser';
import { generateSolutionSteps } from './utils/stepGenerator';
import { Expression, SolutionStep } from './types';

const MathSolver: React.FC = () => {
    const [expression, setExpression] = useState<string>('');
    const [parsedExpression, setParsedExpression] = useState<Expression | null>(null);
    const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();

    // Autofocus na pole wprowadzania przy pierwszym renderowaniu
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Efekt animacji sukcesu
    useEffect(() => {
        if (solutionSteps.length > 0) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [solutionSteps]);

    const handleExpressionChange = (newExpression: string) => {
        setExpression(newExpression);
        setError(null);
    };

    const handleKeyboardInput = (input: string) => {
        setExpression(prev => {
            const inputElement = document.getElementById('math-input') as HTMLInputElement;
            const cursorPosition = inputElement?.selectionStart || prev.length;
            const newExpression = prev.substring(0, cursorPosition) + input + prev.substring(cursorPosition);

            // Ustaw kursor po wstawionym tekście
            setTimeout(() => {
                if (inputElement) {
                    inputElement.focus();
                    inputElement.setSelectionRange(cursorPosition + input.length, cursorPosition + input.length);
                }
            }, 0);

            return newExpression;
        });
    };

    const handleSolve = async () => {
        if (!expression.trim()) {
            setError("Proszę wprowadzić wyrażenie matematyczne.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Preprocessing wyrażenia
            const processedExpression = preprocessExpression(expression);

            // Parsowanie wyrażenia
            const parsed = parseExpression(processedExpression);
            setParsedExpression(parsed);

            // Symulacja opóźnienia dla lepszego UX
            await new Promise(resolve => setTimeout(resolve, 300));

            // Generowanie kroków rozwiązania
            const steps = generateSolutionSteps(parsed);
            setSolutionSteps(steps);
        } catch (err) {
            setError((err as Error).message);
            setParsedExpression(null);
            setSolutionSteps([]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderRadius: 2
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Zaawansowany System Matematyczny
                </Typography>

                {solutionSteps.length > 0 && (
                    <Box>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="h5" gutterBottom>
                            Rozwiązanie krok po kroku:
                        </Typography>
                        <SolutionSteps steps={solutionSteps} />
                        <Divider sx={{ mb: 3 }} />
                    </Box>
                )}

                <Box sx={{ mb: 4 }}>
                    <MathInput
                        value={expression}
                        onChange={handleExpressionChange}
                        onSolve={handleSolve}
                        error={error}
                        isProcessing={isProcessing}
                        inputRef={inputRef}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <MathKeyboard onButtonClick={handleKeyboardInput} />
                </Box>

                {showSuccess && solutionSteps.length > 0 && (
                    <Fade in={showSuccess}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Wyrażenie zostało pomyślnie rozwiązane!
                        </Alert>
                    </Fade>
                )}
            </Paper>
        </Container>
    );
};

export default MathSolver;