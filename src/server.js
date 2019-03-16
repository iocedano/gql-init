import { ApolloServer } from 'apollo-server';
import { loadTypeSchema, loadTypeResolvers } from './utils/schema';
import DataSources from './datasources';

const TYPES = ['jobs'];

export const start = async () => {
  const rootSchema = `
    schema {
      query: Query
    }
  `;

  const schemaTypes = await Promise.all(TYPES.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, schemaTypes[0]],
    resolvers: loadTypeResolvers(TYPES),
    dataSources: () => DataSources
  });

  const { url } = await server.listen({ port: 3000 });

  console.log(`GQL server ready at ${url}`);
};
