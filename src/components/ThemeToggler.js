import React from 'react';

// styling
import { useTheme } from '../styles/theme/ThemeContext';

function ThemeToggler(){
    const themeState = useTheme();

    return (
        <button onClick={() => themeState.toggle()}>
            {themeState.dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
    );
}

export default ThemeToggler;