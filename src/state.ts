import { collection, query, getDocs, orderBy } from "firebase/firestore";
import create from "zustand";
import { persist, combine } from "zustand/middleware";
import produce from "immer";
import sorter from "sort-nested-json";
import { Game } from "../functions/src";
import { db } from "./firebase";
import { useMemo } from "react";

export const sorts = {
  name: "Name",
  "opencritic.percentRecommended": "% Recommended",
  "opencritic.averageScore": "Average score",
  "opencritic.medianScore": "Median score",
};

export type SortKey = keyof typeof sorts;

const initialState = {
  games: [] as Game[],
  hidden: [] as string[],
  showHidden: false,
  sort: Object.keys(sorts)[0] as SortKey,
  category: "ALL",
  sorts,
};

export const useStore = create(
  persist(
    combine(initialState, (set, get) => ({
      setSort: async (sort: SortKey) => {
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
      hideGame: async (id: string) => {
        set(
          produce((state) => {
            state.hidden.push(id);
          })
        );
      },
      unhideGame: async (id: string) => {
        const index = get().hidden.findIndex((h) => h === id);
        if (index >= 0) {
          set(
            produce((state) => {
              state.hidden.splice(id, 1);
            })
          );
        }
      },
      setShowHidden(showHidden: boolean) {
        set({ showHidden });
      },
      setCategory: async (category: string) => {
        set({ category });
      },
    })),
    {
      name: "xbox-gamepass",
      partialize: (state) => ({
        games: state.games,
        sort: state.sort,
        hidden: state.hidden,
        category: state.category,
        showHidden: state.showHidden,
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
    if (category !== "ALL") {
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
