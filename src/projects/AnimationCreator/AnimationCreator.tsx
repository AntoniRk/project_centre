import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    TextField,
    Select,
    SelectChangeEvent,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Divider,
    IconButton,
    Snackbar,
    Alert,
    useTheme,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { Animation } from './types';
import { createNewAnimation, generateCssCode, saveAnimation, exportToCssExplorer } from './utils';
import { presetAnimations } from './presetAnimations';
import AnimationPreview from './AnimationPreview';
import AnimationTimeline from './AnimationTimeline';
import KeyframeEditor from './KeyframeEditor';
import './AnimationCreator.css';

const AnimationCreator: React.FC = () => {
    const theme = useTheme();

    // Stan animacji
    const [animation, setAnimation] = useState<Animation>(createNewAnimation());
    const [selectedKeyframeId, setSelectedKeyframeId] = useState<string | null>(animation.keyframes[0]?.id || null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [elementContent, setElementContent] = useState<string>('Element');
    const [elementType, setElementType] = useState<string>('box');
    const [cssCode, setCssCode] = useState<string>('');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [resetKey, setResetKey] = useState<number>(0);

    // Generowanie kodu CSS na podstawie animacji
    useEffect(() => {
        const code = generateCssCode(animation);
        setCssCode(code);
    }, [animation]);

    // Obsługa zmiany nazwy animacji
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnimation({
            ...animation,
            name: event.target.value
        });
    };

    // Obsługa zmiany czasu trwania animacji
    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnimation({
            ...animation,
            duration: parseFloat(event.target.value) || 1
        });
    };

    // Obsługa zmiany funkcji czasu animacji
    const handleTimingFunctionChange = (event: SelectChangeEvent) => {
        setAnimation({
            ...animation,
            timingFunction: event.target.value as string
        });
    };

    // Obsługa zmiany liczby powtórzeń animacji
    const handleIterationCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnimation({
            ...animation,
            iterationCount: event.target.value
        });
    };

    // Obsługa zmiany kierunku animacji
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setAnimation({
            ...animation,
            direction: event.target.value as string
        });
    };

    // Obsługa zmiany trybu wypełnienia animacji
    const handleFillModeChange = (event: SelectChangeEvent) => {
        setAnimation({
            ...animation,
            fillMode: event.target.value as string
        });
    };

    // Obsługa wyboru klatki kluczowej
    const handleSelectKeyframe = (id: string) => {
        setSelectedKeyframeId(id);
    };

    // Obsługa odtwarzania/zatrzymywania animacji
    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Obsługa zapisywania animacji
    const handleSaveAnimation = () => {
        try {
            saveAnimation(animation);
            setNotification({ message: 'Animacja została zapisana', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Błąd podczas zapisywania animacji', type: 'error' });
        }
    };

    // Obsługa kopiowania kodu CSS
    const handleCopyCode = () => {
        navigator.clipboard.writeText(cssCode);
        setNotification({ message: 'Kod CSS został skopiowany do schowka', type: 'success' });
    };

    // Obsługa eksportu do CssStyleExplorer
    const handleExportToCssExplorer = () => {
        try {
            exportToCssExplorer(cssCode);
            setNotification({ message: 'Animacja została wyeksportowana do CSS Style Explorer', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Błąd podczas eksportu animacji', type: 'error' });
        }
    };

    // Obsługa zastosowania predefiniowanej animacji
    const handleApplyPreset = (presetId: string) => {
        const preset = presetAnimations.find(p => p.id === presetId);
        if (preset) {
            setAnimation(preset.animation);
            setSelectedKeyframeId(preset.animation.keyframes[0]?.id || null);
            setNotification({ message: `Zastosowano preset: ${preset.name}`, type: 'success' });
        }
    };

    // Obsługa resetowania animacji
    const handleResetAnimation = () => {
        setAnimation(createNewAnimation());
        setSelectedKeyframeId(null);
        setIsPlaying(false);
    };

    // Obsługa resetowania pozycji animacji
    const handleResetPosition = () => {
        // Zatrzymaj animację
        setIsPlaying(false);

        // Krótkie opóźnienie, aby zatrzymanie animacji zostało zastosowane
        setTimeout(() => {
            // Zresetuj klucz, co spowoduje ponowne wyrenderowanie komponentu AnimationPreview
            setResetKey(prevKey => prevKey + 1);

            // Uruchom animację ponownie
            setIsPlaying(true);
        }, 50);
    };


    // Zamknięcie powiadomienia
    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Kreator Animacji CSS
            </Typography>
            <Typography variant="body1" paragraph>
                Twórz zaawansowane animacje CSS za pomocą intuicyjnego interfejsu.
            </Typography>

            <Divider sx={{ my: 3 }} />


            {/* Predefiniowane animacje */}
            <Typography variant="h6" gutterBottom>
                Predefiniowane animacje
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {presetAnimations.map(preset => (
                    <Card onClick={() => handleApplyPreset(preset.id)} key={preset.id} sx={{ width: 'fit-content', maxWidth: '300px', backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff' }}>
                        <CardContent>
                            <Typography variant="subtitle1" component="div">
                                {preset.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span id='chowajtekst'>{preset.description}</span>
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Główne ustawienia animacji */}
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Ustawienia animacji
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Nazwa animacji"
                            value={animation.name}
                            onChange={handleNameChange}
                            fullWidth
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Czas trwania (s)"
                            type="number"
                            value={animation.duration}
                            onChange={handleDurationChange}
                            fullWidth
                            size="small"
                            inputProps={{ min: 0.1, step: 0.1 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="timing-function-label">Funkcja czasu</InputLabel>
                            <Select
                                labelId="timing-function-label"
                                value={animation.timingFunction}
                                onChange={handleTimingFunctionChange}
                                label="Funkcja czasu"
                            >
                                <MenuItem value="linear">Linear</MenuItem>
                                <MenuItem value="ease">Ease</MenuItem>
                                <MenuItem value="ease-in">Ease In</MenuItem>
                                <MenuItem value="ease-out">Ease Out</MenuItem>
                                <MenuItem value="ease-in-out">Ease In Out</MenuItem>
                                <MenuItem value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">Bounce</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Liczba powtórzeń"
                            value={animation.iterationCount}
                            onChange={handleIterationCountChange}
                            fullWidth
                            size="small"
                            placeholder="np. 1, 2 lub infinite"
                        />
                    </Grid>

                    <Grid item xs={12} md={1.5}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="direction-label">Kierunek</InputLabel>
                            <Select
                                labelId="direction-label"
                                value={animation.direction}
                                onChange={handleDirectionChange}
                                label="Kierunek"
                            >
                                <MenuItem value="normal">Normal</MenuItem>
                                <MenuItem value="reverse">Reverse</MenuItem>
                                <MenuItem value="alternate">Alternate</MenuItem>
                                <MenuItem value="alternate-reverse">Alternate Reverse</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={1.5}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="fill-mode-label">Tryb wypełnienia</InputLabel>
                            <Select
                                labelId="fill-mode-label"
                                value={animation.fillMode}
                                onChange={handleFillModeChange}
                                label="Tryb wypełnienia"
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="forwards">Forwards</MenuItem>
                                <MenuItem value="backwards">Backwards</MenuItem>
                                <MenuItem value="both">Both</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box id="boxzprzyciskami" sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        onClick={handleTogglePlay}
                    >
                        <span id="chowajtekst">{isPlaying ? 'Zatrzymaj' : 'Odtwórz'}</span>
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleResetPosition}
                        title="Resetuje pozycję elementu do stanu początkowego"
                    >
                        <span id="chowajtekst">Resetuj pozycję</span>
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveAnimation}
                    >
                        <span id="chowajtekst">Zapisz animację</span>
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleResetAnimation}
                    >
                        <span id="chowajtekst">Resetuj</span>
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {/* Podgląd animacji */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Podgląd
                    </Typography>

                    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                        <TextField
                            label="Zawartość elementu"
                            value={elementContent}
                            onChange={(e) => setElementContent(e.target.value)}
                            size="small"
                        />

                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel id="element-type-label">Typ elementu</InputLabel>
                            <Select
                                labelId="element-type-label"
                                value={elementType}
                                onChange={(e) => setElementType(e.target.value)}
                                label="Typ elementu"
                            >
                                <MenuItem value="text">Tekst</MenuItem>
                                <MenuItem value="box">Box</MenuItem>
                                <MenuItem value="image">Obraz</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <AnimationPreview
                        animation={animation}
                        elementContent={elementContent}
                        elementType={elementType}
                        isPlaying={isPlaying}
                        resetKey={resetKey}
                    />

                    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                        Wygenerowany kod CSS
                    </Typography>

                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            position: 'relative',
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1 }}>
                            <IconButton size="small" onClick={handleCopyCode} title="Kopiuj do schowka">
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap',
                                maxHeight: '200px',
                                overflow: 'auto',
                                pt: 2,
                                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                            }}
                        >
                            {cssCode}
                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleExportToCssExplorer}
                            >
                                Eksportuj do CSS Style Explorer
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Edytor animacji */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Oś czasu
                            </Typography>

                            <AnimationTimeline
                                animation={animation}
                                selectedKeyframeId={selectedKeyframeId}
                                onSelectKeyframe={handleSelectKeyframe}
                                onUpdateAnimation={setAnimation}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Edytor właściwości
                            </Typography>

                            <KeyframeEditor
                                animation={animation}
                                selectedKeyframeId={selectedKeyframeId}
                                onUpdateAnimation={setAnimation}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Powiadomienia */}
            <Snackbar
                open={notification !== null}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
            >
                {notification ? (
                    <Alert
                        onClose={handleCloseNotification}
                        severity={notification.type}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                ) : <div />}
            </Snackbar>
        </Container>
    );
};

export default AnimationCreator;