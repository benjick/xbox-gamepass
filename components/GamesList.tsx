/* eslint-disable @next/next/no-img-element */
import { useStore } from "../src/state";
import { Game } from "../functions/src";
import { XCircleIcon } from "@heroicons/react/solid";
import { usePagination } from "../src/hooks/usePagination";

export const GamesList: React.FC = () => {
  const { hideGame, hidden, unhideGame } = useStore((state) => ({
    hideGame: state.hideGame,
    unhideGame: state.unhideGame,
    hidden: state.hidden,
  }));

  const { games } = usePagination();

  function round(n: number) {
    return Math.max(0, Math.round(n));
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6"
    >
      {games.map((game: Game) => {
        const image = game.images.find(
          (image) => image.purpose === "SuperHeroArt"
        )?.url;
        return (
          <li
            key={game.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <img
              className="w-100 flex-shrink-0 mx-auto flex-grow"
              src={image}
              alt=""
            />
            <div className="flex-1 flex flex-col p-8">
              <h3 className="text-gray-900 text-sm font-medium">{game.name}</h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-gray-500 text-sm">{game.category}</dd>
                <dt className="sr-only">Category</dt>
                <dd className="mt-3">
                  {game.opencritic ? (
                    <>
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {round(game.opencritic.percentRecommended)}%
                      </span>
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {round(game.opencritic.averageScore)}%
                      </span>
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {round(game.opencritic.medianScore)}%
                      </span>
                    </>
                  ) : (
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      No OpenCritic data
                    </span>
                  )}

                  <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {game.source === "xbox-gamepass" ? "Gamepass" : "EA Play"}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  {hidden.includes(game.id) ? (
                    <button
                      onClick={() => unhideGame(game.id)}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <XCircleIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Show</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => hideGame(game.id)}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <XCircleIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Hide</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
