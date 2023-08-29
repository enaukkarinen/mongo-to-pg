import { geospacialQuery } from "../geospacial-query";

async function run() {
  await geospacialQuery();
}

run().then(() => {
  console.log("Done");
  process.exit(0);
});
