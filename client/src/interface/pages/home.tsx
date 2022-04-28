import { str_home } from "../../assets/strings";
import { Header } from "./../components/header";

export const Home = () => {
  return (
    <div className="container p-3">
      <Header text={str_home} />
      <div className="d-flex justify-content-between p-5">
        <p>Time stuff</p>
        <p>Time stuff</p>
      </div>
    </div>
  );
};
