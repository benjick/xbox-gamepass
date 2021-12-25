/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { SortKey, useStore } from "../src/state";
import { Filter } from "../components/Filter";
import { usePagination } from "../src/hooks/usePagination";
import { Pagination } from "../components/Pagination";
import { GamesList } from "../components/GamesList";

const Home: NextPage = () => {
  const { hideGame, hidden, unhideGame } = useStore((state) => ({
    hideGame: state.hideGame,
    unhideGame: state.unhideGame,
    hidden: state.hidden,
  }));

  const { setSort, sort } = useStore((state) => ({
    sort: state.sort,
    setSort: state.setSort,
  }));

  const { games, page, numberOfGames, perPage, setPage, pages } =
    usePagination();

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
    <div>
      <Head>
        <title>XBOX gamepass app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter />
      <div className="container">
        <Pagination />
        <GamesList />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
