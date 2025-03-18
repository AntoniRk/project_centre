// Bazowy typ dla wyrażeń matematycznych
export type ExpressionType = 
  | 'number'
  | 'variable'
  | 'binary'
  | 'unary'
  | 'function'
  | 'equation';

// Interfejs bazowy dla wszystkich wyrażeń
export interface BaseExpression {
  type: ExpressionType;
}

// Wyrażenie liczbowe
export interface NumberExpression extends BaseExpression {
  type: 'number';
  value: number;
}

// Wyrażenie zmiennej
export interface VariableExpression extends BaseExpression {
  type: 'variable';
  name: string;
}

// Wyrażenie operacji binarnej (np. a + b)
export interface BinaryExpression extends BaseExpression {
  type: 'binary';
  operator: '+' | '-' | '*' | '/' | '^' | '=';
  left: Expression;
  right: Expression;
}

// Wyrażenie operacji unarnej (np. -a)
export interface UnaryExpression extends BaseExpression {
  type: 'unary';
  operator: '+' | '-';
  argument: Expression;
}

// Wyrażenie funkcji (np. sin(x))
export interface FunctionExpression extends BaseExpression {
  type: 'function';
  name: string;
  arguments: Expression[];
}

// Wyrażenie równania (np. a = b)
export interface EquationExpression extends BaseExpression {
  type: 'equation';
  left: Expression;
  right: Expression;
}

// Typ unii dla wszystkich wyrażeń
export type Expression =
  | NumberExpression
  | VariableExpression
  | BinaryExpression
  | UnaryExpression
  | FunctionExpression
  | EquationExpression;

// Krok rozwiązania
export interface SolutionStep {
  title: string;         // Tytuł kroku
  expression: string;    // Wyrażenie matematyczne w LaTeX
  explanation: string;   // Wyjaśnienie kroku
  rule?: string;         // Zastosowana reguła matematyczna
}