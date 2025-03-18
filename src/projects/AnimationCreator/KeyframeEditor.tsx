import React from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    MenuItem,
    Select,
    Button,
    FormControl,
    InputLabel,
    useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Animation } from './types';
import { animatableProperties } from './utils';

interface KeyframeEditorProps {
    animation: Animation;
    selectedKeyframeId: string | null;
    onUpdateAnimation: (animation: Animation) => void;
}

const KeyframeEditor: React.FC<KeyframeEditorProps> = ({
    animation,
    selectedKeyframeId,
    onUpdateAnimation
}) => {
    const theme = useTheme();

    // Znajdź wybraną klatkę kluczową
    const selectedKeyframe = animation.keyframes.find(kf => kf.id === selectedKeyframeId);

    if (!selectedKeyframe) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    Wybierz klatkę kluczową, aby edytować jej właściwości
                </Typography>
            </Paper>
        );
    }

    // Dodaj nową właściwość
    const handleAddProperty = () => {
        // Znajdź właściwość, która nie jest jeszcze używana
        const usedProperties = selectedKeyframe.properties.map(p => p.property);
        let newProperty = 'opacity';

        for (const prop of animatableProperties) {
            if (!usedProperties.includes(prop)) {
                newProperty = prop;
                break;
            }
        }

        // Zaktualizuj klatkę kluczową
        const updatedKeyframes = animation.keyframes.map(kf => {
            if (kf.id === selectedKeyframeId) {
                return {
                    ...kf,
                    properties: [
                        ...kf.properties,
                        { property: newProperty, value: newProperty === 'opacity' ? '1' : '0' }
                    ]
                };
            }
            return kf;
        });

        onUpdateAnimation({
            ...animation,
            keyframes: updatedKeyframes
        });
    };

    // Usuń właściwość
    const handleDeleteProperty = (propertyIndex: number) => {
        // Nie pozwól usunąć wszystkich właściwości
        if (selectedKeyframe.properties.length <= 1) {
            alert('Klatka kluczowa musi mieć co najmniej jedną właściwość');
            return;
        }

        const updatedKeyframes = animation.keyframes.map(kf => {
            if (kf.id === selectedKeyframeId) {
                return {
                    ...kf,
                    properties: kf.properties.filter((_, index) => index !== propertyIndex)
                };
            }
            return kf;
        });

        onUpdateAnimation({
            ...animation,
            keyframes: updatedKeyframes
        });
    };

    // Zmień właściwość
    const handlePropertyChange = (index: number, newProperty: string) => {
        const updatedKeyframes = animation.keyframes.map(kf => {
            if (kf.id === selectedKeyframeId) {
                const updatedProperties = [...kf.properties];
                updatedProperties[index] = {
                    ...updatedProperties[index],
                    property: newProperty
                };
                return {
                    ...kf,
                    properties: updatedProperties
                };
            }
            return kf;
        });

        onUpdateAnimation({
            ...animation,
            keyframes: updatedKeyframes
        });
    };

    // Zmień wartość właściwości
    const handleValueChange = (index: number, newValue: string) => {
        const updatedKeyframes = animation.keyframes.map(kf => {
            if (kf.id === selectedKeyframeId) {
                const updatedProperties = [...kf.properties];
                updatedProperties[index] = {
                    ...updatedProperties[index],
                    value: newValue
                };
                return {
                    ...kf,
                    properties: updatedProperties
                };
            }
            return kf;
        });

        onUpdateAnimation({
            ...animation,
            keyframes: updatedKeyframes
        });
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
                height: '100%'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                    Właściwości klatki {selectedKeyframe.position}%
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddProperty}
                    size="small"
                >
                    Dodaj właściwość
                </Button>
            </Box>

            {selectedKeyframe.properties.map((prop, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                        p: 1,
                        borderRadius: '4px'
                    }}
                >
                    <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                        <InputLabel id={`property-label-${index}`}>Właściwość</InputLabel>
                        <Select
                            labelId={`property-label-${index}`}
                            value={prop.property}
                            onChange={(e) => handlePropertyChange(index, e.target.value)}
                            label="Właściwość"
                        >
                            {animatableProperties.map(property => (
                                <MenuItem key={property} value={property}>
                                    {property}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Wartość"
                        value={prop.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ mr: 1 }}
                    />

                    <IconButton
                        size="small"
                        onClick={() => handleDeleteProperty(index)}
                        color="error"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ))}

            {selectedKeyframe.properties.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Brak właściwości. Dodaj nową właściwość, aby zdefiniować wygląd klatki kluczowej.
                </Typography>
            )}

            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Popularne wartości:
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedKeyframe.properties.map((prop, index) => (
                        <React.Fragment key={`popular-values-${index}`}>
                            {prop.property === 'opacity' && (
                                <>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, '0')}>0</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, '0.5')}>0.5</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, '1')}>1</Button>
                                </>
                            )}

                            {prop.property === 'transform' && (
                                <>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'translateX(0)')}>translateX(0)</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'translateX(100px)')}>translateX(100px)</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'rotate(0deg)')}>rotate(0deg)</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'rotate(360deg)')}>rotate(360deg)</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'scale(1)')}>scale(1)</Button>
                                    <Button size="small" variant="outlined" onClick={() => handleValueChange(index, 'scale(1.5)')}>scale(1.5)</Button>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default KeyframeEditor;