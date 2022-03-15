import '../styles/globals.css'
import MyThemeProvider, { usePage, useName } from '../utils/provider'
import "./_app.css"
import { createGlobalStyle } from 'styled-components';
import NavBar from '../comps/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Login from '../comps/LoginAccount';


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

  const router = useRouter();
  const page = router.params;
  const {name} = useName();

  useEffect(() => {
    if (localStorage.getItem('name')) {
      console.log('user loged in')

    } else {
      router.push('/login')
    }
  }, [page])


  return <MyThemeProvider>
    <GlobalStyle />
    <Component {...pageProps} />
  </MyThemeProvider>


}

export default MyApp
