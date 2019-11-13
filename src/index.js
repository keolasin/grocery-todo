import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// theme/styling
import { ThemeProvider } from './styles/theme/ThemeContext';
import './styles/index.css';

// apollo/graphql modules
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// connect our apolloClient with the graphQL API
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_APOLLO_URL || 'http://localhost:4000' // server running on designated URL or localhost:4000 (dev)
});

// authentication
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return headers to context for httpLink to read
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '', // return the token if authenticated, empty otherwise
        }
    }
});

// create cache
const cache = new InMemoryCache();

// create client using cache, httpLink and authLink
const client = new ApolloClient({ // instantiate our ApolloClient using httpLink and cache
    link: authLink.concat(httpLink),
    cache
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token')
    }
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
