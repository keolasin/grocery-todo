/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';

function Navbar(props) {
    // styling
    const theme = useTheme();
    const style = css({
        label: 'nav',
        gridArea: 'nav',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
    });
    
    // apollo login handling
    const client = useApolloClient();
    const authToken = localStorage.getItem('token');
    
    return (
        <nav css={style}>
            <Link to='/'>
                <h1>Grab and Grocer</h1>
            </Link>
            {authToken ? (
                <button onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                    props.history.push('/');
                }}>
                    Logout
                </button>
            ) : (
                <Link to='/login'>
                    Login
                </Link>
            )}
        </nav>
    );
}

export default withRouter(Navbar);