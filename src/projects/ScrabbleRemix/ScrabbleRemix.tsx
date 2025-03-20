import React, { useState, useEffect, useRef } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Slider,
    Paper
} from '@mui/material';
import SortableLetter from './SortableLetter';
import './ScrabbleRemix.css';

// Wartości punktowe dla liter (uproszczone)
const letterValues: { [key: string]: number } = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1,
    'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1,
    'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

// Częstotliwość występowania liter w języku angielskim
const letterFrequency: { [key: string]: number } = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
    'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
    'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

const ScrabbleRemix: React.FC = () => {
    const [letters, setLetters] = useState<{ id: string, letter: string }[]>([]);
    const [word, setWord] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [letterCount, setLetterCount] = useState(10);
    const [isAnimating, setIsAnimating] = useState(false);
    const [newLetterIds, setNewLetterIds] = useState<string[]>([]);
    const wordInputRef = useRef<HTMLInputElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Generowanie losowej litery z uwzględnieniem częstotliwości
    const getRandomLetter = (): string => {
        const letters = [];
        for (const [letter, frequency] of Object.entries(letterFrequency)) {
            for (let i = 0; i < frequency; i++) {
                letters.push(letter);
            }
        }
        return letters[Math.floor(Math.random() * letters.length)];
    };

    const generateLetters = () => {
        const newLetters = Array.from({ length: letterCount }, () => {
            const letter = getRandomLetter();
            return {
                id: `${letter}-${Date.now()}-${Math.random()}`,
                letter
            };
        });
        setLetters(newLetters);
    };

    // Inicjalizacja liter
    useEffect(() => {
        generateLetters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [letterCount]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setLetters((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const checkWord = async () => {
        if (!word.trim()) {
            setMessage('Please enter a word');
            return;
        }

        // Sprawdzenie, czy mamy wszystkie potrzebne litery
        const availableLetters = [...letters.map(l => l.letter)];
        const wordUpperCase = word.toUpperCase();

        let canFormWord = true;
        for (const char of wordUpperCase) {
            const index = availableLetters.indexOf(char);
            if (index === -1) {
                canFormWord = false;
                break;
            }
            availableLetters.splice(index, 1);
        }

        if (!canFormWord) {
            setMessage('You don\'t have all the required letters!');
            return;
        }

        try {
            // Sprawdzenie, czy słowo istnieje w słowniku (API)
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

            if (response.ok) {
                // Słowo istnieje
                calculateScore(wordUpperCase);
                setIsAnimating(true);

                // Po animacji, zastąp użyte litery nowymi
                setTimeout(() => {
                    replaceUsedLetters(wordUpperCase);
                    setIsAnimating(false);
                    setWord('');
                    setMessage(`Great! "${word}" is a valid word!`);
                }, 1000);
            } else {
                setMessage(`"${word}" is not a valid English word!`);
            }
        } catch (error) {
            setMessage('Error checking the word. Please try again.');
        }
    };

    const calculateScore = (word: string) => {
        let wordScore = 0;
        for (const char of word) {
            wordScore += letterValues[char] || 0;
        }
        setScore(prevScore => prevScore + wordScore);
    };

    const replaceUsedLetters = (usedWord: string) => {
        const usedLetters = Array.from(usedWord);
        const newLetters = [...letters];
        const newIds: string[] = [];

        // Usunięcie użytych liter
        for (const char of usedLetters) {
            const index = newLetters.findIndex(item => item.letter === char);
            if (index !== -1) {
                newLetters.splice(index, 1);
            }
        }

        // Dodanie nowych liter
        while (newLetters.length < letterCount) {
            const letter = getRandomLetter();
            const newId = `${letter}-${Date.now()}-${Math.random()}`;
            newIds.push(newId);
            newLetters.push({
                id: newId,
                letter
            });
        }

        setLetters(newLetters);
        setNewLetterIds(newIds);

        // Resetujemy nowe ID po pewnym czasie, aby animacja nie powtarzała się
        setTimeout(() => {
            setNewLetterIds([]);
        }, 1000);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            checkWord();
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setLetterCount(newValue as number);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Scrabble Remix
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Score: {score}
                </Typography>
                {message && (
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            bgcolor: message.includes('valid') ? 'success.light' : 'warning.light',
                            color: 'text.primary',
                            mb: 2
                        }}
                    >
                        <Typography>{message}</Typography>
                    </Paper>
                )}
            </Box>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 4,
                        minHeight: '100px'
                    }}
                    className={isAnimating ? 'letter-container animating' : 'letter-container'}
                >
                    <SortableContext items={letters.map(l => l.id)} strategy={horizontalListSortingStrategy}>
                        {letters.map((item) => (
                            <SortableLetter
                                key={item.id}
                                id={item.id}
                                letter={item.letter}
                                value={letterValues[item.letter] || 0}
                                isNew={newLetterIds.includes(item.id)}
                            />
                        ))}
                    </SortableContext>
                </Box>
            </DndContext>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <TextField
                    label="Enter word"
                    variant="outlined"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyPress={handleKeyPress}
                    inputRef={wordInputRef}
                    sx={{ mb: 2, width: '100%', maxWidth: '400px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={checkWord}
                    disabled={isAnimating}
                >
                    Check Word
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography gutterBottom>Number of Letters: {letterCount}</Typography>
                <Slider
                    value={letterCount}
                    onChange={handleSliderChange}
                    aria-labelledby="letter-count-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={5}
                    max={15}
                    disabled={isAnimating}
                />
            </Box>

            <Box sx={{ mb: 4 }}>
                <Button
                    variant="outlined"
                    onClick={generateLetters}
                    disabled={isAnimating}
                >
                    Generate New Letters
                </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center">
                Drag and drop letters to rearrange them. Form English words to earn points!
            </Typography>
        </Container>
    );
};

export default ScrabbleRemix;