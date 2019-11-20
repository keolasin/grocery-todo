/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';

function ThemeToggler(){
    
    const themeState = useTheme();
    
    const style = css`
        grid-area: toggle;
    `;

    return (
        <button css={style} onClick={() => themeState.toggle()}>
            {themeState.dark ? "Switch to light mode" : "Switch to dark mode"}
        </button>
    );
}

export default ThemeToggler;