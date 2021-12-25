import { useGames, useStore } from "../state";

export function usePagination() {
  const games = useGames();
  const { page, setPage: _setPage } = useStore((state) => ({
    page: state.page,
    setPage: state.setPage,
  }));
  const numberOfGames = games.length;

  const perPage = 24;
  const pages = Math.ceil(games.length / perPage);

  function setPage(page: number) {
    page = Math.max(Math.min(page, pages), 0);
    _setPage(page);
  }

  return {
    page,
    pages,
    perPage,
    setPage,
    numberOfGames,
    games: games.slice(page * perPage, page * perPage + perPage),
  };
}
