import { collection, query, getDocs, orderBy } from "firebase/firestore";
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
  category?: string;
  getGames: () => void;
  setSort: (sort: string) => void;
  hideGame: (id: string) => void;
  setCategory: (category: string) => void;
}

export const useStore = create<State>(
  persist(
    (set, get) => ({
      games: [],
      hidden: [],
      showHidden: false,
      sort: sorts[0],
      category: undefined,
      sorts,
      setSort: async (sort) => {
        set({ sort });
      },
      getGames: async () => {
        const ref = collection(db, "games");
        const q = query(ref, orderBy("opencritic.percentRecommended"));
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
      setCategory: async (category) => {
        set({ category });
      },
    }),
    {
      name: "xbox-gamepass",
      partialize: (state) => ({
        games: state.games,
        sort: state.sort,
        hidden: state.hidden,
        category: state.category,
      }),
    }
  )
);

export const useGames = () => {
  const { games, sort, hidden, showHidden, category } = useStore((state) => ({
    games: state.games,
    sort: state.sort,
    hidden: state.hidden,
    showHidden: state.showHidden,
    category: state.category,
  }));

  return useMemo(() => {
    let sortedGames = sorter.sort(games).desc(sort) as unknown as Game[]; // ???
    if (!showHidden) {
      sortedGames = sortedGames.filter((game) => !hidden.includes(game.id));
    }
    if (category) {
      sortedGames = sortedGames.filter((game) => game.category === category);
    }
    return sortedGames;
  }, [games, sort, hidden, showHidden, category]);
};

export const useCategories = () => {
  const { games, setCategory, category } = useStore((state) => ({
    games: state.games,
    setCategory: state.setCategory,
    category: state.category,
  }));

  const categories = useMemo(() => {
    return games
      .map((game) => game.category)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  }, [games]);

  return { setCategory, categories, category };
};
