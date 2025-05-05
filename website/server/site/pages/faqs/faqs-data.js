import pkg from '@apollo/client';
import fetch from 'cross-fetch';

const { ApolloClient, InMemoryCache, HttpLink, gql } = pkg;

export default gql`
    query {
        pageFaq {
            title
            introduction
        }
        categories {
            name
            slug
            description
            faqs {
                answer
                question
            }
        }
    }
  `