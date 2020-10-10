import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'Poppins', 'Raleway', sans-serif;
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6, p, ul, li, body {
        margin: 0;
        padding: 0;
    }

    p {
        font-size: 16px;
    }

    .active {
  display: block;
}
`;

export default GlobalStyles;