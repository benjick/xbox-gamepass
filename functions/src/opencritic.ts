import { Api } from "./__generated__/OpenCritic";

export const opencritic = new Api();

export async function findOpenCriticRating(name: string) {
  const { data } = await opencritic.game.searchGames({ criteria: name });
  if (!data[0]?.id) {
    return undefined;
  }
  const game = await opencritic.game.getGameById(data[0].id);

  return game.data;
}
