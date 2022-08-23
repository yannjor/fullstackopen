import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const content = event.target.anecdote.value;
          event.target.anecdote.value = "";
          props.createAnecdote(content);
          props.setNotification(`added anecdote "${content}"`, 5000);
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

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
