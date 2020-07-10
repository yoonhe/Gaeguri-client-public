import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();

const authMiddleware = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'X-JWT': token || null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://35.193.13.247:4000/graphql',
});

const wsLink = new WebSocketLink({
  options: {
    reconnect: true,
  },
  uri: 'ws://35.193.13.247:4000/subscription',
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, concat(authMiddleware, combinedLinks)]),
});

export default client;
