import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Log in</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin(username, password);
          setUsername("");
          setPassword("");
        }}
      >
        <div>
          username
          <input
            type="text"
            className="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            className="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
