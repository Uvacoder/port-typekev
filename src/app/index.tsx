/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import { RouterPath } from 'types';
import { GlobalStyle, GlobalStyleProperties } from 'styles/global-styles';

import { Sections } from './Sections';
import { ThemeModeContext } from 'contexts/ThemeModeContext';

export function App() {
  const { i18n } = useTranslation();
  const { themeMode } = useContext(ThemeModeContext);

  return (
    <>
      <ThemeProvider theme={{ mode: themeMode }}>
        <BrowserRouter>
          <Helmet
            titleTemplate="Kevin Gonzalez — %s"
            defaultTitle="Software Engineer"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta
              name="description"
              content="The personal website of Kevin Gonzalez"
            />
          </Helmet>

          <Switch>
            <Route
              exact
              path={`/:section(${Object.values(RouterPath).join('|')})?`}
              component={Sections}
            />
            <Redirect to={RouterPath.about} />
          </Switch>
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
      <GlobalStyleProperties />
    </>
  );
}
