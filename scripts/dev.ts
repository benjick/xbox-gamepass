import concurrently from "concurrently";
import * as path from "path";

concurrently(
  [
    { command: "yarn dev:frontend", name: "frontend" },
    { command: "yarn dev:functions", name: "functions" },
    { command: "yarn dev:emulators", name: "emulators" },
  ],
  {
    prefix: "name",
    killOthers: ["failure"],
    restartTries: 0,
  }
).catch((error) => console.log("oops", error));
