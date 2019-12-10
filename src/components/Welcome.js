/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';

function Welcome(props){
    // styling
    const theme = useTheme();
    const style = css`
        label: landing;
        grid-area: main;
        min-width: 1fr;
        overflow: auto;
        margin-left: 5px;
        ::-webkit-scrollbar {
            width: 10px;
            margin: 1px;
        }
        ::-webkit-scrollbar-track {
            background: ${theme.background};
        }
        ::-webkit-scrollbar-thumb {
            background: ${theme.body};
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: ${theme.hover};
        }
    `;

    return (
        <main css={style}>
            <h2>Welcome!</h2>
            <p>This is a simple to-do app built by me, Matthew Reyes, using React Apollo for the front-end, and NodeJS with Prisma on the back-end, in an effort to learn more about graphQL</p>
            <a href='https://github.com/users/keolasin/projects/1'>Github</a>
            <p>Future tasks:</p>
            <ul>
                <li>Add authorization features (edit own groups, access to private groups, etc.)</li>
                <li>Replace frequent server polling with subscriptions</li>
                <li>Add pagination features (lazy load data, load additional on list scroll)</li>
                <li>Add list sorting features</li>
            </ul>
            
            
        </main>
    )
}

export default Welcome;