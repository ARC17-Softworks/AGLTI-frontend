import React, { StrictMode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <StrictMode>
      <ColorModeScript />
      <App />
    </StrictMode>
  </ApolloProvider>
);
