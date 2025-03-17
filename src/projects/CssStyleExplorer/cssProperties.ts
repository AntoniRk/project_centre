import { CssProperty } from './types';

export const cssProperties: CssProperty[] = [
    // Właściwości związane z układem (Layout)
    {
        name: 'display',
        label: 'Wyświetlanie',
        category: 'layout',
        type: 'select',
        options: [
            { label: 'Blok', value: 'block' },
            { label: 'Inline', value: 'inline' },
            { label: 'Flex', value: 'flex' },
            { label: 'Grid', value: 'grid' },
            { label: 'Inline-block', value: 'inline-block' },
            { label: 'Ukryty', value: 'none' }
        ]
    },
    {
        name: 'position',
        label: 'Pozycja',
        category: 'layout',
        type: 'select',
        options: [
            { label: 'Statyczna', value: 'static' },
            { label: 'Relatywna', value: 'relative' },
            { label: 'Absolutna', value: 'absolute' },
            { label: 'Stała', value: 'fixed' },
            { label: 'Lepka', value: 'sticky' }
        ]
    },
    {
        name: 'width',
        label: 'Szerokość',
        category: 'layout',
        type: 'text',
        placeholder: 'np. 200px, 50%, auto'
    },
    {
        name: 'height',
        label: 'Wysokość',
        category: 'layout',
        type: 'text',
        placeholder: 'np. 100px, 50%, auto'
    },
    {
        name: 'margin',
        label: 'Margines',
        category: 'layout',
        type: 'text',
        placeholder: 'np. 10px, 5px 10px 15px 20px'
    },
    {
        name: 'padding',
        label: 'Wypełnienie',
        category: 'layout',
        type: 'text',
        placeholder: 'np. 10px, 5px 10px 15px 20px'
    },
    {
        name: 'z-index',
        label: 'Indeks Z',
        category: 'layout',
        type: 'range',
        min: -10,
        max: 10,
        step: 1,
        defaultValue: 0
    },

    // Właściwości związane z Flexbox
    {
        name: 'flex-direction',
        label: 'Kierunek Flex',
        category: 'flexbox',
        type: 'select',
        options: [
            { label: 'Wiersz', value: 'row' },
            { label: 'Kolumna', value: 'column' },
            { label: 'Wiersz odwrócony', value: 'row-reverse' },
            { label: 'Kolumna odwrócona', value: 'column-reverse' }
        ]
    },
    {
        name: 'justify-content',
        label: 'Wyrównanie w osi głównej',
        category: 'flexbox',
        type: 'select',
        options: [
            { label: 'Początek', value: 'flex-start' },
            { label: 'Koniec', value: 'flex-end' },
            { label: 'Środek', value: 'center' },
            { label: 'Przestrzeń między', value: 'space-between' },
            { label: 'Przestrzeń wokół', value: 'space-around' },
            { label: 'Przestrzeń równa', value: 'space-evenly' }
        ]
    },
    {
        name: 'align-items',
        label: 'Wyrównanie w osi poprzecznej',
        category: 'flexbox',
        type: 'select',
        options: [
            { label: 'Początek', value: 'flex-start' },
            { label: 'Koniec', value: 'flex-end' },
            { label: 'Środek', value: 'center' },
            { label: 'Rozciągnięte', value: 'stretch' },
            { label: 'Linia bazowa', value: 'baseline' }
        ]
    },
    {
        name: 'flex-wrap',
        label: 'Zawijanie Flex',
        category: 'flexbox',
        type: 'select',
        options: [
            { label: 'Bez zawijania', value: 'nowrap' },
            { label: 'Zawijanie', value: 'wrap' },
            { label: 'Zawijanie odwrócone', value: 'wrap-reverse' }
        ]
    },
    {
        name: 'gap',
        label: 'Odstęp',
        category: 'flexbox',
        type: 'text',
        placeholder: 'np. 10px, 1rem'
    },

    // Właściwości związane z tekstem
    {
        name: 'color',
        label: 'Kolor tekstu',
        category: 'text',
        type: 'color',
        placeholder: 'np. #000000, rgb(0,0,0)'
    },
    {
        name: 'font-family',
        label: 'Rodzina czcionek',
        category: 'text',
        type: 'dropdown',
        options: [
            { label: 'Arial', value: 'Arial, sans-serif' },
            { label: 'Helvetica', value: 'Helvetica, sans-serif' },
            { label: 'Times New Roman', value: 'Times New Roman, serif' },
            { label: 'Georgia', value: 'Georgia, serif' },
            { label: 'Courier New', value: 'Courier New, monospace' },
            { label: 'Verdana', value: 'Verdana, sans-serif' }
        ]
    },
    {
        name: 'font-size',
        label: 'Rozmiar czcionki',
        category: 'text',
        type: 'range',
        min: 8,
        max: 72,
        step: 1,
        defaultValue: 16,
        unit: 'px'
    },
    {
        name: 'font-weight',
        label: 'Grubość czcionki',
        category: 'text',
        type: 'dropdown',
        options: [
            { label: 'Normalna', value: 'normal' },
            { label: 'Pogrubiona', value: 'bold' },
            { label: 'Lżejsza', value: 'lighter' },
            { label: 'Grubsza', value: 'bolder' },
            { label: '100', value: '100' },
            { label: '200', value: '200' },
            { label: '300', value: '300' },
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
            { label: '800', value: '800' },
            { label: '900', value: '900' }
        ]
    },
    {
        name: 'text-align',
        label: 'Wyrównanie tekstu',
        category: 'text',
        type: 'select',
        options: [
            { label: 'Do lewej', value: 'left' },
            { label: 'Do prawej', value: 'right' },
            { label: 'Do środka', value: 'center' },
            { label: 'Justowanie', value: 'justify' }
        ]
    },
    {
        name: 'text-decoration',
        label: 'Dekoracja tekstu',
        category: 'text',
        type: 'select',
        options: [
            { label: 'Brak', value: 'none' },
            { label: 'Podkreślenie', value: 'underline' },
            { label: 'Nadkreślenie', value: 'overline' },
            { label: 'Przekreślenie', value: 'line-through' }
        ]
    },
    {
        name: 'line-height',
        label: 'Wysokość linii',
        category: 'text',
        type: 'range',
        min: 0.5,
        max: 3,
        step: 0.1,
        defaultValue: 1.2
    },
    {
        name: 'letter-spacing',
        label: 'Odstęp między literami',
        category: 'text',
        type: 'range',
        min: -5,
        max: 20,
        step: 0.5,
        defaultValue: 0,
        unit: 'px'
    },

    // Właściwości związane z tłem
    {
        name: 'background-color',
        label: 'Kolor tła',
        category: 'background',
        type: 'color',
        placeholder: 'np. #ffffff, rgb(255,255,255)'
    },
    {
        name: 'background-image',
        label: 'Obraz tła',
        category: 'background',
        type: 'text',
        placeholder: 'np. url(image.jpg)'
    },
    {
        name: 'background-size',
        label: 'Rozmiar tła',
        category: 'background',
        type: 'select',
        options: [
            { label: 'Automatyczny', value: 'auto' },
            { label: 'Pokrycie', value: 'cover' },
            { label: 'Zawieranie', value: 'contain' }
        ]
    },
    {
        name: 'background-position',
        label: 'Pozycja tła',
        category: 'background',
        type: 'dropdown',
        options: [
            { label: 'Lewy górny', value: 'left top' },
            { label: 'Lewy środkowy', value: 'left center' },
            { label: 'Lewy dolny', value: 'left bottom' },
            { label: 'Prawy górny', value: 'right top' },
            { label: 'Prawy środkowy', value: 'right center' },
            { label: 'Prawy dolny', value: 'right bottom' },
            { label: 'Środkowy górny', value: 'center top' },
            { label: 'Środek', value: 'center center' },
            { label: 'Środkowy dolny', value: 'center bottom' }
        ]
    },
    {
        name: 'background-repeat',
        label: 'Powtarzanie tła',
        category: 'background',
        type: 'select',
        options: [
            { label: 'Powtarzaj', value: 'repeat' },
            { label: 'Powtarzaj X', value: 'repeat-x' },
            { label: 'Powtarzaj Y', value: 'repeat-y' },
            { label: 'Bez powtarzania', value: 'no-repeat' }
        ]
    },

    // Właściwości związane z ramką
    {
        name: 'border-style',
        label: 'Styl ramki',
        category: 'border',
        type: 'select',
        options: [
            { label: 'Brak', value: 'none' },
            { label: 'Ciągła', value: 'solid' },
            { label: 'Kropkowana', value: 'dotted' },
            { label: 'Kreskowana', value: 'dashed' },
            { label: 'Podwójna', value: 'double' },
            { label: 'Wklęsła', value: 'groove' },
            { label: 'Wypukła', value: 'ridge' },
            { label: 'Wstawiona', value: 'inset' },
            { label: 'Osadzona', value: 'outset' }
        ]
    },
    {
        name: 'border-width',
        label: 'Szerokość ramki',
        category: 'border',
        type: 'range',
        min: 0,
        max: 20,
        step: 1,
        defaultValue: 1,
        unit: 'px'
    },
    {
        name: 'border-color',
        label: 'Kolor ramki',
        category: 'border',
        type: 'color',
        placeholder: 'np. #000000, rgb(0,0,0)'
    },
    {
        name: 'border-radius',
        label: 'Zaokrąglenie ramki',
        category: 'border',
        type: 'range',
        min: 0,
        max: 50,
        step: 1,
        defaultValue: 0,
        unit: 'px'
    },

    // Właściwości związane z transformacjami
    {
        name: 'transform',
        label: 'Transformacja',
        category: 'transform',
        type: 'text',
        placeholder: 'np. rotate(45deg), scale(1.5)'
    },
    {
        name: 'transform-origin',
        label: 'Punkt odniesienia transformacji',
        category: 'transform',
        type: 'dropdown',
        options: [
            { label: 'Lewy górny', value: 'left top' },
            { label: 'Lewy środkowy', value: 'left center' },
            { label: 'Lewy dolny', value: 'left bottom' },
            { label: 'Prawy górny', value: 'right top' },
            { label: 'Prawy środkowy', value: 'right center' },
            { label: 'Prawy dolny', value: 'right bottom' },
            { label: 'Środkowy górny', value: 'center top' },
            { label: 'Środek', value: 'center center' },
            { label: 'Środkowy dolny', value: 'center bottom' }
        ]
    },

    // Właściwości związane z efektami
    {
        name: 'opacity',
        label: 'Przezroczystość',
        category: 'effects',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 1
    },
    {
        name: 'box-shadow',
        label: 'Cień',
        category: 'effects',
        type: 'text',
        placeholder: 'np. 2px 2px 5px rgba(0,0,0,0.3)'
    },
    {
        name: 'text-shadow',
        label: 'Cień tekstu',
        category: 'effects',
        type: 'text',
        placeholder: 'np. 1px 1px 2px rgba(0,0,0,0.5)'
    },
    {
        name: 'filter',
        label: 'Filtr',
        category: 'effects',
        type: 'text',
        placeholder: 'np. blur(5px), brightness(150%)'
    },

    // Właściwości związane z przejściami
    {
        name: 'transition',
        label: 'Przejście',
        category: 'animation',
        type: 'text',
        placeholder: 'np. all 0.3s ease'
    },
    {
        name: 'animation',
        label: 'Animacja',
        category: 'animation',
        type: 'text',
        placeholder: 'np. myAnimation 2s infinite'
    }
];