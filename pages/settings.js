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
import { useTheme, useTitle, useHeader, usePar, useExplicit, useSbSize } from "../utils/provider"; import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import ThemeToggle from '../comps/ThemeToggle'
import { useState } from 'react'
import { Switch, FormControlLabel } from '@mui/material'



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






export default function Settings() {

  const { theme, setTheme } = useTheme();
  const [themeCol, setThemeCol] = useState(theme);
  const { titleSize, setTitleSize } = useTitle();
  const { headerSize, setHeaderSize } = useHeader();
  const { parSize, setParSize } = usePar();
  const { explicit, setExplicit } = useExplicit();
  const { sbSize, setSbSize } = useSbSize();

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


  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="#" />
      </Head>
      <Page>
        <Dashboard
          bg={themes[theme].contrast}>
          <MyText
            weight={500}
            text={`Settings`}
            size={`${titleSize}px`} />
          <Cont>
            <HalfCont flex={1}>
              <QuartCont height={2}>
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


            </HalfCont>
          </Cont>

        </Dashboard>
      </Page>


    </>
  )
}
