import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/bootstrap.min.css";
import "./styles/animate.min.css";
import "./styles/fontawesome-all.min.css";
import "./styles/swiper-bundle.min.css";
import "./styles/default.css";
import "./styles/aos.css";
import "./styles/global.css";
import "./styles/responsive.css";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);
