/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';

function ThemeToggler(){
    
    const theme = useTheme();
    
    const style = css`
        grid-area: toggle;
        position: relative;
        width: 60px;
        height: 34px;
        margin: 5px;
        justify-self: right;
        input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${theme.text};
            -webkit-transition: .4s;
            transition: .4s;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: ${theme.background};
            -webkit-transition: .4s;
            transition: .4s;
        }
        input:checked + .slider {
            background-color: ${theme.body};
        }

        input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
            -webkit-transform: translateX(24px);
            -ms-transform: translateX(24px);
            transform: translateX(24px);
        }
        
    `;

    return (
        <label css={style}>
            <input type='checkbox' onClick={() => theme.toggle()} />
            <span className='slider'></span>
        </label>
    );
}

export default ThemeToggler;