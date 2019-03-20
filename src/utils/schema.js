import fs from 'fs';
import path from 'path';
const _ = require('lodash');

export const loadTypeSchema = type =>
  new Promise((resolve, reject) => {
    const pathToSchema = path.join(
      process.cwd(),
      `src/types/${type}/schema.graphql`
    );
    fs.readFile(pathToSchema, { encoding: 'utf-8' }, (err, schema) => {
      if (err) {
        return reject(err);
      }

      resolve(schema);
    });
  });

export const loadTypeResolvers = types => {
  return types.reduce((acc, type) => {
    return _.merge(acc, require(`../types/${type}/resolver.js`)).default
  }, {})
};
