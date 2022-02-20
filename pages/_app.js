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
body{
  margin:0;
}

`;

function MyApp({ Component, pageProps }) {
  return <MyThemeProvider>
    <GlobalStyle />
    <NavBar />
    <Component {...pageProps} />
  </MyThemeProvider>
}

export default MyApp
