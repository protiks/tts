import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter } from 'react-router-dom';
require('dotenv').config()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
})
const authLink = setContext((_, { headers }) => {
  let token = process.env.REACT_APP_API_KEY
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

