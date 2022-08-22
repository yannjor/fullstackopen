import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const content = event.target.anecdote.value;
          event.target.anecdote.value = "";
          const newAnecdote = await anecdoteService.createNew(content);
          dispatch(addAnecdote(newAnecdote));
          dispatch(setNotification(`added anecdote "${content}"`));
          setTimeout(() => dispatch(clearNotification()), 5000);
        }}
      >
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
