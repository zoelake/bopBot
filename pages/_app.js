import '../styles/globals.css'
import MyThemeProvider, { usePage, useName, useId } from '../utils/provider'
import "./_app.css"
import { createGlobalStyle } from 'styled-components';
import NavBar from '../comps/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Login from '../comps/LoginAccount';
import BopBot from '../comps/BopBot';


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
  const { name, setName } = useName();
  const { id, setId } = useId();
  let page = null;

  if (typeof window !== 'undefined') {
    const page = router.asPath;
  }
  useEffect(() => {
    if (localStorage.getItem('name')) {
      console.log('user loged in')
      setName(localStorage.getItem('name'))
      setId(localStorage.getItem('id'))

    } else {
      router.push('/login')
    }
  }, [page])


  return <MyThemeProvider>
    <GlobalStyle />
    <Component {...pageProps} />
    {/* <BopBot/> */}
  </MyThemeProvider>


}

export default MyApp
