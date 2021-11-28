/**
 *
 * NavBar
 *
 */
import { memo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Hidden from '@mui/material/Hidden';
import Icon from '@mdi/react';
import {
  mdiArrowDown,
  mdiAt,
  mdiAtom,
  mdiBookshelf,
  mdiHandWaveOutline,
  mdiMenu,
} from '@mdi/js';

import { RouterPath } from 'types';
import { scrollTo } from 'utils/scrollTo';
import { translations } from 'locales/translations';

import { ThemeModeToggle } from './themeModeToggle/Loadable';
import { media } from 'styles/media';

const NEXT_SECTION: Record<RouterPath, RouterPath | number> = {
  [RouterPath.about]: RouterPath.work,
  [RouterPath.work]: RouterPath.blog,
  [RouterPath.blog]: RouterPath.contact,
  [RouterPath.contact]: 0,
};

export const NavBar = memo(() => {
  const { section = RouterPath.about } = useParams<{ section?: RouterPath }>();
  const { t } = useTranslation();

  const hasLeftStart = section !== RouterPath.about;
  const hasReachedEnd = section === RouterPath.contact;
  const arrowTitle = hasReachedEnd
    ? t(translations['Back to top'])
    : t(translations.Continue);

  return (
    <Bar retract={hasLeftStart}>
      <Hidden mdUp>
        <IconButton color="inherit">
          <Icon path={mdiMenu} size={2} />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Tooltip title={arrowTitle} placement="right" arrow>
          <IconButton
            color="inherit"
            onClick={() => scrollTo(NEXT_SECTION[section])}
          >
            <Icon
              path={mdiArrowDown}
              rotate={hasReachedEnd ? 180 : undefined}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={t(translations['About me']) as string}
          placement="right"
          arrow
        >
          <NavLink
            to={RouterPath.about}
            onClick={() => scrollTo(RouterPath.about)}
          >
            <IconButton color="inherit">
              <Icon path={mdiHandWaveOutline} color="inherit" />
            </IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip title={t(translations.Work) as string} placement="right" arrow>
          <NavLink
            to={RouterPath.work}
            onClick={() => scrollTo(RouterPath.work)}
          >
            <IconButton color="inherit">
              <Icon path={mdiAtom} color="inherit" />
            </IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip
          title={t(translations.Articles) as string}
          placement="right"
          arrow
        >
          <NavLink
            to={RouterPath.blog}
            onClick={() => scrollTo(RouterPath.blog)}
          >
            <IconButton color="inherit">
              <Icon path={mdiBookshelf} />
            </IconButton>
          </NavLink>
        </Tooltip>
        <Tooltip
          title={t(translations.Contact) as string}
          placement="right"
          arrow
        >
          <NavLink
            to={RouterPath.contact}
            onClick={() => scrollTo(RouterPath.contact)}
          >
            <IconButton color="inherit">
              <Icon path={mdiAt} />
            </IconButton>
          </NavLink>
        </Tooltip>
        <ThemeModeToggle />
      </Hidden>
    </Bar>
  );
});

const Bar = styled.div<{ retract: boolean }>`
  position: fixed;
  right: 0;
  transition: right 250ms;

  ${({ retract }) =>
    retract &&
    css`
      right: -2em;
    `}

  ${media.medium`
    display: flex;
    flex-direction: column;
    top: 50%;
    left: auto;
    right: 0;
    transform: translateY(-50%);
  `}

  ${media.large`
    margin-left: 0.5vw;
  `}

  svg {
    width: 2em;

    ${media.large`
      width: 3vw;
    `}

    :hover {
      color: inherit;
    }

    transition: 500ms transform 100ms;
  }
`;