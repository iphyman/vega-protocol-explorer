import { createGlobalStyle } from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import "tippy.js/dist/tippy.css";

export const GlobalFontStyle = () => {
  return (
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export const GlobalStyle = createGlobalStyle`

table {
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.text200};
  margin-bottom: 1rem;

  th {
    color: ${({ theme }) => theme.text200};
    font-weight: 600;
    text-align: left;
    padding: 0.75rem;
    white-space: nowrap;
    background-color: ${({ theme }) => theme.primary400};
    border-bottom: 0.125rem solid ${({ theme }) => theme.bg500};
    border-top: 0.125rem solid ${({ theme }) => theme.bg500};
  }

  td {
    text-align: left;
    padding: 0.75rem;
    white-space: nowrap;
    vertical-align: top;
    border-top: 0.0625rem solid ${({ theme }) => theme.bg500};
  }
}


.tippy-box .tippy-content {
  padding: 0rem;
}

.tippy-box[data-theme~="tooltip"] {
  background-color: ${({ theme }) => theme.bg200};
  color: ${({ theme }) => theme.text200};
  padding: 0.6rem;
  border-radius: 0.5rem;
  .tippy-arrow:before {
    border-top-color: ${({ theme }) => theme.bg200};
  }
}

*, *::before, *::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
}

body {
  overflow-x: hidden;
}

html {
  min-height: 100vh;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg200};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  ::-webkit-scrollbar {
    width: 5px;
    background: #636975;
}
}

`;
