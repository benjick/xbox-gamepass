import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GameBeforeOpenCritic, getGames, getGamesList } from "./gamepass";
import { findOpenCriticRating } from "./opencritic";

admin.initializeApp();

const firestore = admin.firestore();

if (process.env.USE_EMULATOR) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
}

enum GamesLists {
  CONSOLE = "f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&",
  PC = "fdd9e2a7-0fee-49f6-ad69-4354098401ff&",
  WITHOUT_CONTROLLER = "7d8e8d56-c02f-4711-afec-73a80d8e9261&",
  ALL = "29a81209-df6f-41fd-a528-2ae6b91f719c&",
  EA_PLAY = "b8900d09-a491-44cc-916e-32b5acae621b",
}

interface OpenCriticData {
  opencritic: {
    id: number;
    percentRecommended: number;
    averageScore: number;
    medianScore: number;
  };
}

export type Game = GameBeforeOpenCritic &
  OpenCriticData & {
    source: string;
  };

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
    if (process.env.USE_EMULATOR) {
      await fetchAndSaveGames(GamesLists.PC, "xbox-gamepass");
      await fetchAndSaveGames(GamesLists.EA_PLAY, "ea-play");
    }

    response.send({
      ok: !!process.env.USE_EMULATOR,
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
    if (!game) {
      return Promise.resolve();
    }
    const openCriticData: OpenCriticData = {
      opencritic: {
        id: game.id,
        percentRecommended: game.percentRecommended ?? -1,
        averageScore: game.averageScore ?? -1,
        medianScore: game.medianScore ?? -1,
      },
    };
    await firestore.collection("games").doc(data.id).update(openCriticData);

    return Promise.resolve();
  });
