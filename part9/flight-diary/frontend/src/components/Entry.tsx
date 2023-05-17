import { DiaryEntry } from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

export const Entry = (props: EntryProps): JSX.Element => {
  return (
    <div>
      <h4>{props.entry.date}</h4>
      <p>Visibility: {props.entry.visibility}</p>
      <p>Weather: {props.entry.weather}</p>
      {props.entry.comment && <p>Comment: {props.entry.comment}</p>}
    </div>
  );
};
