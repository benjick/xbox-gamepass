import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useGames, useStore } from "../src/state";
import { Game } from "../functions/src";
import { Filter } from "../components/Filter";

const Home: NextPage = () => {
  const { hideGame } = useStore((state) => ({
    hideGame: state.hideGame,
  }));

  const games = useGames();

  function round(n: number) {
    return Math.max(0, Math.round(n));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>XBOX gamepass app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Game</th>
            <th>Recommended</th>
            <th>Average score</th>
            <th>Median score</th>
            <th>Source</th>
            <th>Category</th>
            <th>Hide</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game: Game) => (
            <tr key={game.id}>
              <td>
                <img src={game.images[0]} style={{ width: 100 }} alt="game" />
              </td>
              <td>{game.name}</td>
              <td>{round(game.opencritic.percentRecommended)}%</td>
              <td>{round(game.opencritic.averageScore)}%</td>
              <td>{round(game.opencritic.medianScore)}%</td>
              <td>
                {game.source === "xbox-gamepass" ? "Gamepass" : "EA Play"}
              </td>
              <td>{game.category}</td>
              <td>
                <button onClick={() => hideGame(game.id)}>Hide game</button>
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
