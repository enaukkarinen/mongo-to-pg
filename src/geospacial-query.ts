import { findLettingMergedByGeoJson } from "./lettingMergedRepository";

export async function geospacialQuery() {
  try {
    const response = await findLettingMergedByGeoJson();

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
