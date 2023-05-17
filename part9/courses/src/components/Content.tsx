import { Part } from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};
