import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../../comps/Button'
import NavBar from '../../comps/Nav'
import MyTrack from '../../comps/TrackInfo'

import Playlist from '../../comps/Playlist'
import SbButton from '../../comps/SbButton'
import Toggle from '../../comps/Toggle'
import MyText from '../../comps/Text'
import { themes } from '../../utils/variables'
import { useTheme, useTitle, useHeader, usePar } from '../../utils/provider'
import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'
import MySwitch from '../../comps/Switch'
import Slider from '../../comps/Slider'
import UserInfo from '../../comps/UserInfo'
import { useState } from 'react'



const Page = styled.div`
  display:flex;
  flex-direction: row;
  margin:0;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
`;

const Dashboard = styled.div`
    background-color: ${props => props.bg};
    height:100vh;
    width:100%;
    padding:46px 10px 10px 60px;

    

    @media ${device.mobile}{

    }

    @media ${device.tablet}{
    }

    @media ${device.desktop}{
       
    }
`;
const SbCont = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding-left: 30px;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  height:230px;
  padding-left: 30px;
  position: relative;
  top:-20px;
`;
const SliderCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  justify-content: space-evenly;
  padding-left: 30px;
`;

const SpaceCont = styled.div`
display: flex;
width: 90%;
padding-left: 5px;

justify-content: space-between;
`;

const RegCont = styled.div`
  padding-left: 30px;
`;

const Divider = styled.div`
    background-color: ${props => props.color};
    width:90%;
    height:1px;
`;


export default function User() {

    //this will be replaced with data from db

    const { theme } = useTheme();
    const [selected, setSelected] = useState(null);
    const { titleSize } = useTitle();
    const { headerSize } = useHeader();
    const { parSize } = usePar();

    const [addedRecent, setAddedRecent] = useState(true)

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

                    <UserInfo />
                    <MyText
                        text='Playlists'
                        size={`${headerSize}px`}
                    />
                    <SbCont>
                        {/* map this out: */}
                        <Playlist
                            cover='/playlistLiked.png'
                            onClick={() => setSelected('liked')}
                            bg={selected === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'liked' || null ? themes[theme].text : themes[theme].acent}
                            text='liked'
                        />
                        <Playlist
                            cover='/playlistRap.png'
                            onClick={() => setSelected('rap')}
                            bg={selected === 'rap' ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'rap' ? themes[theme].text : themes[theme].accent}
                            text='rap'
                        />
                        <Playlist
                            cover='/playlistPop.png'
                            onClick={() => setSelected('pop')}
                            bg={selected === 'pop' ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'pop' ? themes[theme].text : themes[theme].accent}
                            text='pop'
                        />
                        <Playlist
                            cover='/playlistIndie.png'
                            onClick={() => setSelected('indie')}
                            bg={selected === 'indie' ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'indie' ? themes[theme].text : themes[theme].accent}
                            text='indie'
                        />

                    </SbCont>
                    <SpaceCont>
                        <MyText
                            text={selected === null ? 'liked' : selected}
                            size={`${headerSize}px`}
                        />
                        <MyButton
                            onClick={() => setAddedRecent(!addedRecent)}
                            text={addedRecent ? 'See oldest ' : 'See newest'}
                        />

                    </SpaceCont>

                    <Divider
                        color={themes[theme].text} />
                    <br></br>

                    <RegCont>
                        <MyTrack />
                        <MyTrack />
                        <MyTrack />
                    </RegCont>



                </Dashboard>
            </Page>
        </>
    )
}
