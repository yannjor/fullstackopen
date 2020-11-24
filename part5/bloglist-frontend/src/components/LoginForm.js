import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
