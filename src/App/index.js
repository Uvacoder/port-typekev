import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import getMuiTheme from 'utils/getMuiTheme';
import getPrefersColorScheme from 'utils/getPrefersColorScheme';
import { TYPEKEV_SITE_PREFERS_COLOR_SCHEME, COLOR_SCHEME_CODE_MAP } from 'resources/constants';

import Page from 'templates/Page';
import useDrawer from 'hooks/useDrawer';
import Header from 'components/Header';
import Copyright from 'components/Copyright';
import Drawer from 'components/Drawer';
import Root from 'App/Root';
import './index.css';

export const Explore = React.lazy(() => import('routes/Explore'));
export const Discover = React.lazy(() => import('routes/Discover'));
export const Work = React.lazy(() => import('routes/Work'));
export const Blog = React.lazy(() => import('routes/Blog'));
export const Contact = React.lazy(() => import('routes/Contact'));

export const togglePrefersColorScheme = (SELECTED_COLOR_SCHEME, setCookie) => () =>
  setCookie(
    TYPEKEV_SITE_PREFERS_COLOR_SCHEME,
    SELECTED_COLOR_SCHEME === COLOR_SCHEME_CODE_MAP.DARK
      ? COLOR_SCHEME_CODE_MAP.LIGHT
      : COLOR_SCHEME_CODE_MAP.DARK,
    {
      path: '/',
    },
  );

export const normalizePath = hash =>
  hash
    .split('')
    .filter((char, indexOfChar) => char !== '/' || char !== hash[indexOfChar + 1])
    .join('');

export const Main = styled.div`
  flex: 1 1 auto;
  display: flex;
`;

export default function App() {
  const { hash } = window.location;
  const [open, toggleDrawer] = useDrawer();
  const [cookies, setCookie] = useCookies([TYPEKEV_SITE_PREFERS_COLOR_SCHEME]);

  const SELECTED_COLOR_SCHEME =
    cookies[TYPEKEV_SITE_PREFERS_COLOR_SCHEME] || getPrefersColorScheme();

  const theme = getMuiTheme(SELECTED_COLOR_SCHEME);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Root open={open}>
          <Header
            open={open}
            toggleDrawer={toggleDrawer}
            togglePrefersColorScheme={togglePrefersColorScheme(SELECTED_COLOR_SCHEME, setCookie)}
          />
          <Main>
            <Page open={open}>
              <Suspense fallback={<LinearProgress color="secondary" />}>
                <Switch>
                  <Route path="/discover" component={Discover} />
                  <Route path="/work" component={Work} />
                  <Route path="/blog/:postId?" component={Blog} />
                  <Route path="/contact" component={Contact} />
                  {!!hash && (
                    <Redirect to={`${normalizePath(hash).substring(hash.indexOf('#') + 1)}`} />
                  )}
                  <Route exact path="/" component={Explore} />
                  <Redirect to="/" />
                </Switch>
              </Suspense>
            </Page>
          </Main>
          <Copyright />
        </Root>
      </Router>
    </MuiThemeProvider>
  );
}
