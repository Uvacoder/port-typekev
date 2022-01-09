/**
 *
 * WorkplaceLink
 *
 */
import Link from "next/link";
import { memo, ComponentPropsWithoutRef } from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { FocusedText } from "components/FocusedText";
import { Section, Workplace } from "types.d";

interface Props extends ComponentPropsWithoutRef<typeof FocusedText> {
  workplace: Workplace;
}

export const WorkplaceLink = memo(
  ({ workplace, active, children, ...rest }: Props) => (
    <Tooltip
      followCursor
      disableTouchListener
      title={
        <>
          <h2>{TITLE[workplace]}</h2>
          <h3>{TECH[workplace]}</h3>
        </>
      }
    >
      <Button variant="text">
        <Link href={`/${Section.work}/${workplace}`} passHref shallow>
          <FocusedText active={active} {...rest}>
            {children}
          </FocusedText>
        </Link>
      </Button>
    </Tooltip>
  )
);

WorkplaceLink.displayName = WorkplaceLink.name;

const TITLE: Record<Workplace, string> = {
  [Workplace.Emailtree]: "AI Lead and Principal Software Engineer",
  [Workplace.Devoteam]: "AI Solution Leader and Lead Software Engineer",
  [Workplace.Microsoft]: "AI Solutions Consultant",
  [Workplace.Deloitte]: "Lead Software Engineer Consultant",
  [Workplace.EIB]: "Senior Software Engineer Consultant",
  [Workplace.PwC]: "Senior Software Engineer Consultant",
};

const TECH: Record<Workplace, string> = {
  [Workplace.Emailtree]: "TypeScript, Python, Go, Java, SQL, Azure",
  [Workplace.Devoteam]:
    "TypeScript, Python, Go, Java, C#, MongoDB, SQL, AWS, Azure",
  [Workplace.Microsoft]: "Python, Cosmos DB, Azure",
  [Workplace.Deloitte]: "TypeScript, C#, SQL",
  [Workplace.EIB]: "JavaScript, Java",
  [Workplace.PwC]: "JavaScript",
};
