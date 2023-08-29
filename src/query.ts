import { findLettingMerged } from "./lettingMergedRepository";

export async function query() {
  try {
    const response = await findLettingMerged({
      id: "000b0533-4a6d-402c-a257-d7ef85e86093",
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
