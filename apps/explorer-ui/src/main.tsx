import { ThemeProvider } from "./app/contexts/theme";
import { ApplicationProvider } from "./app/contexts/application";
import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { GlobalStyle, GlobalFontStyle } from "./globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ApplicationProvider>
          <ThemeProvider>
            <App />
            <GlobalFontStyle />
            <GlobalStyle />
          </ThemeProvider>
        </ApplicationProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
