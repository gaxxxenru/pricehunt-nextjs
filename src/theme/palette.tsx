export interface Palette {
    alternate: {
        main: string,
        dark: string,
    },
    cardShadow: string,
    mode: 'light' | 'dark',
    primary: {
        main: string,
        light: string,
        dark: string,
        contrastText: string,
    },
    secondary: {
        light: string,
        main: string,
        dark: string,
        contrastText: string,
    },
    text: {
        primary: string,
        secondary: string,
    },
    divider: string,
    background: {
        paper: string,
        box: string,
        default: string,
        level2: string,
        level1: string,
    }
};

export const light: Palette = {
    alternate: {
        main: '#f7faff',
        dark: '#edf1f7',
    },
    cardShadow: 'rgba(23, 70, 161, .11)',
    mode: 'light',
    primary: {
        main: '#212121',
        light: '#535353',
        dark: '#181818',
        contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
        light: '#B9A2FF',
        main: '#8673E0',
        dark: '#5447AD',
        contrastText: 'rgba(255,255,255,0.87)',
    },
    text: {
        primary: 'rgba(255,255,255,0.87)',
        secondary: 'rgba(255,255,255,0.70)',
    },
    divider: 'rgba(255, 255, 255, 0.52)',
    background: {
        paper: '#181818',
        box: '#181818',
        default: '#181818',
        level2: '#f5f5f5',
        level1: '#ffffff',
    }
};

export const dark: Palette = {
    alternate: {
        main: '#f7faff',
        dark: '#edf1f7',
    },
    cardShadow: 'rgba(23, 70, 161, .11)',
    mode: 'light',
    primary: {
        main: '#212121',
        light: '#535353',
        dark: '#181818',
        contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
        light: '#B9A2FF',
        main: '#8673E0',
        dark: '#5447AD',
        contrastText: 'rgba(255,255,255,0.87)',
    },
    text: {
        primary: 'rgba(255,255,255,0.87)',
        secondary: 'rgba(255,255,255,0.70)',
    },
    divider: 'rgba(255, 255, 255, 0.13)',
    background: {
        paper: '#181818',
        box: '#181818',
        default: '#181818',
        level2: '#f5f5f5',
        level1: '#ffffff',
    }
};
