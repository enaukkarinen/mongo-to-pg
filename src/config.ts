export default {
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
  },
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
    collection: process.env.MONGODB_COLLECTION,
  },
};
