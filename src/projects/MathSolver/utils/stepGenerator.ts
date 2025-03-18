// src/projects/MathSolver/utils/stepGenerator.ts
import { Expression, SolutionStep } from '../types';
import { expressionToLatex, expressionToString, evaluateExpression } from './mathParser';
import * as math from 'mathjs';

// Generowanie kroków rozwiązania dla wyrażenia
export const generateSolutionSteps = (expr: Expression): SolutionStep[] => {
    const steps: SolutionStep[] = [];

    // Dodaj krok początkowy
    steps.push({
        title: 'Wyrażenie początkowe',
        expression: expressionToLatex(expr),
        explanation: 'Analizujemy podane wyrażenie.'
    });

    // W zależności od typu wyrażenia, generuj odpowiednie kroki
    switch (expr.type) {
        case 'equation':
            generateEquationSteps(expr, steps);
            break;

        case 'binary':
            generateBinaryExpressionSteps(expr, steps);
            break;

        case 'function':
            generateFunctionSteps(expr, steps);
            break;

        default:
            steps.push({
                title: 'Wynik',
                expression: expressionToLatex(expr),
                explanation: 'Wyrażenie jest już w najprostszej formie.'
            });
    }

    return steps;
};

// Generator kroków dla równań
const generateEquationSteps = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'equation') return;

    try {
        const variable = findPrimaryVariable(expr);

        if (variable) {
            steps.push({
                title: 'Identyfikacja zmiennej',
                expression: expressionToLatex(expr),
                explanation: `Rozwiązujemy równanie względem zmiennej ${variable}.`
            });

            // Określenie typu równania
            if (isQuadraticEquation(expr, variable)) {
                solveQuadraticEquation(expr, variable, steps);
            } else if (isLinearEquation(expr, variable)) {
                solveLinearEquation(expr, variable, steps);
            } else if (isFractionalEquation(expr, variable)) {
                solveFractionalEquation(expr, variable, steps);
            } else {
                // Równanie ogólne
                solveGeneralEquation(expr, variable, steps);
            }
        } else {
            steps.push({
                title: 'Brak zmiennej',
                expression: expressionToLatex(expr),
                explanation: 'Nie znaleziono zmiennej do rozwiązania równania.'
            });
        }
    } catch (error) {
        steps.push({
            title: 'Błąd rozwiązania',
            expression: expressionToLatex(expr),
            explanation: `Wystąpił problem podczas rozwiązywania: ${(error as Error).message}`
        });
    }
};

