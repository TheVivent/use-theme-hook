import React from "react";
import { useState } from "react";
import useTheme, {
  useSystemTheme,
  useCurrentTheme,
  addTheme,
  listThemes,
  removeTheme,
} from "use-theme-hook";

const App = () => {
  const [theme, setTheme] = useTheme({
    additionalThemes: ["pink"],
    defaultClientTheme: "pink",
    defaultStorageKey: "test",
  });
  const currentTheme = useCurrentTheme();
  const systemTheme = useSystemTheme();

  const [newThemeName, setNewThemeName] = useState("");
  const [delThemeName, setDelThemeName] = useState("");

  const handleThemeAddition = () => {
    addTheme(newThemeName);
    setNewThemeName("");
  };

  const handleThemeRem = () => {
    removeTheme(delThemeName);
    setDelThemeName("");
  };

  return (
    <div>
      <div>currentTheme: {currentTheme}</div>
      <div>systemTheme: {systemTheme}</div>
      <div>internalTheme: {theme}</div>
      <div>
        <select
          defaultValue={theme}
          onChange={(e) => {
            e.preventDefault();
            setTheme(e.currentTarget.value);
          }}
        >
          {listThemes().map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.currentTarget.value)}
        />
        <button type="button" onClick={handleThemeAddition}>
          Add
        </button>
      </div>
      <div>
        <input
          type="text"
          value={delThemeName}
          onChange={(e) => setDelThemeName(e.currentTarget.value)}
        />
        <button type="button" onClick={handleThemeRem}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default App;
