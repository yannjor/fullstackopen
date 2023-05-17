import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = (props: PartProps): JSX.Element => {
  // return <div></div>;
  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {props.part.name} {props.part.exerciseCount}
          </strong>
        </p>
      );
    case "description":
      return (
        <p>
          <div>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </div>
          <em>{props.part.description}</em>
        </p>
      );
    case "group":
      return (
        <p>
          <div>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </div>
          Number of group projects: {props.part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <div>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </div>
          Backgroud material: {props.part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <div>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{props.part.description}</em>
          </div>
          Required skills: {props.part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(props.part);
  }
};
