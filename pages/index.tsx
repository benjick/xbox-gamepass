/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SortKey, useGames, useStore } from "../src/state";
import { Game } from "../functions/src";
import { Filter } from "../components/Filter";
import { XCircleIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
  const { hideGame } = useStore((state) => ({
    hideGame: state.hideGame,
  }));

  const { setSort, sort } = useStore((state) => ({
    sort: state.sort,
    setSort: state.setSort,
  }));

  const games = useGames();

  function round(n: number) {
    return Math.max(0, Math.round(n));
  }

  const HeaderItem: React.FC<{ id: SortKey }> = ({ children, id }) => {
    return (
      <th>
        <button onClick={() => setSort(id)}>
          <strong>
            {children} {id === sort ? "☑️" : ""}
          </strong>
        </button>
      </th>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>XBOX gamepass app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter />
      <table className="table-auto w-100">
        <thead>
          <tr>
            <th>Image</th>
            <HeaderItem id="name">Game</HeaderItem>
            <HeaderItem id="opencritic.percentRecommended">
              Recommended
            </HeaderItem>
            <HeaderItem id="opencritic.averageScore">Average score</HeaderItem>
            <HeaderItem id="opencritic.medianScore">Median score</HeaderItem>
            <th>Source</th>
            <th>Hide</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game: Game) => (
            <tr key={game.id}>
              <td>
                <img
                  src={
                    game.images.find(
                      (image) => image.purpose === "SuperHeroArt"
                    )?.url
                  }
                  style={{ width: 100 }}
                  alt="game"
                />
              </td>
              <td>{game.name}</td>
              <td>{round(game.opencritic.percentRecommended)}%</td>
              <td>{round(game.opencritic.averageScore)}%</td>
              <td>{round(game.opencritic.medianScore)}%</td>
              <td>
                {game.source === "xbox-gamepass" ? "Gamepass" : "EA Play"}
              </td>
              <td>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => hideGame(game.id)}
                >
                  <XCircleIcon
                    className="-ml-0.5 mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Hide
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
