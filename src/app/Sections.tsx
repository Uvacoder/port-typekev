import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import Slide from '@mui/material/Slide';

import { RouterPath } from 'types';
import { scrollTo } from 'utils/scrollTo';

import { NavBar } from './components/navBar/Loadable';
import { Robot } from './components/Robot';

import { About } from './sections/About';
import { Work } from './sections/Work';
import { Blog } from './sections/Blog';
import { Contact } from './sections/Contact';

export function Sections() {
  const { section } = useParams<{ section?: RouterPath }>();

  useLayoutEffect(() => {
    if (section && !window.pageYOffset && !document.documentElement.scrollTop) {
      scrollTo(section);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const botPosition = {
    start: section === RouterPath.about,
    middle: section === RouterPath.work,
    end: section === RouterPath.blog || section === RouterPath.contact,
  };

  const botDelay = {
    enter: '250ms',
    exit: '0ms',
  };

  return (
    <>
      <NavBar />
      <About id={RouterPath.about} />
      <Slide
        appear={false}
        direction="right"
        in={botPosition.start}
        style={{
          transitionDelay: botPosition.start ? botDelay.enter : botDelay.exit,
        }}
      >
        <Robot />
      </Slide>
      <Work id={RouterPath.work} />
      <Slide
        appear={false}
        direction="right"
        in={botPosition.middle}
        style={{
          transitionDelay: botPosition.middle ? botDelay.enter : botDelay.exit,
        }}
      >
        <Robot />
      </Slide>
      <Blog id={RouterPath.blog} />
      <Slide
        appear={false}
        direction="right"
        in={botPosition.end}
        style={{
          transitionDelay: botPosition.end ? botDelay.enter : botDelay.exit,
        }}
      >
        <Robot />
      </Slide>
      <Contact id={RouterPath.contact} />
    </>
  );
}