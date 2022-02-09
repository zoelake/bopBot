import '../styles/globals.css'
import MyThemeProvider from '../utils/provider'
import "./_app.css"
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
//fonts
a, p, h1, h2, h3, span, button {
  font-family: 'Be Vietnam Pro', sans-serif;
}

`;

function MyApp({ Component, pageProps }) {
  return <MyThemeProvider>
    <Component {...pageProps} />
  </MyThemeProvider>
}

export default MyApp
