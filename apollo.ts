import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat, Operation, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';
import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  }
  return '';
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      'X-JWT': getToken(),
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://52.78.76.186:4000/graphql',
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      'X-JWT': getToken(),
    },
    reconnect: true,
  },
  uri: 'ws://52.78.76.186:4000/subscription',
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
