import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../comps/Button'
import NavBar from '../comps/Nav'
import MyTrack from '../comps/TrackInfo'

import Playlist from '../comps/Playlist'
import SbButton from '../comps/SbButton'
import Toggle from '../comps/Toggle'
import MyText from '../comps/Text'
import { themes } from '../utils/variables'
import { useTheme, useTitle, useHeader, usePar, useExplicit, useSbSize, useName, useEmail, } from "../utils/provider"; import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import ThemeToggle from '../comps/ThemeToggle'
import { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'



const Page = styled.div`
  display:flex;
  flex-direction: row;
  margin:0;
  justify-content: space-between;
`;

const Dashboard = styled.div`
    background-color: ${props => props.bg};
    height:95vh;
    width:100%;
    padding:30px 10px 10px 60px;

    @media ${device.mobile}{

    }

    @media ${device.tablet}{
    }

    @media ${device.desktop}{
       
    }
`;

const Cont = styled.div`
  display: flex;
  flex-direction: row;
`;

const HalfCont = styled.div`
  flex:${props => props.flex};
  height:80vh;
  /* border:3px solid red; */
  padding:10px 10px 10px 30px;
  display: flex;
  flex-direction: column;
  align-content: space-between;

`;

const QuartCont = styled.div`
  flex: ${props => props.height};
  /* border:2px solid blue; */
  padding-top:${props => props.padding};
`;

const Divider = styled.div`
  height:80vh;
  width:2px;
  background-color: ${props => props.col};

`;

const InputCont = styled.div`
    width:80%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    padding:5px;
    border-radius: 5px;
    background-color: #fff;
`;

const LoginInput = styled.input`
    border-radius: 5px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:1.5px solid #8B64FA;
    margin:5px;
    padding:0 10px;
    width:90%;
`;

const ButtonCont = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    text-align:center ;
`;



export default function Settings() {

  const router = useRouter();

  //visual states
  const { theme, setTheme } = useTheme();
  const [themeCol, setThemeCol] = useState(theme);
  const { titleSize, setTitleSize } = useTitle();
  const { headerSize, setHeaderSize } = useHeader();
  const { parSize, setParSize } = usePar();
  const { explicit, setExplicit } = useExplicit();
  const { sbSize, setSbSize } = useSbSize();
  //user states
  const { name, setName } = useName();
  const { email, setEmail } = useEmail();

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('name')) {
      setName(localStorage.getItem('name'))
    }
    if (localStorage.getItem('email')) {
      setEmail(localStorage.getItem('email'))
    }

  }
  const [updatedName, setUpdatedName] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState(null);

  let title = titleSize;
  let header = headerSize;
  let par = parSize;
  let sb = sbSize;

  function increaseFont() {
    if (par == 24) {
      setParSize(24);
      setSbSize(120)
    }
    else if (header == 30) {
      setHeaderSize(30);
    }
    else if (title == 42) {
      setParSize(42);
    } else {
      setTitleSize(title += 2)
      setHeaderSize(header += 2)
      setParSize(par += 2)
      setSbSize(sb += 12)
    }

  }
  function decreaseFont() {
    if (par == 12) {
      setParSize(12);
      setSbSize(50)
    }
    else if (header == 18) {
      setHeaderSize(18);
    }
    else if (title == 30) {
      setParSize(30);
    } else {
      setTitleSize(title -= 2)
      setHeaderSize(header -= 2)
      setParSize(par -= 2)
      setSbSize(sb -= 12)
    }

  }

  //user info updates
  function HandleName(value) {
    setUpdatedName(value)
    console.log(updatedName)
  }
  function HandleEmail(value) {
    setUpdatedEmail(value)
    console.log(updatedEmail)
  }






  function UpdateName() {
    const updateName = {
      name: localStorage.getItem('name'),
      newName: updatedName,
    }
    console.log('current name: ' + localStorage.getItem('name'))
    console.log('updated name: ' + updatedName)
    axios.post('http://localhost:3001/update-userName', updateName)
      .then((res) => {
        if (res) {
          console.log('returned name: ' + res.data)
          localStorage.setItem('name', res.data)
          setName(res.data)
        } else {
          console.log('something went wrong')
        }
      })
      .catch(e => {
        console.log(e)
      })

  }

  function UpdateEmail() {
    const updateEmail = {
      email: localStorage.getItem('email'),
      newEmail: updatedEmail,
    }
    console.log('current name: ' + localStorage.getItem('email'))
    console.log('updated name: ' + updatedEmail)
    axios.post('http://localhost:3001/update-userEmail', updateEmail)
      .then((res) => {
        if (res) {
          console.log('returned email: ' + res.data)
          localStorage.setItem('email', res.data)
          setEmail(res.data)
        } else {
          console.log('something went wrong')
        }
      })
      .catch(e => {
        console.log(e)
      })

  }

  function HandleLogout() {
    setEmail(null)
    setName(null)
    localStorage.clear();
    router.push('/login')
  }


  //user info updates end


  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="#" />
      </Head>
      <NavBar />
      <Page>
        <Dashboard
          bg={themes[theme].contrast}>
          <MyText
            weight={500}
            text={`Settings`}
            size={`${titleSize}px`} />
          <Cont>
            <HalfCont flex={1}>
              <QuartCont height={2.5}>
                <MyText
                  text='Themes'
                  size={`${headerSize}px`}
                />
              </QuartCont>
              <QuartCont height={1}>
                <MyText
                  text='Font size'
                  size={`${headerSize}px`}
                />
              </QuartCont>
              <QuartCont height={1}>
                <MyText
                  text='Explicit content'
                  size={`${headerSize}px`}
                />
              </QuartCont>

              <QuartCont height={1}>
                <MyText
                  text='Update account details'
                  size={`${headerSize}px`}
                />
              </QuartCont>




            </HalfCont>
            <Divider
              col={themes[theme].text}
            />
            <HalfCont flex={2}>
              <QuartCont padding={'24px'} height={2}>


                <ThemeToggle
                  radioClick={() => setTheme('dark')}
                  mode='Dark Mode'
                  theme1={themes.dark.accent}
                  theme2={themes.dark.contrast}
                  inner={theme === 'dark' ? true : false}

                />
                <ThemeToggle
                  radioClick={() => setTheme('light')}
                  mode='Light Mode'
                  theme1={themes.light.accent}
                  theme2={themes.light.contrast}
                  inner={theme === 'light' ? true : false}
                />
                <ThemeToggle
                  radioClick={() => setTheme('retro')}
                  mode='Retro'
                  theme1={themes.retro.contrast}
                  theme2={themes.retro.accent}
                  inner={theme === 'retro' ? true : false}
                />
                <ThemeToggle
                  radioClick={() => setTheme('funky')}
                  mode='Funk'
                  theme1={themes.funky.contrast}
                  theme2={themes.funky.mid}
                  inner={theme === 'funky' ? true : false}
                />
              </QuartCont>
              <QuartCont height={1}>
                <MyText
                  size={`${parSize}px`}
                  text={'Text will now be ✨THIS✨ big'}
                />
                <Toggle
                  increase={increaseFont}
                  decrease={decreaseFont}
                />

              </QuartCont>
              <QuartCont height={1}>
                <FormControlLabel control={
                  <Switch
                    onChange={() => setExplicit(!explicit)}
                  />} label={explicit ? 'Allowed' : 'Disabled'} />
              </QuartCont>
              <QuartCont>
                <MyText
                  size={`${parSize}px`}
                  text={`Current name: ${name}`}
                />
                <LoginInput placeholder='Enter new name...' onChange={(e) => HandleName(e.target.value)} />
                <button onClick={UpdateName}>Update name</button>
                <MyText
                  size={`${parSize}px`}
                  text={`Current email: ${email}`}
                />
                <LoginInput placeholder='Enter new email...' onChange={(e) => HandleEmail(e.target.value)} />
                <button onClick={UpdateEmail}>Update email</button>


              </QuartCont>


            </HalfCont>
          </Cont>
          <MyButton
            text='Logout'
            onClick={HandleLogout}
          />


        </Dashboard>
      </Page>


    </>
  )
}
