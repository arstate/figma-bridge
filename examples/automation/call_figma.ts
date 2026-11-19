import { callPlugin, exec } from "./server/src/relay-client";

const args = process.argv.slice(2);
const command = args[0] || "get_basic_info";
const payload = args[1];

async function main() {
  try {
    if (command === "execute") {
      if (!payload) {
        console.error("Error: Please provide code to execute");
        process.exit(1);
      }
      const res = await exec(payload);
      console.log(JSON.stringify(res, null, 2));
    } else {
      let params = {};
      if (payload) {
        try {
          params = JSON.parse(payload);
        } catch {
          params = { query: payload };
        }
      }
      const res = await callPlugin(command, params);
      console.log(JSON.stringify(res, null, 2));
    }
  } catch (err: any) {
    console.error("Execution error:", err.message);
    process.exit(1);
  }
}

main();
