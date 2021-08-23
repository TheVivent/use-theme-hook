# use-theme-hook

> # your last theming hook
>
> - **persist** user's preferred theme
> - detect **system** theme
> - add your **own** themes

[![NPM](https://img.shields.io/npm/v/use-theme.svg)](https://www.npmjs.com/package/use-theme) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install use-theme-hook
yarn add use-theme-hook
```

## Usage

use-theme-hook comes with three hooks to save the world.

## use-theme:

```tsx
import useTheme from "use-theme-hook";

const example = () => {
  // useTheme returns an "internal" theme and setter that ensures that setted theme exist
  const [theme, setTheme] = useTheme();

  return (
    <div>
      {// will change theme to light}
      <button type="button" onClick={() => setTheme("light")}>
        light
      </button>

      {// won't do anything, because pink theme does not exist}
      <button type="button" onClick={() => setTheme("pink")}>
        pink
      </button>
    </div>
  );
};
```

by default useTheme can return **light**, **dark** or **system**, and this value is persisted if changed from default.

useTheme can also take a configuration object that looks like this by default:

```tsx
{
  additionalThemes = [], // [string]
  defaultClientTheme = "system", // string
  defaultStorageKey = "the_vivent_theme", //string
}
```

## useSystemTheme

```tsx
import { useSytemTheme } from "use-theme-hook";

const example2 = () => {
  // only returns 'light' or 'dark'
  // based on "prefers-color-scheme" matchMedia
  const systemTheme = useSystemTheme();

  return <div>systemTheme: {systemTheme}</div>;
};
```

I do **NOT** recommend using it, because even if you want your app to use only systemTheme, you might change your mind in future. The next hook is what I reccomend to use

## useCurrentTheme

```tsx
import useTheme, { useCurrentTheme } from "use-theme-hook";

const example3 = () => {
  const [theme, setTheme] = useTheme({
    additionalThemes: ["pink"],
  });

  // will output 'light' or 'dark'
  // depending on the useSystemTheme() output
  console.log(useCurrentTheme());

  setTheme("pink");
  // will output 'pink'
  console.log(useCurrentTheme());
};
```

useCurrentTheme internally uses both useTheme and useSystemTheme.
If useTheme return 'system' useCurrentTheme will return output of useSystemTheme. Otherwise it will return useTheme output.

## additional

```tsx
import useTheme, { addTheme, listThemes } from "use-theme-hook";

const example4 = () => {
  const [theme, setTheme] = useTheme();
  const [newThemeName, setNewThemeName] = useState()

  const handleThemeAdd = ()=>{
    addTheme(newThemeName)
  }

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
        {listThemes().map((theme) => (
          <option key={theme} value={theme}>
            theme
          </option>
        ))}
      </select>
      <input type="text" value={newThemeName} onChange={(e)=>setNewThemeName(e.currentTarget.value)}>
      <button type="button" onClick={handleThemeAdd}>
    </div>
  );
};
```

listThemes return an array of all available themes  
addTheme can add themes to that list

# **IMPORTANT**

if you want to configure use-theme-hook with useTheme **make sure to use useTheme with configuration before useTheme without one and before useCurrentTheme** as most of the configuration cannot be changed after initialization.

> defaultClientTheme - can't be changed after initialization  
> defaultStorageKey - can't be changed after initialization  
> additionalThemes - you can add other themes, but you cannot remove them

## TODO

> - code optimazation
> - tests
> - removing themes

## License

MIT © [TheVivent](https://github.com/TheVivent)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
