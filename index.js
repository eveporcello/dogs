const { ApolloServer, gql } = require("apollo-server");
const {
  buildFederatedSchema
} = require("@apollo/federation");
const dogs = require("./dogs.json");

const typeDefs = gql`
  type Dog {
    id: ID!
    name: String!
    weight: Float!
    photo: Photo!
  }

  type Photo {
    full: String!
    thumb: String!
  }

  type Query {
    allDogs: [Dog!]!
    dogCount: Int!
  }
`;
const resolvers = {
  Query: {
    allDogs: () => dogs,
    dogCount: () => dogs.length
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ port }) => {
  console.log(`🐶 Dog Service running at ${port}`);
});
