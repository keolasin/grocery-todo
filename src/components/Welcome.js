/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

function Welcome(props){
    // styling
    const theme = useTheme();
    const style = css({
        label: 'landing-splash',
        gridArea: 'main'
    })
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