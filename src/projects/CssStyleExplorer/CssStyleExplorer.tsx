import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Divider,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Slider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { cssProperties } from './cssProperties';
import { CssProperty, CssValue } from './types';
import StylePreview from './StylePreview';
import './CssStyleExplorer.css';

const CssStyleExplorer: React.FC = () => {
    const theme = useTheme();
    const [activeStyles, setActiveStyles] = useState<Record<string, string>>({});
    const [expandedCategory, setExpandedCategory] = useState<string | false>("layout");
    const [customElementContent, setCustomElementContent] = useState<string>("Element testowy");
    const [cssCode, setCssCode] = useState<string>("");

    // Grupowanie właściwości CSS według kategorii
    const groupedProperties: Record<string, CssProperty[]> = {};
    cssProperties.forEach(prop => {
        if (!groupedProperties[prop.category]) {
            groupedProperties[prop.category] = [];
        }
        groupedProperties[prop.category].push(prop);
    });

    // Generowanie kodu CSS na podstawie aktywnych stylów
    useEffect(() => {
        let code = "";
        Object.entries(activeStyles).forEach(([property, value]) => {
            if (value) {
                code += `${property}: ${value};\n`;
            }
        });
        setCssCode(code);
    }, [activeStyles]);

    // Obsługa zmiany właściwości CSS
    const handleStyleChange = (property: string, value: string) => {
        setActiveStyles(prev => ({
            ...prev,
            [property]: value
        }));
    };

    // Obsługa zmiany akordeonu
    const handleAccordionChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedCategory(isExpanded ? category : false);
    };

    // Kopiowanie kodu CSS do schowka
    const handleCopyCode = () => {
        navigator.clipboard.writeText(cssCode);
    };

    // Resetowanie wszystkich stylów
    const handleResetStyles = () => {
        setActiveStyles({});
    };

    // Renderowanie kontrolki dla właściwości CSS
    const renderPropertyControl = (property: CssProperty) => {
        const currentValue = activeStyles[property.name] || '';

        // Dla właściwości z predefiniowanymi opcjami (radio)
        if (property.options && property.options.length > 0 && property.type === 'select') {
            return (
                <RadioGroup
                    row
                    value={currentValue}
                    onChange={(e) => handleStyleChange(property.name, e.target.value)}
                >
                    {property.options.map((option: CssValue) => (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio size="small" />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            );
        }

        // Dla właściwości z predefiniowanymi opcjami (select)
        if (property.options && property.options.length > 0 && property.type === 'dropdown') {
            return (
                <FormControl fullWidth size="small">
                    <InputLabel id={`${property.name}-label`}>{property.label}</InputLabel>
                    <Select
                        labelId={`${property.name}-label`}
                        value={currentValue}
                        onChange={(e) => handleStyleChange(property.name, e.target.value)}
                        label={property.label}
                    >
                        <MenuItem value="">
                            <em>Brak</em>
                        </MenuItem>
                        {property.options.map((option: CssValue) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }

        // Dla właściwości z wartościami liczbowymi
        if (property.type === 'range') {
            const value = currentValue ? parseFloat(currentValue) : property.defaultValue || 0;
            const unit = property.unit || 'px';

            return (
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider
                                value={value}
                                onChange={(_, newValue) => handleStyleChange(property.name, `${newValue}${unit}`)}
                                min={property.min || 0}
                                max={property.max || 100}
                                step={property.step || 1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}${unit}`}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                {value}{unit}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            );
        }

        // W funkcji renderPropertyControl w CssStyleExplorer.tsx
        // Dla właściwości typu color:
        if (property.type === 'color') {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <input
                        type="color"
                        value={currentValue || '#000000'}
                        onChange={(e) => handleStyleChange(property.name, e.target.value)}
                        className={theme.palette.mode === 'dark' ? 'dark-mode-color-input' : ''}
                    />
                    <TextField
                        size="small"
                        value={currentValue}
                        onChange={(e) => handleStyleChange(property.name, e.target.value)}
                        placeholder={property.placeholder || ''}
                        fullWidth
                        // Dodaj style dla trybu ciemnego
                        sx={{
                            '& .MuiInputBase-input': {
                                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                            }
                        }}
                    />
                </Box>
            );
        }

        // Dla standardowych właściwości tekstowych:
        return (
            <TextField
                size="small"
                value={currentValue}
                onChange={(e) => handleStyleChange(property.name, e.target.value)}
                placeholder={property.placeholder || ''}
                fullWidth
                // Dodaj style dla trybu ciemnego
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                    }
                }}
            />
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Eksplorator Stylów CSS
            </Typography>
            <Typography variant="body1" paragraph>
                Wybierz właściwości CSS z lewej kolumny i obserwuj zmiany na elemencie w czasie rzeczywistym.
            </Typography>

            <Grid container spacing={3}>
                {/* Lewa kolumna - lista właściwości CSS */}
                <Grid item xs={12} md={5} lg={4}>
                    <Paper elevation={3} sx={{ height: '70vh', overflow: 'auto', p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Właściwości CSS
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {Object.entries(groupedProperties).map(([category, properties]) => (
                            <Accordion
                                key={category}
                                expanded={expandedCategory === category}
                                onChange={handleAccordionChange(category)}
                                sx={{
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'inherit',
                                    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon
                                        sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}
                                    />}
                                    sx={{
                                        backgroundColor: theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : 'rgba(0, 0, 0, 0.03)'
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {properties.map(property => (
                                            <Box key={property.name} sx={{ mb: 2 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="medium"
                                                    gutterBottom
                                                    sx={{
                                                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                                                    }}
                                                >
                                                    {property.label} ({property.name})
                                                </Typography>
                                                {renderPropertyControl(property)}
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Paper>
                </Grid>

                {/* Prawa kolumna - podgląd i kod CSS */}
                <Grid item xs={12} md={7} lg={8}>
                    <Grid container spacing={3}>
                        {/* Podgląd elementu */}
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">
                                        Podgląd
                                    </Typography>
                                    <TextField
                                        size="small"
                                        label="Zawartość elementu"
                                        value={customElementContent}
                                        onChange={(e) => setCustomElementContent(e.target.value)}
                                        sx={{ width: '300px' }}
                                    />
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{
                                    height: '300px',
                                    border: `1px dashed ${theme.palette.mode === 'dark' ? '#777' : '#ccc'}`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'auto',
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                                }}>
                                    <StylePreview styles={activeStyles} content={customElementContent} />
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Kod CSS */}
                        <Grid item xs={12}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'grey.100',
                                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                                    fontFamily: 'monospace',
                                    minHeight: '150px',
                                    whiteSpace: 'pre-wrap',
                                    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                                }}
                            >
                                {cssCode || 'Nie wybrano jeszcze żadnych stylów.'}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">
                                        Wygenerowany kod CSS
                                    </Typography>
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={handleResetStyles}
                                            sx={{
                                                mr: 1,
                                                borderColor: theme.palette.mode === 'dark' ? theme.palette.error.dark : undefined,
                                                color: theme.palette.mode === 'dark' ? theme.palette.error.light : undefined
                                            }}
                                        >
                                            Resetuj
                                        </Button>
                                        <Tooltip title="Kopiuj do schowka">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                startIcon={<ContentCopyIcon />}
                                                onClick={handleCopyCode}
                                                sx={{
                                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined
                                                }}
                                            >
                                                Kopiuj
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                                        fontFamily: 'monospace',
                                        minHeight: '150px',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {cssCode || 'Nie wybrano jeszcze żadnych stylów.'}
                                </Paper>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
};

export default CssStyleExplorer;