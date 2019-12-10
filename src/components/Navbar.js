/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';

function Navbar(props) {
    // styling
    const theme = useTheme();
    const style = css`
        label: nav;
        grid-area: nav;
        display: grid;
        grid-template-columns: 2fr 1fr;
        justify-items: left;
        align-items: center;
        text-align: center;
        a {
            border: 1px solid ${theme.accent};
            border-radius: 5px;
            padding: 5px;
        }
        
        .login {
            justify-self: right;
        }
    `;
    
    // apollo login handling
    const client = useApolloClient();
    const authToken = localStorage.getItem('token');
    
    return (
        <nav css={style}>
            <Link to='/'>
                <h1>Grab&Grocer</h1>
            </Link>
            {authToken ? (
                <a className='login' onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                    props.history.push('/');
                }}>
                    <h2>Logout</h2>
                </a>
            ) : (
                <Link className='login' to='/login'>
                    <h2>Login</h2>
                </Link>
            )}
        </nav>
    );
}

export default withRouter(Navbar);