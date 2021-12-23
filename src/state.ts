import { collection, query, getDocs } from "firebase/firestore";
import create from "zustand";
import { persist } from "zustand/middleware";
import sorter from "sort-nested-json";
import { Game } from "../functions/src";
import { db } from "./firebase";
import { useMemo } from "react";

export const sorts = [
  "opencritic.percentRecommended",
  "opencritic.averageScore",
  "opencritic.medianScore",
];

interface State {
  games: Game[];
  hidden: string[];
  showHidden: boolean;
  sort: string;
  getGames: () => void;
  setSort: (sort: string) => void;
  hideGame: (id: string) => void;
}

export const useStore = create<State>(
  persist(
    (set, get) => ({
      games: [],
      hidden: [],
      showHidden: false,
      sort: sorts[0],
      sorts,
      setSort: async (sort) => {
        set({ sort });
      },
      getGames: async () => {
        const ref = collection(db, "games");
        const q = query(ref);
        getDocs(q).then((querySnapshot) => {
          const games: Game[] = [];
          querySnapshot.forEach((doc) => {
            games.push(doc.data() as Game);
          });
          set({ games });
        });
      },
      hideGame: async (id) => {
        set({
          hidden: [...get().hidden, id],
        });
      },
    }),
    {
      name: "xbox-gamepass",
      partialize: (state) => ({
        games: state.games,
        sort: state.sort,
        hidden: state.hidden,
      }),
    }
  )
);

export const useGames = () => {
  const { games, sort, hidden, showHidden } = useStore((state) => ({
    games: state.games,
    sort: state.sort,
    hidden: state.hidden,
    showHidden: state.showHidden,
  }));

  return useMemo(() => {
    let sortedGames = sorter.sort(games).desc(sort) as unknown as Game[]; // ???
    if (!showHidden) {
      sortedGames = sortedGames.filter((game) => !hidden.includes(game.id));
    }
    return sortedGames;
  }, [games, sort, hidden, showHidden]);
};
