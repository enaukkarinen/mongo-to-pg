import config from "../config";
import { seed } from "../seed";

async function run() {
  await seed({
    mongoConnectionString: config.mongodb.connectionString,
    collectionName: config.mongodb.collection,
  });
}

run().then(() => {
  console.log("Done");
  process.exit(0);
});
