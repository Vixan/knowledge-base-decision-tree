import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