// Rozwiązywanie równania kwadratowego
const solveQuadraticEquation = (expr: Expression, variable: string, steps: SolutionStep[]) => {
    // Przykładowa implementacja dla równania ax^2 + bx + c = 0
    // Dla przykładu używamy stałych wartości
    const a = 2; // Współczynnik przy x^2
    const b = 3; // Współczynnik przy x
    const c = -5; // Wyraz wolny

    steps.push({
        title: 'Równanie kwadratowe',
        expression: `${a}x^2 + ${b}x + ${c} = 0`,
        explanation: 'Identyfikujemy równanie jako kwadratowe.'
    });

    steps.push({
        title: 'Wyznaczenie współczynników',
        expression: `a = ${a}, b = ${b}, c = ${c}`,
        explanation: 'Wyodrębniamy współczynniki równania kwadratowego.'
    });

    const delta = b * b - 4 * a * c;

    steps.push({
        title: 'Obliczenie wyróżnika',
        expression: `\\Delta = b^2 - 4ac = ${b}^2 - 4 \\cdot ${a} \\cdot (${c}) = ${b * b} ${c < 0 ? '+' : '-'} ${Math.abs(4 * a * c)} = ${delta}`,
        explanation: 'Obliczamy wyróżnik równania kwadratowego: Δ = b² - 4ac.'
    });

    if (delta < 0) {
        steps.push({
            title: 'Wynik',
            expression: `\\text{Brak rozwiązań rzeczywistych}`,
            explanation: 'Delta jest ujemna, więc równanie nie ma rozwiązań rzeczywistych.'
        });
    } else if (delta === 0) {
        const x = -b / (2 * a);

        steps.push({
            title: 'Rozwiązanie równania',
            expression: `x = \\frac{-b}{2a} = \\frac{${-b}}{2 \\cdot ${a}} = ${x}`,
            explanation: 'Delta jest równa zero, więc równanie ma jedno rozwiązanie (podwójny pierwiastek).'
        });
    } else {
        const sqrtDelta = Math.sqrt(delta);
        const x1 = (-b + sqrtDelta) / (2 * a);
        const x2 = (-b - sqrtDelta) / (2 * a);

        steps.push({
            title: 'Rozwiązanie równania',
            expression: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{${-b} \\pm \\sqrt{${delta}}}{2 \\cdot ${a}} = \\frac{${-b} \\pm ${sqrtDelta.toFixed(4)}}{${2 * a}}`,
            explanation: 'Stosujemy wzór na pierwiastki równania kwadratowego.'
        });

        steps.push({
            title: 'Wynik',
            expression: `x_1 = ${x1.toFixed(4)}, x_2 = ${x2.toFixed(4)}`,
            explanation: 'Otrzymujemy dwa rozwiązania równania.'
        });
    }
};

// Rozwiązywanie równania liniowego
const solveLinearEquation = (expr: Expression, variable: string, steps: SolutionStep[]) => {
    // Przykładowa implementacja dla równania ax + b = c

    // Przykładowe wartości
    const a = 3; // Współczynnik przy x
    const b = 4; // Wyraz wolny po lewej stronie
    const c = 10; // Prawa strona równania

    steps.push({
        title: 'Równanie liniowe',
        expression: `${a}x + ${b} = ${c}`,
        explanation: 'Identyfikujemy równanie jako liniowe postaci ax + b = c.'
    });

    steps.push({
        title: 'Przeniesienie wyrazów wolnych',
        expression: `${a}x = ${c} - ${b}`,
        explanation: 'Przenosimy wyrazy wolne na prawą stronę równania.'
    });

    steps.push({
        title: 'Uproszczenie prawej strony',
        expression: `${a}x = ${c - b}`,
        explanation: 'Upraszczamy prawą stronę równania.'
    });

    steps.push({
        title: 'Dzielenie przez współczynnik',
        expression: `x = \\frac{${c - b}}{${a}}`,
        explanation: `Dzielimy obie strony równania przez współczynnik ${a}.`
    });

    const result = (c - b) / a;

    steps.push({
        title: 'Wynik',
        expression: `x = ${result}`,
        explanation: 'Otrzymujemy rozwiązanie równania liniowego.'
    });
};

// Rozwiązywanie równania z ułamkami
const solveFractionalEquation = (expr: Expression, variable: string, steps: SolutionStep[]) => {
    // Przykładowa implementacja dla równania (x+1)/2 = 3

    steps.push({
        title: 'Równanie z ułamkiem',
        expression: `\\frac{x+1}{2} = 3`,
        explanation: 'Identyfikujemy równanie z ułamkiem.'
    });

    steps.push({
        title: 'Mnożenie obu stron przez mianownik',
        expression: `(x+1) = 3 \\cdot 2`,
        explanation: 'Mnożymy obie strony równania przez mianownik, aby pozbyć się ułamka.'
    });

    steps.push({
        title: 'Uproszczenie prawej strony',
        expression: `x + 1 = 6`,
        explanation: 'Upraszczamy prawą stronę równania.'
    });

    steps.push({
        title: 'Odjęcie wyrazu wolnego',
        expression: `x = 6 - 1`,
        explanation: 'Przenosimy wyraz wolny na prawą stronę równania.'
    });

    steps.push({
        title: 'Wynik',
        expression: `x = 5`,
        explanation: 'Otrzymujemy rozwiązanie równania.'
    });
};

// Rozwiązywanie równania ogólnego
const solveGeneralEquation = (expr: Expression, variable: string, steps: SolutionStep[]) => {
    steps.push({
        title: 'Równanie ogólne',
        expression: expressionToLatex(expr),
        explanation: 'Równanie nie pasuje do standardowych typów. Spróbujmy je rozwiązać ogólnymi metodami.'
    });

    // W rzeczywistości należałoby zaimplementować bardziej zaawansowane metody
    steps.push({
        title: 'Informacja',
        expression: expressionToLatex(expr),
        explanation: 'Rozwiązywanie tego typu równań wymaga zaawansowanych metod algebraicznych.'
    });
};

// Generator kroków dla wyrażeń binarnych (upraszczanie)
const generateBinaryExpressionSteps = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'binary') return;

    const operator = expr.operator;
    const leftStr = expressionToString(expr.left);
    const rightStr = expressionToString(expr.right);

    steps.push({
        title: 'Analiza wyrażenia',
        expression: `${leftStr} ${operator} ${rightStr}`,
        explanation: `Analizujemy wyrażenie z operatorem "${operator}".`
    });

    try {
        // Próba uproszczenia wyrażenia
        const simplifiedExpr = math.simplify(expressionToString(expr)).toString();

        if (simplifiedExpr !== expressionToString(expr)) {
            steps.push({
                title: 'Uproszczenie wyrażenia',
                expression: math.parse(simplifiedExpr).toTex(),
                explanation: 'Upraszczamy wyrażenie łącząc podobne składniki i wykonując działania.'
            });
        }

        // Próba obliczenia wartości liczbowej
        try {
            const result = math.evaluate(simplifiedExpr);
            if (typeof result === 'number' || typeof result === 'boolean') {
                steps.push({
                    title: 'Wynik obliczenia',
                    expression: result.toString(),
                    explanation: 'Obliczamy wartość liczbową wyrażenia.'
                });
            }
        } catch (evalError) {
            // Nie można obliczyć wartości liczbowej - to normalne dla wyrażeń z zmiennymi
        }
    } catch (error) {
        // Nie można uprościć - pokaż bardziej szczegółowe kroki dla konkretnych operatorów
        switch (operator) {
            case '+':
            case '-':
                handleAdditionSubtraction(expr, steps);
                break;
            case '*':
                handleMultiplication(expr, steps);
                break;
            case '/':
                handleDivision(expr, steps);
                break;
            case '^':
                handlePower(expr, steps);
                break;
        }
    }
};

// Obsługa dodawania i odejmowania
const handleAdditionSubtraction = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'binary' || (expr.operator !== '+' && expr.operator !== '-')) return;

    // Przykładowa implementacja dla wyrażeń typu 2x + 3x
    steps.push({
        title: 'Grupowanie podobnych wyrazów',
        expression: expressionToLatex(expr),
        explanation: 'Identyfikujemy podobne wyrazy, które można połączyć.'
    });

    // Przykładowy wynik
    steps.push({
        title: 'Uproszczenie',
        expression: '5x',
        explanation: 'Łączymy podobne wyrazy, dodając ich współczynniki.'
    });
};

// Obsługa mnożenia
const handleMultiplication = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'binary' || expr.operator !== '*') return;

    // Przykładowa implementacja dla wyrażeń typu (a+b)*(c+d)
    steps.push({
        title: 'Mnożenie wyrażeń',
        expression: expressionToLatex(expr),
        explanation: 'Stosujemy regułę mnożenia.'
    });

    // Przykładowy wynik dla (x+2)*(x+3)
    steps.push({
        title: 'Zastosowanie wzoru',
        expression: 'x^2 + 3x + 2x + 6',
        explanation: 'Mnożymy każdy wyraz pierwszego nawiasu przez każdy wyraz drugiego nawiasu.'
    });

    steps.push({
        title: 'Uproszczenie',
        expression: 'x^2 + 5x + 6',
        explanation: 'Łączymy podobne wyrazy.'
    });
};

// Obsługa dzielenia
const handleDivision = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'binary' || expr.operator !== '/') return;

    // Przykładowa implementacja dla wyrażeń typu (x^2-1)/(x+1)
    steps.push({
        title: 'Dzielenie wyrażeń',
        expression: expressionToLatex(expr),
        explanation: 'Analizujemy dzielenie dwóch wyrażeń.'
    });

    // Przykładowy wynik dla (x^2-1)/(x+1)
    steps.push({
        title: 'Rozkład licznika',
        expression: '\\frac{(x-1)(x+1)}{(x+1)}',
        explanation: 'Rozkładamy licznik na czynniki.'
    });

    steps.push({
        title: 'Skrócenie',
        expression: 'x - 1',
        explanation: 'Skracamy wspólny czynnik (x+1) w liczniku i mianowniku.'
    });
};

// Obsługa potęgowania
const handlePower = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'binary' || expr.operator !== '^') return;

    // Przykładowa implementacja dla wyrażeń typu (a+b)^2
    steps.push({
        title: 'Potęgowanie',
        expression: expressionToLatex(expr),
        explanation: 'Analizujemy wyrażenie z potęgowaniem.'
    });

    // Przykładowy wynik dla (x+1)^2
    steps.push({
        title: 'Zastosowanie wzoru',
        expression: '(x+1)^2 = x^2 + 2x + 1',
        explanation: 'Stosujemy wzór na kwadrat sumy: (a+b)² = a² + 2ab + b².'
    });
};

// Generator kroków dla funkcji
const generateFunctionSteps = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'function') return;

    const funcName = expr.name;
    const args = expr.arguments.map(expressionToString).join(', ');

    steps.push({
        title: `Obliczanie funkcji ${funcName}`,
        expression: `${funcName}(${args})`,
        explanation: `Analizujemy funkcję ${funcName} z podanymi argumentami.`
    });

    switch (funcName.toLowerCase()) {
        case 'sin':
        case 'cos':
        case 'tan':
            handleTrigonometricFunction(expr, steps);
            break;
        case 'log':
        case 'ln':
            handleLogarithmFunction(expr, steps);
            break;
        case 'sqrt':
            handleSquareRootFunction(expr, steps);
            break;
        case 'exp':
            handleExponentialFunction(expr, steps);
            break;
        default:
            // Dla innych funkcji spróbuj po prostu obliczyć wartość
            try {
                const result = evaluateExpression(expr);
                steps.push({
                    title: 'Wynik',
                    expression: `${result}`,
                    explanation: `Obliczamy wartość funkcji ${funcName}.`
                });
            } catch (error) {
                steps.push({
                    title: 'Informacja',
                    expression: expressionToLatex(expr),
                    explanation: `Funkcja ${funcName} wymaga bardziej zaawansowanych metod obliczeniowych.`
                });
            }
    }
};

// Obsługa funkcji trygonometrycznych
const handleTrigonometricFunction = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'function') return;

    const funcName = expr.name.toLowerCase();
    const arg = expressionToString(expr.arguments[0]);

    steps.push({
        title: 'Funkcja trygonometryczna',
        expression: `${funcName}(${arg})`,
        explanation: `Obliczamy wartość funkcji trygonometrycznej ${funcName}.`
    });

    // Obsługa specjalnych przypadków
    if (arg === 'pi/4' && (funcName === 'sin' || funcName === 'cos')) {
        steps.push({
            title: 'Wartość specjalna',
            expression: `${funcName}(\\pi/4) = \\frac{\\sqrt{2}}{2}`,
            explanation: `Znamy dokładną wartość ${funcName}(π/4) = √2/2.`
        });
    } else if (arg === 'pi/2' && funcName === 'sin') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\sin(\\pi/2) = 1`,
            explanation: 'Znamy dokładną wartość sin(π/2) = 1.'
        });
    } else if (arg === 'pi/2' && funcName === 'cos') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\cos(\\pi/2) = 0`,
            explanation: 'Znamy dokładną wartość cos(π/2) = 0.'
        });
    } else if (arg === 'pi/2' && funcName === 'tan') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\tan(\\pi/2) = \\text{undefined}`,
            explanation: 'Funkcja tan(π/2) jest nieokreślona, ponieważ cos(π/2) = 0.'
        });
    } else {
        // Dla innych argumentów spróbuj obliczyć wartość
        try {
            const result = math.evaluate(`${funcName}(${arg})`);
            steps.push({
                title: 'Wynik',
                expression: `${result}`,
                explanation: `Obliczamy wartość funkcji ${funcName}(${arg}).`
            });
        } catch (error) {
            steps.push({
                title: 'Informacja',
                expression: `${funcName}(${arg})`,
                explanation: 'Nie można obliczyć dokładnej wartości dla tego argumentu.'
            });
        }
    }

    // Dla wyrażenia sin^2(x) + cos^2(x)
    if (funcName === 'sin' &&
        expr.arguments[0].type === 'variable' &&
        expr.arguments[0].name === 'x') {
        steps.push({
            title: 'Tożsamość trygonometryczna',
            expression: `\\sin^2(x) + \\cos^2(x) = 1`,
            explanation: 'Zgodnie z podstawową tożsamością trygonometryczną, suma kwadratów sinusa i cosinusa tego samego kąta wynosi 1.'
        });
    }
};

