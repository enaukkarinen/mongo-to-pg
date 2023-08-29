import {
  LettingMerged,
  LettingMergedUpdate,
  NewLettingMerged,
} from "type/database.interface";
import { db } from "./database";

export async function findLettingMergedById(id: string) {
  return await db
    .selectFrom("letting_merged")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findLettingMerged(criteria: Partial<LettingMerged>) {
  let query = db.selectFrom("letting_merged");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id); // Kysely is immutable, you must re-assign!
  }

  //   if (criteria.first_name) {
  //     query = query.where('first_name', '=', criteria.first_name)
  //   }

  //   if (criteria.last_name !== undefined) {
  //     query = query.where(
  //       'last_name',
  //       criteria.last_name === null ? 'is' : '=',
  //       criteria.last_name
  //     )
  //   }

  //   if (criteria.gender) {
  //     query = query.where('gender', '=', criteria.gender)
  //   }

  //   if (criteria.created_at) {
  //     query = query.where('created_at', '=', criteria.created_at)
  //   }

  return await query.selectAll().execute();
}

import geojson from "./data/multi-polygon-feature";

export async function findLettingMergedByGeoJson() {
  const json = JSON.stringify(geojson.geometry);

  const transformed = `ST_GeomFromGeoJSON(${json})`;

  return await db
    .selectFrom("letting_merged")
    .where("geocode" as any, "=", transformed)
    .selectAll()
    .executeTakeFirst();
}

export async function updateLettingMerged(
  id: string,
  updateWith: LettingMergedUpdate
) {
  await db
    .updateTable("letting_merged")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createLettingMerged(lettingMerged: NewLettingMerged) {
  return await db
    .insertInto("letting_merged")
    .values(lettingMerged)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteLettingMerged(id: string) {
  return await db
    .deleteFrom("letting_merged")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
