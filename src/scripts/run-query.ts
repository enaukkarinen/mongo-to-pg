import { query } from "../query";

async function run() {
  await query();
}

run().then(() => {
  console.log("Done");
  process.exit(0);
});
