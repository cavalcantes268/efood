import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: #FFF8F2;
    color: #E66767;
    overflow-x: hidden;
  }

  button, input {
    font-family: 'Roboto', sans-serif;
  }
`