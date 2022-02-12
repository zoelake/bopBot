import '../styles/globals.css'
import MyThemeProvider from '../utils/provider'
import "./_app.css"
import { createGlobalStyle } from 'styled-components';
import NavBar from '../comps/Nav';

const GlobalStyle = createGlobalStyle`
//fonts
html {
  font-family: 'Be Vietnam Pro', sans-serif;
}

`;

function MyApp({ Component, pageProps }) {
  return <MyThemeProvider>
    <GlobalStyle />
    <Component {...pageProps} />
    {/* <NavBar /> */}

  </MyThemeProvider>
}

export default MyApp
