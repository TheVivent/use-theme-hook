import createPersistedState from "use-persisted-state";

const GLOBAL_THEME_LIST = new Set<string>()
  .add("system")
  .add("light")
  .add("dark");
let GLOBAL_THEME_STORAGE: any;
let GLOBAL_DEFAULT_THEME: string;

interface params {
  defaultClientTheme?: string;
  additionalThemes?: [string] | [];
  defaultStorageKey?: string;
}

export default function useTheme({
  additionalThemes = [],
  defaultClientTheme = "system",
  defaultStorageKey = "the_vivent_theme",
}: params = {}) {
  // undefined == null in typescript
  if (GLOBAL_THEME_STORAGE == undefined) {
    GLOBAL_THEME_STORAGE = createPersistedState(defaultStorageKey);
    GLOBAL_DEFAULT_THEME = defaultClientTheme;
  }

  // merge default themes with provided ones
  additionalThemes?.forEach((theme) => GLOBAL_THEME_LIST.add(theme));

  if (!GLOBAL_THEME_LIST.has(GLOBAL_DEFAULT_THEME))
    GLOBAL_THEME_LIST.add(GLOBAL_DEFAULT_THEME);

  const [theme, internalSetTheme] = GLOBAL_THEME_STORAGE(GLOBAL_DEFAULT_THEME);

  const setTheme = (theme: string) => {
    if (GLOBAL_THEME_LIST.has(theme)) {
      internalSetTheme(theme);
    }
  };

  return [theme, setTheme];
}

export function addTheme(theme: string): void {
  GLOBAL_THEME_LIST.add(theme);
}

export function removeTheme(theme: string): void {
  if (["system", "dark", "light"].includes(theme)) return;
  GLOBAL_THEME_LIST.delete(theme);
}

export function listThemes(): string[] {
  return Array.from(GLOBAL_THEME_LIST);
}
