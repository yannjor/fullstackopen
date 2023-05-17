interface TotalProps {
  courseParts: { name: string; exerciseCount: number }[];
}

export const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
