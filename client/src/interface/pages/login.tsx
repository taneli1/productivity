import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../data/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login, user } = useAuth();

  React.useEffect(() => {
    if (user?.data) {
      navigate("/home");
    }
  }, [navigate, user]);

  const onSubmit = () => {
    login({ username, password });
  };

  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const usernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  return (
    <form
      style={{
        maxWidth: 500,
        position: "absolute",
        alignSelf: "center",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="container card px-5 py-4"
    >
      <h2 className="pb-5 text-center">Login</h2>
      <div className="form-outline mb-2">
        <input
          value={username}
          onChange={usernameChanged}
          type="text"
          id="form2Example1"
          className="form-control"
        />
        <label className="form-label">Username</label>
      </div>

      <div className="form-outline mb-2">
        <input
          value={password}
          onChange={passwordChanged}
          type="password"
          id="form2Example2"
          className="form-control"
        />
        <label className="form-label">Password</label>
      </div>

      <div className="row mb-2"></div>

      <button
        onClick={onSubmit}
        type="button"
        className="btn btn-primary btn-block mb-4"
      >
        Login
      </button>

      <div className="text-center">
        <p>
          Not a member?
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
