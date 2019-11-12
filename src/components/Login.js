import React, { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';

// graphQL queries/mutations/subscriptions
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../graphQL/Mutations';

function Login(props){
    // access apollo client to cache login session
    const client = useApolloClient();

    // state
    const [ login, setLogin] = useState(false);
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");

    // query hooks
    const [authentication, { loading, error }] = useMutation( 
        login ? LOGIN_MUTATION : SIGNUP_MUTATION, // first argument is the mutation request to the backend API (login or signup)
        { // second argument is a function to be run on completion of the request using the response data
            onCompleted( data ) {
                const token = login ? data.login.token : data.signup.token; // use token from appropriate mutation response
                localStorage.setItem('token', token); // set token in local storage *NOT BEST PRACTICE*
                client.writeData({ data: { isLoggedIn: true } }); // direct write to client cache, set isLoggedIn after successful login
                props.history.push('/'); // redirect to home page
            }
        }
    );

    // onSubmit handler
    let onSubmit = (event) => {
        authentication( {variables: { email: email, password: password, name: name} } );
        event.preventDefault();
    }

    // loading & error view
    if (loading) {
        return <p>Loading...</p>
    };
    if (error) {
        return <p>Error! {error.message}</p>
    };

    return(
        <article>
            <h4>{login ? 'Login' : 'Sign Up'}</h4>
            <form onSubmit={onSubmit}>
                {!login && (
                    <input 
                        value={name}
                        type='text'
                        placeholder='Create a username'
                        onChange={event => setName(event.target.value)}
                        autoFocus
                        required
                    />
                )}
                <input 
                    value={email}
                    type='text'
                    placeholder='Add an email'
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <input 
                    value={password}
                    type='password'
                    placeholder='Create a password'
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <section>
                    <button type='submit'>
                        {login ? 'Login' : 'Sign up'}
                    </button>
                    <button onClick={(event)=> setLogin(!login)}>
                        {login ? 'Create new account' : 'Returning user'}
                    </button>
                </section>
            </form>
        </article>
    );
}

export default Login;
