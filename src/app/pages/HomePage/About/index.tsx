/**
 *
 * About
 *
 */
import { memo } from 'react';
import { Trans } from 'react-i18next';

import { translations } from 'locales/translations';

import { Section } from 'app/components/Section';
import { FocusedText } from 'app/components/FocusedText';

export const About = memo(() => {
  return (
    <Section>
      <Trans
        i18nKey={translations["Hi, I'm Kevin"]}
        components={{
          bold: <strong />,
          focused: <FocusedText />,
        }}
      />
    </Section>
  );
});
