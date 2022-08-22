import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote.id));
                dispatch(setNotification(`you voted "${anecdote.content}"`));
                setTimeout(() => dispatch(clearNotification()), 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
