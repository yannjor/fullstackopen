interface HeaderProps {
  courseName: string;
}

export const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>;
};
