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
import { useTheme, useTitle, useHeader, usePar, useGenre } from "../utils/provider";
import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

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

const SbCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 630px;
  height:180px;
  justify-content: space-evenly;
  padding-left: 30px;
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
  overflow-y: scroll;
  height:160px;
`;
const Divider = styled.div`
    background-color: ${props => props.color};
    width:90%;
    height:1px;
`;

var timer = null;

export default function Home() {

  //theme states
  const { theme } = useTheme();
  const { titleSize } = useTitle();
  const { headerSize } = useHeader();
  const { parSize } = usePar();

  //genre genre
  const [genre, setGenre] = useState(null)



  //slider values
  const [acValue, setAcValue] = useState(0);
  const [dncValue, setDncValue] = useState(0);
  const [enValue, setEnValue] = useState(0);
  const [instValue, setInstValue] = useState(0);
  const [ldValue, setLdValue] = useState(0);
  const [tpValue, setTpValue] = useState(0);



  // useEffect(() => {
  //   inputFilter();
  // }, [genre, 
  //   // acValue, dncValue, enValue, instValue, ldValue, tpValue
  // ])


  const [tracks, setTracks] = useState([]);

  const inputFilter = async () => {
    console.log('input generated!')
    if (timer === null) {
      timer = setTimeout(async () => {
        const params = {};
        if (genre !== null) {
          params.genre = genre;
        } else if (acValue !== 0) {
          params.acousticness = acValue;
        } else if (dncValue !== 0) {
          params.danceability = dncValue;
        } else if (enValue !== 0) {
          params.energy = enValue;
        } else if (instValue !== 0) {
          params.instrumentals = instValue;
        } else if (ldValue !== 0) {
          params.loudness = ldValue;
        } else if (tpValue !== 0) {
          params.tempo = tpValue;
        }


        const res = await axios.get('/api/tracks', {
          params
        }
        )
        console.log('passed!')
        console.log('tracks have been set:' + res.data)
        setTracks(res.data);

        // console.log(tracks)
        timer = null;
      }, 2000);
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
        <NavBar />

        <Dashboard
          bg={themes[theme].contrast}>
          <MyText
            text={`Welcome {user}!`}
            size={`${titleSize}px`}
          />
          <MyText
            text='Genres'
            size={`${headerSize}px`}
          />

          <SbCont>
            <SbButton
              onClick={() => setGenre('country')}
              color={genre === 'country' ? themes[theme].accent1 : themes[theme].highlight}
              text='Country' />
            <SbButton
              onClick={() => setGenre('dance')}
              color={genre === 'dance' ? themes[theme].accent1 : themes[theme].highlight}
              text='Dance' />
            <SbButton
              onClick={() => setGenre('hipHop')}
              color={genre === 'hipHop' ? themes[theme].accent1 : themes[theme].highlight}
              text='Hip Hop' />
            <SbButton
              onClick={() => setGenre('house')}
              color={genre === 'house' ? themes[theme].accent1 : themes[theme].highlight}
              text='House' />
            <SbButton
              onClick={() => setGenre('indie')}
              color={genre === 'indie' ? themes[theme].accent1 : themes[theme].highlight}
              text='Indie' />
            <SbButton
              onClick={() => setGenre('jazz')}
              color={genre === 'jazz' ? themes[theme].accent1 : themes[theme].highlight}
              text='Jazz' />
            <SbButton
              onClick={() => setGenre('kPop')}
              color={genre === 'kPop' ? themes[theme].accent1 : themes[theme].highlight}
              text='K-pop' />
            <SbButton
              onClick={() => setGenre('pop')}
              color={genre === 'pop' ? themes[theme].accent1 : themes[theme].highlight}
              text='Pop' />
            <SbButton
              onClick={() => setGenre('metal')}
              color={genre === 'metal' ? themes[theme].accent1 : themes[theme].highlight}
              text='Metal' />
            <SbButton
              onClick={() => setGenre('rb')}
              color={genre === 'rb' ? themes[theme].accent1 : themes[theme].highlight}
              text='R&amp;B' />
            <SbButton
              onClick={() => setGenre('rap')}
              color={genre === 'rap' ? themes[theme].accent1 : themes[theme].highlight}
              text='Rap' />
            <SbButton
              onClick={() => setGenre('raggae')}
              color={genre === 'raggae' ? themes[theme].accent1 : themes[theme].highlight}
              text='Raggae' />
            <SbButton
              onClick={() => setGenre('rock')}
              color={genre === 'rock' ? themes[theme].accent1 : themes[theme].highlight}
              text='Rock' />
            <SbButton
              onClick={() => setGenre('trap')}
              color={genre === 'trap' ? themes[theme].accent1 : themes[theme].highlight}
              text='Trap' />
          </SbCont>

          <MyText
            text='How do you feel?'
            size={`${headerSize}px`}
          />
          <SliderCont>
            <Slider text='Acounticness' value={acValue} onChange={(ev) => setAcValue(ev.target.value)} />
            <Slider text='Danceability' value={dncValue} onChange={(ev) => setDncValue(ev.target.value)} />

            <Slider text='Energy' value={enValue} onChange={(ev) => setEnValue(ev.target.value)} />
            <Slider text='Instrumentals' value={instValue} onChange={(ev) => setInstValue(ev.target.value)} />
            <Slider text='Loudness' value={ldValue} onChange={(ev) => setLdValue(ev.target.value)} />
            <Slider text='Tempo' max={240} step={80} value={tpValue} onChange={(ev) => setTpValue(ev.target.value)} />
          </SliderCont>
          <SpaceCont>
            <MyText
              text='Generated Tracks'
              size={`${headerSize}px`}
              color={themes[theme].focus}
            />
            <MyButton
              onClick={inputFilter}
              text='generate' />
          </SpaceCont>
          <RegCont>

            <Divider />
          </RegCont>
          <RegCont>
            <MyText
              text={tracks !== [] ? 'Tracks not yet generated' : 'Generated Tracks:'}
              size={`${parSize}px`}
            />
            <div style={{ height: '80%', overflow: 'scroll' }}>

              {tracks.map((o, i) => <MyTrack
                key={i}
                artist={o.Artist}
                song={o.Title}
                album={o.Album}
                time={((o.duration_ms / 1000) / 60).toFixed(2)}
              // time={((o.duration_ms / 1000) / 60)}
              />)}
            </div>
            {/* {tracks.map((o, i) => <div>
           <p>title: </p>{o.Title}
           <p>ac: </p>{o.acoustics}
            </div>)} */}
          </RegCont>


          {/* <MyTrack /> */}


        </Dashboard>


      </Page>
    </>
  )
}
