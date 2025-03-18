import React, { RefObject } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Tooltip,
    useTheme,
    CircularProgress
} from '@mui/material';
import {
    PlayArrow as PlayArrowIcon,
    Backspace as BackspaceIcon,
    Info as InfoIcon
} from '@mui/icons-material';

interface MathInputProps {
    value: string;
    onChange: (value: string) => void;
    onSolve: () => void;
    error: string | null;
    isProcessing?: boolean;
    inputRef?: RefObject<HTMLInputElement | null>;}

const MathInput: React.FC<MathInputProps> = ({
    value,
    onChange,
    onSolve,
    error,
    isProcessing = false,
    inputRef
}) => {
    const theme = useTheme();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSolve();
        }
    };

    const handleClear = () => {
        onChange('');
    };

    const handleBackspace = () => {
        onChange(value.slice(0, -1));
    };

    // Przykładowe wyrażenia matematyczne
    const examples = [
        { label: 'Równanie kwadratowe', value: '2x^2 + 3x - 5 = 0' },
        { label: 'Równanie liniowe', value: '3x + 4 = 10' },
        { label: 'Wyrażenie do uproszczenia', value: '2x + 3x + 4x' },
        { label: 'Funkcja trygonometryczna', value: 'sin(x)^2 + cos(x)^2' },
        { label: 'Pierwiastek kwadratowy', value: 'sqrt(16) + sqrt(9)' }
    ];

    // Kategorie wyrażeń z objaśnieniami
    const expressionCategories = [
        {
            name: 'Równania',
            description: 'Wyrażenia zawierające znak = do rozwiązania',
            examples: [
                { label: 'Liniowe', value: 'x + 5 = 10' },
                { label: 'Kwadratowe', value: 'x^2 - 4 = 0' },
                { label: 'Z ułamkami', value: '(x+1)/2 = 3' }
            ]
        },
        {
            name: 'Upraszczanie',
            description: 'Wyrażenia algebraiczne do uproszczenia',
            examples: [
                { label: 'Wielomiany', value: '3x^2 + 2x - 5x^2 + 4x' },
                { label: 'Z nawiasami', value: '2(x+3) - 5(x-1)' },
                { label: 'Ułamki', value: '(x^2-1)/(x+1)' }
            ]
        },
        {
            name: 'Funkcje',
            description: 'Obliczanie i upraszczanie funkcji',
            examples: [
                { label: 'Trygonometria', value: 'sin(pi/4)^2 + cos(pi/4)^2' },
                { label: 'Logarytmy', value: 'log(100) + log(10)' },
                { label: 'Wykładnicze', value: 'exp(2) + exp(-2)' }
            ]
        }
    ];

    return (
        <Box>
            <TextField
                id="math-input"
                fullWidth
                variant="outlined"
                label="Wprowadź wyrażenie matematyczne"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                error={!!error}
                helperText={error || 'Np. 2x^2 + 3x - 5 = 0 lub sin(x) + cos(x)'}
                inputRef={inputRef} // Dodaj tę linię
                disabled={isProcessing} // Opcjonalnie możesz dodać to dla lepszego UX
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={handleBackspace}
                                disabled={!value || isProcessing} // Dodaj isProcessing
                                sx={{ mr: 0.5 }}
                            >
                                <BackspaceIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                color="primary"
                                onClick={onSolve}
                                disabled={!value.trim() || isProcessing} // Dodaj isProcessing
                                sx={{ mr: 0.5 }}
                            >
                                <PlayArrowIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}

                sx={{
                    '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                        fontSize: '1.1rem'
                    }
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Możesz używać klawiatury poniżej lub wprowadzać wyrażenia bezpośrednio.
                </Typography>
                <Button
                    size="small"
                    variant="text"
                    color="error"
                    onClick={handleClear}
                    disabled={!value}
                >
                    Wyczyść
                </Button>
            </Box>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Popularne przykłady:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {examples.map((example, index) => (
                    <Chip
                        key={index}
                        label={example.label}
                        onClick={() => onChange(example.value)}
                        variant="outlined"
                        color="primary"
                        clickable
                    />
                ))}
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Kategorie wyrażeń:
                </Typography>
                {expressionCategories.map((category, categoryIndex) => (
                    <Paper
                        key={categoryIndex}
                        variant="outlined"
                        sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                                {category.name}
                            </Typography>
                            <Tooltip title={category.description}>
                                <IconButton size="small" sx={{ ml: 0.5 }}>
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {category.examples.map((example, exampleIndex) => (
                                <Button
                                    key={exampleIndex}
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onChange(example.value)}
                                    sx={{
                                        borderRadius: 4,
                                        textTransform: 'none',
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {example.label}: {example.value}
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                ))}
            </Box>

            {error && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(211, 47, 47, 0.1)'
                            : 'rgba(211, 47, 47, 0.05)',
                        borderLeft: `4px solid ${theme.palette.error.main}`,
                        mb: 2
                    }}
                >
                    <Typography variant="body2" color="error">
                        <strong>Błąd:</strong> {error}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Sprawdź, czy wyrażenie jest poprawne matematycznie. Pamiętaj o nawiasach i znakach działań.
                    </Typography>
                </Paper>
            )}

            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    <strong>Wskazówki:</strong>
                </Typography>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>
                        <Typography variant="body2" color="text.secondary">
                            Używaj <code>^</code> dla potęg, np. <code>x^2</code> oznacza x².
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2" color="text.secondary">
                            Funkcje zapisuj z nawiasami, np. <code>sin(x)</code>, <code>sqrt(x)</code>.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2" color="text.secondary">
                            Mnożenie można zapisać jako <code>2*x</code> lub po prostu <code>2x</code>.
                        </Typography>
                    </li>
                </ul>
            </Box>
            {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={24} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Rozwiązuję...
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MathInput;