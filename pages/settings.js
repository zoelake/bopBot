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
import { useTheme, useTitle, useHeader, usePar, useGenre, useExplicit } from "../utils/provider";import styled from 'styled-components';
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
    height:100vh;
    width:100%;
    padding:10px 10px 10px 60px;

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
  const {titleSize, setTitleSize} = useTitle();
  const {headerSize, setHeaderSize} = useHeader();
  const {parSize, setParSize} = usePar();
  const { explicit, setExplicit } = useExplicit();
  
  let title = titleSize;
  let header = headerSize;
  let par = parSize;

  function increaseFont() {
    setTitleSize(title += 2)
    setHeaderSize(header += 2)
    setParSize(par += 2)
  }
  function decreaseFont(){
    setTitleSize(title-=2)
    setHeaderSize(header-=2)
    setParSize(parent-=2)

  }

  //filtering
  const {genre, setGenre} = useGenre();


  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="#" />
      </Head>
      <Page>
        <NavBar />

        <Dashboard
          bg={themes[theme].contrast}>
          <MyText
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
              col={themes[theme].focus}
            />
            <HalfCont flex={2}>
              <QuartCont padding={'24px'} height={2}>


                <ThemeToggle
                  radioClick={() => setTheme('dark')}
                  mode='Dark Mode'
                  theme1={themes.dark.mid}
                  theme2={themes.dark.accent1}
                  inner={theme === 'dark' ? true : false}

                />
                <ThemeToggle
                  radioClick={() => setTheme('light')}
                  mode='Light Mode'
                  theme1={themes.light.mid}
                  theme2={themes.light.accent1}
                  inner={theme === 'light' ? true : false}
                />
                <ThemeToggle
                  radioClick={() => setTheme('retro')}
                  mode='Retro'
                  theme1={themes.retro.mid}
                  theme2={themes.retro.accent1}
                  inner={theme === 'retro' ? true : false}
                />
                <ThemeToggle
                  radioClick={() => setTheme('funky')}
                  mode='Funk'
                  theme1={themes.funky.mid}
                  theme2={themes.funky.accent1}
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

          </HalfCont>
          <HalfCont>
            <ThemeToggle 
            onClick={()=> setTheme('dark')}
            mode='Dark Mode' 
            theme1={themes.dark.mid}
            theme2={themes.dark.accent1}
            display={'circle'}
            innerCol={themes[theme].focus}
            outerCol={themes[theme].focus}
            />  
            <ThemeToggle 
            onClick={()=> setTheme('light')}
            mode='Light Mode' 
            theme1={themes.light.mid}
            theme2={themes.light.accent1}
            display={'circle'}
            innerCol={themes[theme].focus}
            outerCol={themes[theme].focus}
            />  
            <ThemeToggle
            onClick={()=> setTheme('retro')} 
            mode='Retro' 
            theme1={themes.retro.mid}
            theme2={themes.retro.accent1}
            display={'circle'}
            innerCol={themes[theme].focus}
            outerCol={themes[theme].focus}
            />  
            <ThemeToggle 
            onClick={()=> setTheme('funky')}
            mode='Funk' 
            theme1={themes.funky.mid}
            theme2={themes.funky.accent1}
            display={'circle'}
            innerCol={themes[theme].focus}
            outerCol={themes[theme].focus}
            />  
            <Toggle 
              increase={increaseFont}
              decrease={decreaseFont}
            />


          </HalfCont>
        </Cont>
      </Dashboard>

    </>
  )
}
