import { Expression, NumberExpression, VariableExpression, BinaryExpression, FunctionExpression } from '../types';
import * as math from 'mathjs';

// Funkcja parsująca wyrażenie matematyczne z obsługą wszystkich potrzebnych operacji
export const parseExpression = (input: string): Expression => {
  try {
    // Preprocessing wyrażenia
    let processedInput = preprocessExpression(input);
    
    // Sprawdź, czy to równanie (zawiera znak =)
    if (processedInput.includes('=')) {
      const [leftSide, rightSide] = processedInput.split('=').map(part => part.trim());
      
      // Parsuj lewą i prawą stronę równania osobno
      const leftExpr = parseSingleExpression(leftSide);
      const rightExpr = parseSingleExpression(rightSide);
      
      return {
        type: 'equation',
        left: leftExpr,
        right: rightExpr
      };
    }
    
    // Jeśli to nie równanie, parsuj jako pojedyncze wyrażenie
    return parseSingleExpression(processedInput);
  } catch (error) {
    throw new Error(`Nie można przetworzyć wyrażenia: ${(error as Error).message}`);
  }
};

// Funkcja do preprocessingu wyrażenia
export const preprocessExpression = (input: string): string => {
  let result = input;
  
  // Zamień 2x na 2*x, ale tylko jeśli 2 i x nie są częścią większej liczby/zmiennej
  result = result.replace(/(\d)([a-zA-Z])/g, '$1*$2');
  
  // Zamień pi na Math.PI
  result = result.replace(/\bpi\b/g, 'PI');
  
  // Zamień specjalne stałe
  result = result.replace(/\binf\b/g, 'Infinity');
  
  return result;
};

// Funkcja do parsowania pojedynczego wyrażenia
const parseSingleExpression = (input: string): Expression => {
  try {
    // Użyj mathjs do parsowania wyrażenia
    const parsed = math.parse(input);
    return convertMathNode(parsed);
  } catch (error) {
    console.error("Błąd parsowania:", error);
    throw new Error(`Błąd parsowania wyrażenia "${input}": ${(error as Error).message}`);
  }
};

// Konwersja węzła mathjs na nasz własny format wyrażenia
const convertMathNode = (node: math.MathNode): Expression => {
  switch (node.type) {
    case 'ConstantNode':
      return {
        type: 'number',
        value: (node as any).value
      } as NumberExpression;
      
    case 'SymbolNode':
      return {
        type: 'variable',
        name: (node as any).name
      } as VariableExpression;
      
    case 'OperatorNode':
      const opNode = node as any;
      
      if (opNode.args.length === 2) {
        return {
          type: 'binary',
          operator: opNode.op as '+' | '-' | '*' | '/' | '^' | '=',
          left: convertMathNode(opNode.args[0]),
          right: convertMathNode(opNode.args[1])
        } as BinaryExpression;
      } else if (opNode.args.length === 1) {
        return {
          type: 'unary',
          operator: opNode.op as '+' | '-',
          argument: convertMathNode(opNode.args[0])
        };
      }
      throw new Error(`Nieobsługiwany operator: ${opNode.op}`);
      
    case 'FunctionNode':
      const funcNode = node as any;
      return {
        type: 'function',
        name: funcNode.fn.name,
        arguments: funcNode.args.map(convertMathNode)
      } as FunctionExpression;
      
    case 'ParenthesisNode':
      return convertMathNode((node as any).content);
      
    case 'AssignmentNode':
    case 'RelationalNode':
      const relNode = node as any;
      return {
        type: 'equation',
        left: convertMathNode(relNode.params[0]),
        right: convertMathNode(relNode.params[1])
      };
      
    default:
      throw new Error(`Nieobsługiwany typ węzła: ${node.type}`);
  }
};

// Konwersja naszego wyrażenia na format LaTeX
export const expressionToLatex = (expr: Expression): string => {
  try {
    const mathJsExpr = math.parse(expressionToString(expr));
    return mathJsExpr.toTex({
      parenthesis: 'keep',
      implicit: 'show'
    });
  } catch (error) {
    console.error('Błąd konwersji do LaTeX:', error);
    return expressionToString(expr);
  }
};

// Konwersja naszego wyrażenia na string
export const expressionToString = (expr: Expression): string => {
  switch (expr.type) {
    case 'number':
      return expr.value.toString();
      
    case 'variable':
      return expr.name;
      
    case 'binary':
      return `(${expressionToString(expr.left)} ${expr.operator} ${expressionToString(expr.right)})`;
      
    case 'unary':
      return `${expr.operator}(${expressionToString(expr.argument)})`;
      
    case 'function':
      const args = expr.arguments.map(expressionToString).join(', ');
      return `${expr.name}(${args})`;
      
    case 'equation':
      return `${expressionToString(expr.left)} = ${expressionToString(expr.right)}`;
      
    default:
      return '';
  }
};

// Funkcja do ewaluacji wyrażenia
export const evaluateExpression = (expr: Expression): number | string => {
  try {
    const exprString = expressionToString(expr);
    return math.evaluate(exprString);
  } catch (error) {
    console.error('Błąd ewaluacji:', error);
    return 'Nie można obliczyć';
  }
};