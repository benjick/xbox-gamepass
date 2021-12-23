import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Product } from "../../types/Products";
import { OpenCriticGame } from "../../types/OpenCritic";
import fetch from "node-fetch";

admin.initializeApp();

const firestore = admin.firestore();

process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";

const market = "SE";

enum GamesLists {
  CONSOLE = "f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&",
  PC = "fdd9e2a7-0fee-49f6-ad69-4354098401ff&",
  WITHOUT_CONTROLLER = "7d8e8d56-c02f-4711-afec-73a80d8e9261&",
  ALL = "29a81209-df6f-41fd-a528-2ae6b91f719c&",
  EA_PLAY = "b8900d09-a491-44cc-916e-32b5acae621b",
}

async function getGamesList(list: GamesLists) {
  const res = await fetch(
    `https://catalog.gamepass.com/sigls/v2?id=${list}&language=en-us&market=${market}`
  );
  const json = (await res.json()) as { id?: string }[];
  const gameIds = json
    .filter((game: any) => game.id)
    .map((game: any) => game.id);
  return gameIds;
}

async function getGames(list: string[]) {
  const res = await fetch(
    `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${list.join(
      ","
    )}&market=${market}&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`
  );
  const gamesjson = (await res.json()) as {
    Products: Product[];
  };
  const games = gamesjson.Products.map((game, i) => {
    const Properties =
      game.LocalizedProperties.find((prop) => prop.Language === "en") ??
      game.LocalizedProperties[0];
    return {
      id: game.ProductId,
      name: Properties.ProductTitle,
      images: Properties.Images.map((image) => "https:" + image.Uri),
    };
  });
  return games;
}

async function findOpenCriticRating(name: string): Promise<OpenCriticGame> {
  const baseurl = "https://api.opencritic.com/api";
  const [bestResult] = (await fetch(
    baseurl + "/game/search?criteria=" + name
  ).then((res) => res.json())) as {
    id: number;
    name: string;
    dist: number;
  }[];
  const game = await fetch(baseurl + "/game/" + bestResult.id).then((res) =>
    res.json()
  );

  return game as OpenCriticGame;
}

async function fetchAndSaveGames(list: GamesLists, source: string) {
  const gameIds = await getGamesList(list);
  const games = await getGames(gameIds);
  const batch = firestore.batch();
  for (const game of games) {
    const ref = firestore.collection("games").doc(game.id);
    batch.set(ref, { ...game, source });
  }
  await batch.commit();
}

export const updateGames = functions.https.onRequest(
  async (request, response) => {
    await fetchAndSaveGames(GamesLists.PC, "xbox-gamepass");
    await fetchAndSaveGames(GamesLists.EA_PLAY, "ea-play");

    response.send({
      ok: true,
    });
  }
);

exports.cronjob = functions.pubsub
  .schedule("every day")
  .onRun(async (context) => {
    await fetchAndSaveGames(GamesLists.PC, "xbox-gamepass");
    await fetchAndSaveGames(GamesLists.EA_PLAY, "ea-play");
    return null;
  });

export const onGameCreate = functions.firestore
  .document("games/{gameId}")
  .onCreate(async (change, context) => {
    console.log("created", context.params, change.data().name);
    const data = change.data();
    const game = await findOpenCriticRating(data.name);
    await firestore.collection("games").doc(data.id).update({
      opencriticPercentRecommended: game.percentRecommended,
      opencriticAverageScore: game.averageScore,
      opencriticMedianScore: game.medianScore,
    });

    return Promise.resolve();
  });
