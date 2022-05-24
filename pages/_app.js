import '../styles/globals.css'
import MyThemeProvider, { usePage, useName, useId, useEmail } from '../utils/provider'
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
  const { email, setEmail } = useEmail();


  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      return;
    } else {
      router.push('/login')
    }
  }, []);



  return <MyThemeProvider>
    <GlobalStyle />
    <Component {...pageProps} />
    {/* <BopBot/> */}
  </MyThemeProvider>


}

export default MyApp