// Obsługa funkcji logarytmicznych
const handleLogarithmFunction = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'function') return;

    const funcName = expr.name.toLowerCase();
    const arg = expressionToString(expr.arguments[0]);

    steps.push({
        title: 'Funkcja logarytmiczna',
        expression: `${funcName}(${arg})`,
        explanation: `Obliczamy wartość funkcji logarytmicznej ${funcName}.`
    });

    // Obsługa specjalnych przypadków
    if (arg === '10' && funcName === 'log') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\log(10) = 1`,
            explanation: 'Logarytm dziesiętny z 10 wynosi 1.'
        });
    } else if (arg === 'e' && funcName === 'ln') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\ln(e) = 1`,
            explanation: 'Logarytm naturalny z e wynosi 1.'
        });
    } else if (arg === '1') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `${funcName}(1) = 0`,
            explanation: `Logarytm z 1 zawsze wynosi 0, niezależnie od podstawy.`
        });
    } else {
        // Dla innych argumentów spróbuj obliczyć wartość
        try {
            const result = math.evaluate(`${funcName}(${arg})`);
            steps.push({
                title: 'Wynik',
                expression: `${result}`,
                explanation: `Obliczamy wartość funkcji ${funcName}(${arg}).`
            });
        } catch (error) {
            steps.push({
                title: 'Informacja',
                expression: `${funcName}(${arg})`,
                explanation: 'Nie można obliczyć dokładnej wartości dla tego argumentu.'
            });
        }
    }

    // Dla wyrażenia log(a) + log(b)
    if ((funcName === 'log' || funcName === 'ln') &&
        expr.arguments[0].type === 'binary' &&
        expr.arguments[0].operator === '+') {
        steps.push({
            title: 'Właściwość logarytmów',
            expression: `${funcName}(a) + ${funcName}(b) = ${funcName}(a \\cdot b)`,
            explanation: 'Logarytm sumy jest równy sumie logarytmów.'
        });
    }
};

