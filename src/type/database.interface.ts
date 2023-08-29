import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface LettingMergedTable {
  id: string;
  members: string[] | null;
  transaction_date: Timestamp;
  on_market_date: Timestamp;
  time_to_disposal: number | null;
  display_address: string;
  lease: Json;
  unit: Json;
  meta: Json;
  geocode: string;
}

export interface Database {
  letting_merged: LettingMergedTable;
}

export type LettingMerged = Selectable<LettingMergedTable>;
export type NewLettingMerged = Insertable<LettingMergedTable>;
export type LettingMergedUpdate = Updateable<LettingMergedTable>;
