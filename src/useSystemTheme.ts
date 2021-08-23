import { useEffect, useState } from "react";
import { SystemTheme } from "./types";

function getMediaColorSchema() {
  // check for SSR
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}

export default function useSystemTheme(defaultTheme: SystemTheme = "light") {
  //defaultTheme used when SSR
  const [theme, setTheme] = useState<SystemTheme>(defaultTheme);

  useEffect(() => {
    const mcs = getMediaColorSchema();
    //check for SSR
    if (mcs) {
      setTheme(mcs.matches ? "dark" : "light");
      mcs.addEventListener("change", (event) => {
        setTheme(event.matches ? "dark" : "light");
      });
    }
  }, []);

  return theme;
}
