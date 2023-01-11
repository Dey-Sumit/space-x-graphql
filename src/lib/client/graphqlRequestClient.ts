import { GraphQLClient } from "graphql-request";

const graphqlRequestClient = new GraphQLClient("https://api.spacex.land/graphql");

export default graphqlRequestClient;
