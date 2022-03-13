import '../styles/globals.css'
import MyThemeProvider, { usePage } from '../utils/provider'
import "./_app.css"
import { createGlobalStyle } from 'styled-components';
import NavBar from '../comps/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MyButton from '../comps/Button';

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
  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('token' !== undefined)) {
        () => setLogin(true)
      } else {
          () => setLogin(false)
          router.push('/login')

      } 
    } else {
      () => setLogin(false)
      router.push('/login')
    }

    console.log(login)

  }, [page])


    return <MyThemeProvider>
      <GlobalStyle />
      <NavBar />
      <Component {...pageProps} />
    </MyThemeProvider>


}

export default MyApp