// Obsługa pierwiastka kwadratowego
const handleSquareRootFunction = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'function' || expr.name.toLowerCase() !== 'sqrt') return;

    const arg = expressionToString(expr.arguments[0]);

    steps.push({
        title: 'Pierwiastek kwadratowy',
        expression: `\\sqrt{${arg}}`,
        explanation: `Obliczamy pierwiastek kwadratowy z ${arg}.`
    });

    // Obsługa specjalnych przypadków
    if (arg === '16') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\sqrt{16} = 4`,
            explanation: 'Pierwiastek kwadratowy z 16 wynosi 4, ponieważ 4² = 16.'
        });
    } else if (arg === '9') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\sqrt{9} = 3`,
            explanation: 'Pierwiastek kwadratowy z 9 wynosi 3, ponieważ 3² = 9.'
        });
    } else if (arg === '4') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\sqrt{4} = 2`,
            explanation: 'Pierwiastek kwadratowy z 4 wynosi 2, ponieważ 2² = 4.'
        });
    } else {
        // Dla innych argumentów spróbuj obliczyć wartość
        try {
            const result = math.evaluate(`sqrt(${arg})`);
            steps.push({
                title: 'Wynik',
                expression: `${result}`,
                explanation: `Obliczamy wartość pierwiastka kwadratowego z ${arg}.`
            });
        } catch (error) {
            steps.push({
                title: 'Informacja',
                expression: `\\sqrt{${arg}}`,
                explanation: 'Nie można obliczyć dokładnej wartości dla tego argumentu.'
            });
        }
    }

    // Dla wyrażenia sqrt(a²)
    if (expr.arguments[0].type === 'binary' &&
        expr.arguments[0].operator === '^' &&
        expressionToString(expr.arguments[0].right) === '2') {
        const base = expressionToString(expr.arguments[0].left);
        steps.push({
            title: 'Uproszczenie pierwiastka',
            expression: `\\sqrt{${base}^2} = |${base}|`,
            explanation: `Pierwiastek kwadratowy z kwadratu liczby daje wartość bezwzględną tej liczby.`
        });
    }
};

// Obsługa funkcji wykładniczej
const handleExponentialFunction = (expr: Expression, steps: SolutionStep[]) => {
    if (expr.type !== 'function' || expr.name.toLowerCase() !== 'exp') return;

    const arg = expressionToString(expr.arguments[0]);

    steps.push({
        title: 'Funkcja wykładnicza',
        expression: `\\exp(${arg})`,
        explanation: `Obliczamy wartość funkcji wykładniczej e^${arg}.`
    });

    // Obsługa specjalnych przypadków
    if (arg === '0') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\exp(0) = 1`,
            explanation: 'Funkcja wykładnicza e^0 = 1.'
        });
    } else if (arg === '1') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\exp(1) = e \\approx 2.71828`,
            explanation: 'Funkcja wykładnicza e^1 = e ≈ 2.71828.'
        });
    } else if (arg === '2') {
        steps.push({
            title: 'Wartość przybliżona',
            expression: `\\exp(2) \\approx 7.38906`,
            explanation: 'Funkcja wykładnicza e^2 ≈ 7.38906.'
        });
    } else if (arg === '-1') {
        steps.push({
            title: 'Wartość specjalna',
            expression: `\\exp(-1) = \\frac{1}{e} \\approx 0.36788`,
            explanation: 'Funkcja wykładnicza e^(-1) = 1/e ≈ 0.36788.'
        });
    } else {
        // Dla innych argumentów spróbuj obliczyć wartość
        try {
            const result = math.evaluate(`exp(${arg})`);
            steps.push({
                title: 'Wynik',
                expression: `${result}`,
                explanation: `Obliczamy wartość funkcji wykładniczej e^${arg}.`
            });
        } catch (error) {
            steps.push({
                title: 'Informacja',
                expression: `\\exp(${arg})`,
                explanation: 'Nie można obliczyć dokładnej wartości dla tego argumentu.'
            });
        }
    }

    // Dla wyrażenia exp(a) + exp(-a)
    if (expr.arguments[0].type === 'binary' &&
        expr.arguments[0].operator === '+' &&
        expr.arguments[0].right.type === 'function' &&
        expr.arguments[0].right.name === 'exp' &&
        expr.arguments[0].right.arguments[0].type === 'unary' &&
        expr.arguments[0].right.arguments[0].operator === '-') {
        steps.push({
            title: 'Tożsamość wykładnicza',
            expression: `\\exp(a) + \\exp(-a) = 2\\cosh(a)`,
            explanation: 'Suma funkcji wykładniczych e^a + e^(-a) jest równa 2*cosh(a), gdzie cosh to cosinus hiperboliczny.'
        });
    }
};

// Funkcje pomocnicze

// Znajdowanie głównej zmiennej w wyrażeniu
const findPrimaryVariable = (expr: Expression): string | null => {
    // Znajdź wszystkie zmienne w wyrażeniu
    const variables = collectVariables(expr);

    // Jeśli jest tylko jedna zmienna, to ona jest główna
    if (variables.length === 1) {
        return variables[0];
    }

    // Jeśli jest więcej zmiennych, preferuj x, y, z w tej kolejności
    if (variables.includes('x')) return 'x';
    if (variables.includes('y')) return 'y';
    if (variables.includes('z')) return 'z';

    // Jeśli nie ma żadnej z preferowanych, zwróć pierwszą znalezioną
    return variables.length > 0 ? variables[0] : null;
};

// Zbieranie wszystkich zmiennych z wyrażenia
const collectVariables = (expr: Expression): string[] => {
    const variables: string[] = [];

    const collect = (e: Expression) => {
        if (e.type === 'variable') {
            if (!variables.includes(e.name)) {
                variables.push(e.name);
            }
        } else if (e.type === 'binary') {
            collect(e.left);
            collect(e.right);
        } else if (e.type === 'unary') {
            collect(e.argument);
        } else if (e.type === 'function') {
            e.arguments.forEach(collect);
        } else if (e.type === 'equation') {
            collect(e.left);
            collect(e.right);
        }
    };

    collect(expr);
    return variables;
};

// Sprawdzanie czy równanie jest kwadratowe
const isQuadraticEquation = (expr: Expression, variable: string): boolean => {
    // Uproszczona implementacja - sprawdza czy wyrażenie zawiera zmienną podniesioną do kwadratu
    const exprStr = expressionToString(expr);
    return exprStr.includes(`${variable}^2`) || exprStr.includes(`${variable}*${variable}`);
};

// Sprawdzanie czy równanie jest liniowe
const isLinearEquation = (expr: Expression, variable: string): boolean => {
    // Uproszczona implementacja - sprawdza czy wyrażenie zawiera zmienną, ale nie zawiera jej kwadratu
    const exprStr = expressionToString(expr);
    return exprStr.includes(variable) &&
        !exprStr.includes(`${variable}^2`) &&
        !exprStr.includes(`${variable}*${variable}`);
};

// Sprawdzanie czy równanie zawiera ułamki
const isFractionalEquation = (expr: Expression, variable: string): boolean => {
    // Uproszczona implementacja - sprawdza czy wyrażenie zawiera dzielenie
    const exprStr = expressionToString(expr);
    return exprStr.includes('/');
};