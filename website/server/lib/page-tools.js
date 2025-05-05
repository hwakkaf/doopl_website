import pkg from '@apollo/client';
import fetch from 'cross-fetch';

const { ApolloClient, InMemoryCache, HttpLink, gql } = pkg;
// Configure the Apollo Client
export const gqlClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.CMS_GQL_URL, // 👈 Replace with your GraphQL URL
    fetch,
    headers: {
        Authorization: `Bearer ${process.env.CMS_API_KEY}`,
      },
  
  }),
  cache: new InMemoryCache(),
});

export async function getData(gqlStatement) {
    return gqlClient.query({gqlStatement})
}

export { baseData } from './cache-base-data.js';
//export gql;