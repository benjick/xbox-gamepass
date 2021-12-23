import axios from "axios";
import { Product } from "../../types/Products";

const market = "SE";

export enum GamesLists {
  CONSOLE = "f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&",
  PC = "fdd9e2a7-0fee-49f6-ad69-4354098401ff&",
  WITHOUT_CONTROLLER = "7d8e8d56-c02f-4711-afec-73a80d8e9261&",
  ALL = "29a81209-df6f-41fd-a528-2ae6b91f719c&",
  EA_PLAY = "b8900d09-a491-44cc-916e-32b5acae621b",
}

export interface GameBeforeOpenCritic {
  id: string;
  name: string;
  images: {
    url: string;
    purpose: string;
  }[];
  category: string;
  categories: string[];
}

export async function getGamesList(list: GamesLists) {
  const res = await axios.get<{ id: string }[]>(
    `https://catalog.gamepass.com/sigls/v2?id=${list}&language=en-us&market=${market}`
  );
  const gameIds = res.data
    .filter((game: any) => game.id)
    .map((game: any) => game.id);
  return gameIds;
}

export async function getGames(
  list: string[]
): Promise<GameBeforeOpenCritic[]> {
  const res = await axios.get<{
    Products: Product[];
  }>(
    `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${list
      .slice(0, 10) // only 10 games from each list for now (faster for testing)
      .join(",")}&market=${market}&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`
  );
  const games = res.data.Products.map((game, i) => {
    const Properties =
      game.LocalizedProperties.find((prop) => prop.Language === "en") ??
      game.LocalizedProperties[0];
    return {
      id: game.ProductId,
      name: Properties.ProductTitle,
      images: Properties.Images.map((image) => ({
        url: "https:" + image.Uri,
        purpose: image.ImagePurpose,
      })),
      category: game.Properties.Category,
      categories: game.Properties.Categories,
    };
  });
  return games;
}
