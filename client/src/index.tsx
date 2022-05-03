import { render } from "react-dom";
import "./custom.scss";
import "./index.css";
import { Router } from "./interface/routes/router";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");
render(<Router />, rootElement);

serviceWorkerRegistration.unregister();

reportWebVitals();
