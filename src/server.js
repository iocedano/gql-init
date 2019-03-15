import { ApolloServer } from 'apollo-server';
import { loadTypeSchema, loadTypeResolvers } from './utils/schema';
import DataSources from './datasource';

const TYPES = ['jobs'];

export const start = async () => {
  const rootSchema = `
    schema {
      query: Query
    }
  `;
  const schemaTypes = await Promise.all(TYPES.map(loadTypeSchema));

  console.log(loadTypeResolvers(TYPES));

  const server = new ApolloServer({
    typeDefs: [rootSchema, schemaTypes[0]],
    resolvers: loadTypeResolvers(TYPES),
    dataSources: () => {
      return DataSources;
    },
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null };
    }
  });

  const { url } = await server.listen({ port: 3000 });

  console.log(`GQL server ready at ${url}`);
};
