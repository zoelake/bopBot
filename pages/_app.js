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



  if (typeof window !== 'undefined') {
    const router = useRouter();
    const page = router.asPath;
    const { name, setName } = useName();
    const { id, setId } = useId();
    useEffect(() => {
      if (localStorage.getItem('name')) {
        console.log('user loged in')
        setName(localStorage.getItem('name'))
        setId(localStorage.getItem('id'))

      } else {
        router.push('/login')
      }
    }, [page])

  }


  return <MyThemeProvider>
    <GlobalStyle />
    <Component {...pageProps} />
    {/* <BopBot/> */}
  </MyThemeProvider>


}

export default MyApp
