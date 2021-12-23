import concurrently from "concurrently";
import * as path from "path";

concurrently(
  [
    {
      command: "yarn next dev",
      name: "frontend",
      env: {
        NEXT_PUBLIC_USE_EMULATOR: "yes",
        USE_EMULATOR: "yes",
        NODE_ENV: "development",
      },
    },
    {
      command: "pwd && yarn && yarn build:watch",
      name: "functions",
      cwd: path.resolve(__dirname, "../functions"),
    },
    {
      command:
        "firebase emulators:start --import=.firebase --export-on-exit=.firebase",
      name: "emulators",
      env: {
        USE_EMULATOR: "yes",
        NODE_ENV: "development",
        GOOGLE_APPLICATION_CREDENTIALS: "",
      },
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure"],
  }
).catch((error) => console.log("oops", error));
