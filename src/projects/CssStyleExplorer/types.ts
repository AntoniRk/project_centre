export interface CssValue {
    label: string;
    value: string;
}

export interface CssProperty {
    name: string;
    label: string;
    category: string;
    type: 'text' | 'select' | 'range' | 'color' | 'dropdown';
    options?: CssValue[];
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    placeholder?: string;
}