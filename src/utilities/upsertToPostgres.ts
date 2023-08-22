import { Client } from "pg";

import { LettingMergedPg } from "../type/letting-merged-pg.interface";

export async function upsertToPostgres(
  client: Client,
  document: LettingMergedPg
) {
  return await client.query(`
        INSERT INTO lettingmerged (id, members, geocode)
        VALUES (
          '${document.ID}', 
          '{${document.MEMBERS}}', 
          ${document.GEOCODE}
        )
        
    `);
}
