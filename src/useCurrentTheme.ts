import useTheme from "./useTheme";
import useSystemTheme from "./useSystemTheme";

export default function useCurrentTheme() {
  const [theme] = useTheme();
  const systemTheme = useSystemTheme();
  if (theme === "system") return systemTheme;
  return theme;
}
