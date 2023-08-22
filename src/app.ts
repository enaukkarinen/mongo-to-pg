import config from "./config";
import { queryTest } from "./queryTest";
import { seed } from "./seed";

queryTest();

seed({
  mongoConnectionString: config.mongodb.connectionString,
  collectionName: config.mongodb.collection,
});
