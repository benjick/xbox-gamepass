import concurrently from "concurrently";
import * as path from "path";
import { generate } from "./swagger";

export async function build() {
  await generate();
  await concurrently(
    [
      {
        command: "yarn next build",
        name: "frontend",
      },
      {
        command: "yarn && yarn build",
        name: "functions",
        cwd: path.resolve(__dirname, "../functions"),
      },
    ],
    {
      prefix: "command",
      killOthers: ["failure"],
    }
  );
}

if (require.main === module) {
  build();
}
