import { Client } from "pg";

import config from "./config";

const client = new Client(config.postgres);

export async function queryTest() {
  await client.connect();

  try {
    const res = await client.query(`
    SELECT *
    FROM pgtest
    `);
    console.log(res.rows); // Hello world!
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
