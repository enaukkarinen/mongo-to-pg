import { MongoClient } from "mongodb";

import { mapLettingMerged } from "./mappers/mapLettingMerged";

import { createLettingMerged } from "./lettingMergedRepository";

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

  try {
    for await (const doc of cursor) {
      const mapped = mapLettingMerged(doc);

      counter += 1;
      process.stdout.write(
        `\rDocuments inserted: ${counter}. Insert document id ${mapped.id}`
      );

      await createLettingMerged(mapped);
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("\nDone");
  }
}
