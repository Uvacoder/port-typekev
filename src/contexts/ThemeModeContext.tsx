import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useMemo,
} from 'react';
import { ThemeMode } from 'types';

import { palette } from 'styles/palette';

const THEME_MODE_LOCAL_KEY = 'themeMode';
const PREF_DARK_MEDIA = '(prefers-color-scheme: dark)';
const POSSIBLE_THEME_MODES = Object.values(ThemeMode);

const stringIsThemeMode = (maybeTM: string | null): maybeTM is ThemeMode =>
  POSSIBLE_THEME_MODES.includes(maybeTM as ThemeMode);

export const ThemeModeContext = createContext({
  themeMode: ThemeMode.light,
  toggleThemeMode: () => {},
});

export const ThemeModeProvider = ({ children }: PropsWithChildren<{}>) => {
  const localThemeMode = useMemo(
    () => localStorage.getItem(THEME_MODE_LOCAL_KEY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const initThemeMode = useMemo(
    () =>
      (stringIsThemeMode(localThemeMode) ? localThemeMode : null) ??
      (window.matchMedia(PREF_DARK_MEDIA).matches
        ? ThemeMode.dark
        : ThemeMode.light),
    [localThemeMode],
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>(initThemeMode);

  const toggleThemeMode = () => {
    const nextThemeMode =
      themeMode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    localStorage.setItem(THEME_MODE_LOCAL_KEY, nextThemeMode);
    setThemeMode(nextThemeMode);
  };

  useEffect(() => {
    if (stringIsThemeMode(localThemeMode)) {
      setThemeMode(localThemeMode);
    } else if (window.matchMedia(PREF_DARK_MEDIA).matches) {
      setThemeMode(ThemeMode.dark);
    }
  }, [localThemeMode]);

  useEffect(() => {
    if (themeMode === ThemeMode.light) {
      document.body.style.setProperty('--bg1', palette.retroOffWhite[400]);
      document.body.style.setProperty('--bg2', palette.retroOffWhite[300]);
      document.body.style.setProperty('--bg3', palette.retroOffWhite[200]);
      document.body.style.setProperty('--bg4', palette.retroOffWhite[100]);
      document.body.style.setProperty('--fg', palette.retroOffBlack[400]);
    } else {
      document.body.style.setProperty('--bg1', palette.retroOffBlack[100]);
      document.body.style.setProperty('--bg2', palette.retroOffBlack[200]);
      document.body.style.setProperty('--bg3', palette.retroOffBlack[300]);
      document.body.style.setProperty('--bg4', palette.retroOffBlack[400]);
      document.body.style.setProperty('--fg', palette.retroOffWhite[100]);
    }
    if (themeMode !== initThemeMode) {
      document.body.style.setProperty('--bg1-trans-duration', '300ms');
      document.body.style.setProperty('--bg2-trans-duration', '600ms');
      document.body.style.setProperty('--bg3-trans-duration', '900ms');
      document.body.style.setProperty('--bg4-trans-duration', '1200ms');
      document.body.style.setProperty('--fg-trans-duration', '1500ms');
    }
  }, [initThemeMode, themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};
