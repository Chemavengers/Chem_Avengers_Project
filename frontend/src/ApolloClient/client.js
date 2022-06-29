import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
  } from "@apollo/client";
  import { setContext } from '@apollo/client/link/context';
// import { RestLink } from "apollo-link-rest";

// replace this line with uri from heroku... using a react env variable
const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  const autherization = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('Authorization');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

export const client = new ApolloClient({
    link: autherization.concat(httpLink),
    cache: new InMemoryCache(),
  });