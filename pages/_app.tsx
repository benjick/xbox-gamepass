import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useStore } from "../src/state";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const getGames = useStore((state) => state.getGames);
  const sort = useStore((state) => state.sort);

  useEffect(() => {
    getGames();
  }, [getGames, sort]);
  return <Component {...pageProps} />;
}

export default MyApp;
