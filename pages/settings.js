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
import { useTheme, useTitle, useHeader, usePar, useExplicit, useSbSize, useName, useEmail, } from "../utils/provider";
import styled from 'styled-components';
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import ThemeToggle from '../comps/ThemeToggle'
import { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Page, Dashboard, Cont, RightCont, LoginInput } from '../pageComps/Settings';

export default function Settings({
  height = "100%"
}) {

  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_URL;

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
  const [updatedPassword, setUpdatedPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);

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
  function HandlePassword(value) {
    setUpdatedPassword(value)
  }
  function HandleOldPassword(value) {
    setOldPassword(value)
  }


  function UpdateName() {
    const updateName = {
      name: localStorage.getItem('name'),
      newName: updatedName,
    }
    console.log('current name: ' + localStorage.getItem('name'))
    console.log('updated name: ' + updatedName)
    axios.post(`${host}/update-userName`, updateName)
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
    axios.post(`${host}/update-userEmail`, updateEmail)
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

  function UpdatePassword() {
    const updatePassword = {
      email: localStorage.getItem('email'),
      password: oldPassword,
      new_password: updatedPassword
    }
    // console.log('current name: ' + localStorage.getItem('email'))
    // console.log('updated name: ' + updatedEmail)
    axios.post(`${host}/update-userPassword`, updatePassword)
      .then(res => {
        if (res) console.log(res.data);
        else console.log('something went wrong');
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
          <Cont>
            <MyText
              weight={500}
              text={`Settings`}
              size={`${titleSize}px`} />
            <MyText
              text='Themes'
              size={`${headerSize}px`}
            />
            <RightCont>

              <ThemeToggle
                radioClick={() => setTheme('dark')}
                mode='Dark Mode'
                theme1={themes.dark.accent}
                theme2={themes.dark.contrast}
                inner={theme == 'dark' ? true : false}

              />
              <ThemeToggle
                radioClick={() => setTheme('light')}
                mode='Light Mode'
                theme1={themes.light.accent}
                theme2={themes.light.contrast}
                inner={theme == 'light' ? true : false}
              />
              <ThemeToggle
                radioClick={() => setTheme('retro')}
                mode='Retro'
                theme1={themes.retro.contrast}
                theme2={themes.retro.accent}
                inner={theme == 'retro' ? true : false}
              />
              <ThemeToggle
                radioClick={() => setTheme('funky')}
                mode='Funk'
                theme1={themes.funky.contrast}
                theme2={themes.funky.mid}
                inner={theme == 'funky' ? true : false}
              />
            </RightCont>

            <MyText
              text='Font size'
              size={`${headerSize}px`}
            />

            <RightCont>
              <MyText
                size={`${parSize}px`}
                text={'Text will now be ✨THIS✨ big'}
              />
              <Toggle
                increase={increaseFont}
                decrease={decreaseFont}
              />

            </RightCont>


            <MyText
              text='Update account details'
              size={`${headerSize}px`}
            />
            <RightCont>

              <MyText
                size={`${parSize}px`}
                text={`Current name: ${name}`}
              />
              <LoginInput placeholder='Enter new name...' onChange={(e) => HandleName(e.target.value)} />
              <MyButton
                onClick={UpdateName}
                width="200px"
                bg={themes[theme].sliderBg}
                text='Update Name'
              >Update email</MyButton>
              <MyText
                size={`${parSize}px`}
                text={`Current email: ${email}`}
              />
              <LoginInput placeholder='Enter new email...' onChange={(e) => HandleEmail(e.target.value)} />
              <MyButton
                onClick={UpdateEmail}
                width="200px"
                bg={themes[theme].sliderBg}
                text='Update Email'
              >Update email</MyButton>


              <MyText
                size={`${parSize}px`}
                text={`Update password`}
              />
              <LoginInput type='password' placeholder='Enter new password...' onChange={(e) => HandlePassword(e.target.value)} />
              <LoginInput type='password' placeholder='Enter old password...' onChange={(e) => HandleOldPassword(e.target.value)} />
              <MyButton
                onClick={UpdatePassword}
                width="200px"
                bg={themes[theme].sliderBg}
                text='Update Password'
              >Update password</MyButton>

            </RightCont>

            <MyButton
              text='Logout'
              onClick={HandleLogout}
            />

          </Cont>


        </Dashboard>
      </Page>


    </>
  )
}