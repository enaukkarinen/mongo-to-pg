import { MongoClient } from "mongodb";
import { Client } from "pg";

import { mapLettingMerged } from "./utilities/mapLettingMerged";
import { upsertToPostgres } from "./utilities/upsertToPostgres";
import config from "./config";

let db;
async function getMongoDB(connectionString: string) {
  try {
    if (!db) {
      const foo = new MongoClient(connectionString);
      const connection = await foo.connect();

      db = await connection.db();
    }

    return db;
  } catch (error) {
    console.log(error);
  }
}

export interface SeedOptions {
  mongoConnectionString: string;
  collectionName: string;
}

export async function seed(options: SeedOptions) {
  const db = await getMongoDB(options.mongoConnectionString);
  const collection = await db.collection(options.collectionName);
  const cursor = collection.find({});
  const count = await collection.estimatedDocumentCount();
  let counter = 0;

  console.log(`\nTotal documents: ${count}`);

  const pgClient = new Client(config.postgres);
  await pgClient.connect();

  try {
    for await (const doc of cursor) {
      const mapped = mapLettingMerged(doc);

      counter += 1;
      process.stdout.write(`\rDocuments inserted: ${counter}`);

      await upsertToPostgres(pgClient, mapped);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await pgClient.end();
  }
}
