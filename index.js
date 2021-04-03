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

server.listen(4002).then(({ url }) => {
  console.log(`🐶 Dog Service running at ${url}`);
});
