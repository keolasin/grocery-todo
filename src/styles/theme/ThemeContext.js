import React, { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import theme from './theme';

const defaultContext = {
    dark: false,
    toggle: () => {}
};

// creating React Context for use throughout App
const ThemeContext = createContext(defaultContext);
const useTheme = () => useContext(ThemeContext);

const useEffectDarkMode = () => { // custom useEffect hook for mounting theme
    // set state
    const [themeState, setThemeState] = useState({
        dark: false,
        hasThemeLoaded: false
    });
    
    // hook
    useEffect(() => {
        const localDark = localStorage.getItem('dark') === 'true'; // retrieve dark/light from localStorage
        setThemeState( {...themeState, dark: localDark, hasThemeLoaded: true } ); // set themeState once loaded
    }, []) // second argument is empty array, causes callback fxn to only trigger on mounting, not subsequent re-renders
    return [themeState, setThemeState];
};

// defining new ThemeProvider, exported and used in ../index.js to wrap our App component
const ThemeProvider = ( {children} ) => {
    const [themeState, setThemeState] = useEffectDarkMode();
    if(!themeState.hasThemeLoaded){
        return <div />; // while loading, ensure other mode is not triggered/used, so return blank div
    }

    const toggle = () => {
        const dark = !themeState.dark;
        localStorage.setItem('dark', JSON.stringify(dark));
        setThemeState( {...themeState, dark} );
    };

    const computedTheme = themeState.dark ? theme('dark') : theme('light');

    return (
        <EmotionThemeProvider theme={computedTheme}>
            <ThemeContext.Provider 
                value={{
                    dark: themeState.dark,
                    toggle: toggle,
                    ...computedTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        </EmotionThemeProvider>
    )
}

export { ThemeProvider, useTheme };