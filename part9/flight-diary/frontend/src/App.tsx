import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { Entry } from "./components/Entry";
import axios from "axios";

const App = (): JSX.Element => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const baseUrl = "http://localhost:3001/api/diaries";

  useEffect(() => {
    axios.get<DiaryEntry[]>(baseUrl).then((response) => {
      setEntries(response.data);
    });
  }, []);

  const handleAddEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: DiaryEntry = {
      id: entries.length + 1,
      date,
      visibility,
      weather,
      comment,
    };

    axios
      .post<DiaryEntry>(baseUrl, newEntry)
      .then((response) => {
        setEntries(entries.concat(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddEntry}>
        <div>
          Date:
          <input type="date" onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          Visibility: Great
          <input
            type="radio"
            value="great"
            checked={visibility === "great"}
            onChange={({ target }) => setVisibility(target.value)}
          />
          Good
          <input
            type="radio"
            value="good"
            checked={visibility === "good"}
            onChange={({ target }) => setVisibility(target.value)}
          />
          Ok
          <input
            type="radio"
            value="ok"
            checked={visibility === "ok"}
            onChange={({ target }) => setVisibility(target.value)}
          />
          Poor
          <input
            type="radio"
            value="poor"
            checked={visibility === "poor"}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          Weather: Sunny
          <input
            type="radio"
            value="sunny"
            checked={weather === "sunny"}
            onChange={({ target }) => setWeather(target.value)}
          />
          Rainy
          <input
            type="radio"
            value="rainy"
            checked={weather === "rainy"}
            onChange={({ target }) => setWeather(target.value)}
          />
          Cloudy
          <input
            type="radio"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={({ target }) => setWeather(target.value)}
          />
          Stormy
          <input
            type="radio"
            value="stormy"
            checked={visibility === "stormy"}
            onChange={({ target }) => setWeather(target.value)}
          />
          Windy
          <input
            type="radio"
            value="windy"
            checked={visibility === "windy"}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          Comment:
          <input
            type="text"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Diary entries </h2>
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default App;
