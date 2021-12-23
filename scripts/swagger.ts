import { generateApi } from "swagger-typescript-api";
import * as path from "path";

const url =
  "https://api.swaggerhub.com/apis/OpenCritic/OpenCritic-API/0.1.0/swagger.json";

export async function generate() {
  await generateApi({
    name: "OpenCritic.ts",
    output: path.resolve(process.cwd(), "./functions/src/__generated__"),
    url,
    httpClientType: "axios",
    defaultResponseAsSuccess: true,
  }).catch((e) => console.error(e));
}

if (require.main === module) {
  generate();
}
