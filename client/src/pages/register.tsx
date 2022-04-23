import { Link } from "react-router-dom";
import "../login.css";

const Register = () => {
  return (
    <form
      className="container card px-5 py-4"
      style={{
        maxWidth: 500,
        position: "absolute",
        alignSelf: "center",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2 className=" pb-5 text-center">Register</h2>
      <div className="form-outline mb-2">
        <input type="text" id="form2Example1" className="form-control" />
        <label className="form-label">Username</label>
      </div>

      <div className="form-outline mb-2">
        <input type="password" id="form2Example2" className="form-control" />
        <label className="form-label">Password</label>
      </div>

      <div className="row mb-2"></div>

      <button type="button" className="btn btn-primary btn-block mb-4">
        Create an account
      </button>

      <div className="text-center">
        <p>
          Already have an account?
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
