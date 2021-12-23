import concurrently from "concurrently";
import { build } from "./build";

async function deploy() {
  await build();
  await concurrently(
    [
      {
        command: "firebase deploy",
        name: "firebase",
      },
    ],
    {
      prefix: "command",
      killOthers: ["failure"],
    }
  );
}

if (require.main === module) {
  deploy();
}
