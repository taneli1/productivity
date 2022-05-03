import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../data/hooks/useAuth";
import { Result } from "../../data/result";
import { ResultWrapper } from "../components/resultWrapper";

const Login = () => {
  const navigate = useNavigate();
  const [isRegisterForm, setIsRegisterForm] = React.useState(false);
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login, user, register } = useAuth();

  React.useEffect(() => {
    if (user?.data) {
      navigate("/home");
    }
  }, [navigate, user]);

  const onSubmit = () => {
    const credentials = { username, password };

    if (isRegisterForm) {
      register(credentials);
    } else {
      login(credentials);
    }
  };

  const passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const usernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const changeForm = (e: any) => {
    e.preventDefault();
    setIsRegisterForm(!isRegisterForm);
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
      <ResultWrapper result={user ?? Result.idle()}>
        <h2 className="pb-5 text-center">
          {isRegisterForm ? "Register" : "Login"}
        </h2>
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
          {isRegisterForm ? "Create account" : "Login"}
        </button>

        <div className="text-center">
          <p>
            {isRegisterForm ? "Have an account?" : "No account?"}
            <button className="btn btn-link" onClick={changeForm}>
              {isRegisterForm ? "Login" : "Create one"}
            </button>
          </p>
        </div>
      </ResultWrapper>

      {user?.isError() && (
        <button className="btn btn-primary text-white">Try again</button>
      )}
    </form>
  );
};

export default Login;
