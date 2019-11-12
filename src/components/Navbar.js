import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';

const navStyle={
    display: 'flex',
    alignItems: 'center',
}

function Navbar(props) {
    const client = useApolloClient();
    const authToken = localStorage.getItem('token');;
    
    return (
        <nav style={navStyle}>
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