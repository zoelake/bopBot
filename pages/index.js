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
import { useTheme, useTitle, useHeader, usePar, useSbSize, useName, useId, useEmail } from "../utils/provider";
import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router";
import { getPlaylists, AddTrackToPlaylist, AddTrackToLiked, DeleteTrackFromLiked, RemoveTrackFromPlaylist, filterTracks } from '../utils/backendFunctions';

import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Dropzone from '../comps/Dropzone'
import { v4 as uuidv4 } from 'uuid';

import { io } from "socket.io-client";
import EditPlaylist from '../comps/EditPlaylistModal'
import BopBot from '../comps/BopBot'
import TrackAddedPopup from '../comps/TrackAddedPopup'

import Lottie from "lottie-react"
import loadingAnim from '../public/lottie/bopbot_load.json'
//lottie





const Page = styled.div`
  display:flex;
  margin:0;
  width:100%;
  /* position: absolute; */
  bottom:0;
 
  /* border:8px solid green; */
  @media ${device.mobile}{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100%;
    top:30%;
  }
  @media ${device.tablet}{
    flex-direction: row;
    justify-content: space-between;
    height:95vh;
  }
  @media ${device.desktop}{
    flex-direction: row;
    justify-content: space-between;
    height:95vh;
    top:10%;
  }
`;
const Dashboard = styled.div`
    height:95vh;
    width:60%;
    /* border:5px solid red; */
    @media ${device.mobile}{
      width:90%;
      padding:30px 0px 10px 0px;
      margin-bottom: 200px;
    }
    @media ${device.tablet}{
      width:55%;
      padding:30px 10px 10px 60px;
    }
    @media ${device.desktop}{
      width:55%;
      padding:30px 10px 10px 60px;
    }
`;
const SbCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height:auto;
  justify-content: left;
  /* padding-left: 30px; */
`;
const SliderCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-self: center;
  /* padding-left: 30px; */
  /* border:2px solid green; */
  @media ${device.mobile}{
    width: 100%;
    }
    @media ${device.tablet}{
      width: 60%;
      padding: 0 10%;
    }
    @media ${device.desktop}{
      width: 60%;
      padding: 0 10%;
    }
`;
const TrackScoll = styled.div`
  height:100%;
  /* background-color: #fad; */
  overflow: scroll;
  width: auto;
`;
const TracksCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  height:95vh;

  justify-content: left;
  /* border:2px solid green; */
  @media ${device.mobile}{
    width: 90%;
}
@media ${device.tablet}{
  width: 45%;
  padding: 30px 0 0 30px;
}
@media ${device.desktop}{
  width: 45%;
  padding: 30px 0 0 30px;
}
`;
const Divider = styled.div`
    background-color: ${props => props.color};
    align-self: center;
    width:1px;
    height:90%;
`;

//please fix this styling lol
const Model = styled.div`
  width: 300px;
  height:300px;
  padding:5px;
  position:absolute;
  top:20%;
  left:45%;
  background-color: #fff;
  color:black;
  z-index:1000;
`;

var timer = null;

export default function Home() {

  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_URL;
  // const DEV = host.includes("localhost");
  
  //global styles
  const { theme } = useTheme();
  const { titleSize } = useTitle();
  const { headerSize } = useHeader();
  const { parSize } = usePar();
  const { sbSize } = useSbSize();

  //user info
  const { name, setName } = useName();
  const { email, setEmail } = useEmail();


  //set soundboard values 
  const [genre, setGenre] = useState(null)
  // --- slider values
  const [acValue, setAcValue] = useState(0);
  const [dncValue, setDncValue] = useState(0);
  const [enValue, setEnValue] = useState(0);
  const [instValue, setInstValue] = useState(0);
  const [ldValue, setLdValue] = useState(0)
  const [tpValue, setTpValue] = useState(0);

  //toggle models
  const [trackModel, setTrackModel] = useState(false);


  //for updating & loading playlists/tracks
  //---all tracks from api
  const [tracks, setTracks] = useState([]);
  //---is api loading
  const [load, setLoad] = useState(null);
  //---currently selected track (onClick)
  const [selectedTrack, setSelectedTrack] = useState([])
  //---current users playlists
  const [usersPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([])


  useEffect(() => {
    const storedName = localStorage.getItem('name');
    storedName ? setName(storedName) && getPlaylists() : router.push('/login');
  }, [])


  // //API CALLS TO BACKEND
  function getPlaylists() {

    // console.log('GETTING PLAYLISTS')
    const user = {
      user: localStorage.getItem('email')
    }
    axios.post(`${host}/get-playlists`, user)
      .then((res) => {
        if (res.status == 200) {
          // console.log('res.data.playlists')
          // console.log(res.data.playlists)
          setUserPlaylists(res.data.playlists);
        }
      }).catch(e => {
        console.log(e)
      })
  }

  function filterTracks() {
    let ldVforNegative = null;
    setLoad(true)
    if (ldValue == 100 || ldValue == 99) {
      ldVforNegative = -5
    } else if (ldValue == 66) {
      ldVforNegative = -10
    } else {
      ldVforNegative = -25
    }
    const filters = {
      Genre: genre,
      acoustics: acValue / 100,
      danceability: dncValue / 110,
      energy: enValue / 100,
      instrumentalness: instValue / 100,
      loudness: ldVforNegative,
      tempo: tpValue
    }
    // console.log('passing...')

    axios.post(`${host}/tracks-filter`, filters).then(res => {
      if (res.status === 200) {
        // console.log(res.data[1])
        setTracks(res.data)
        setLoad(false)
      }
    }).catch(e => {
      console.log(e);
    });
  }


  function handleTrackOptions(trackdata) {
    const playlist = localStorage.getItem('selectedPlaylist');
    const request = localStorage.getItem('request');
    if (request === 'add') AddTrackToPlaylist(trackdata, playlist);
    if (request === 'remove') RemoveTrackFromPlaylist(trackdata, playlist);
    getPlaylists();
  }


  function setAsLiked(trackdata) {
    AddTrackToLiked(trackdata)
    localStorage.setItem(`track #${trackdata._id}`, trackdata._id)

  }

  function setAsUnliked(trackdata) {
    localStorage.removeItem(`track #${trackdata._id}`)
    DeleteTrackFromLiked(trackdata)
  }


  // function handleTrackOptions(trackdata) {
  //   console.log(trackdata)
  //   //display model
  //   setSelectedTrack(trackdata)
  //   console.log('modle is set to: ' + trackModel)
  //   getPlaylists();
  //   setTrackModel(!trackModel)

  // }

  const genres = ["country", "dance pop", "hipHop", "house", "indie", "jazz", "kPop", "pop", "r&b", "rock"];
  const musical_values = [
    {
      text: 'Acounticness',
      number: acValue,
      onChange: (ev) => setAcValue(ev.target.value)
    },
    {
      text: 'Danceability',
      number: dncValue,
      onChange: (ev) => setDncValue(ev.target.value)
    },
    {
      text: 'Energy',
      number: enValue,
      onChange: (ev) => setEnValue(ev.target.value)
    },
    {
      text: 'Instrumentals',
      number: instValue,
      onChange: (ev) => setInstValue(ev.target.value)
    },
    {
      text: 'Loudness',
      number: ldValue,
      onChange: (ev) => setLdValue(ev.target.value)
    },
    {
      text: 'Tempo',
      number: tpValue,
      max: 225,
      step: 80,
      value: tpValue,
      onChange: (ev) => setTpValue(ev.target.value)
    }
  ];

  // console.log(musical_values);

  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="BopBot is a MERN stack application that filters Spotify's database of songs by musical values, allowing users to discover new music and break out of their usual listening algorithm. Explore tracks by genre and other musical values with BopBot." />
        <link rel="icon" href="#" />
      </Head>
      <NavBar />
      <Page>

        <Dashboard>

          <MyText
            weight={500}
            lineHeight='0'
            text={`Welcome, ${name}!`}
            size={`${titleSize}px`}
          />
          <MyText
            text='Genres'
            size={`${headerSize}px`}
          />

          <SbCont>
            {genres.map((gr, i) => (
              <SbButton
                key={i}
                onClick={() => setGenre(gr)}
                shadow={
                  gr == genre
                    ? "inset 5px 5px 4px rgba(0,0,0,0.25)"
                    : "inset 5px 5px 2px rgba(255,255,255,0.25)"
                }
                width={sbSize}
                color={gr == genre ? themes[theme].sbSelect : themes[theme].altAccent}
                textCol={gr == genre ? themes[theme].white : themes[theme].grey}
                text={gr}
              />
            ))}
          </SbCont>

          <MyText
            text='Music values'
            size={`${headerSize}px`}
          />
          <SliderCont>
            {
              musical_values.map((v, index) => (
                <Slider
                  key={index}
                  text={v.text}
                  number={v.number}
                  max={v.max || 100}
                  step={v.step || 1}
                  onChange={v.onChange}
                />
              ))
            }

          </SliderCont>

          <div style={{
            position: 'relative',
            right: device.mobile ? null : '47%',
            bottom: device.mobile ? null : '2%',
            width: '100%',
            display: 'flex',
            justifyContent: 'right',
          }}>
            <MyButton
              width={device.mobile ? '100%' : 'auto'}
              onClick={filterTracks}
              text='generate'
            />
          </div>
        </Dashboard>

        <Divider color={themes[theme].text} />

        <TracksCont>

          <MyText
            text={load ? 'Generated Tracks:' : 'Tracks not yet generated'}
            size={`${headerSize}px`}
          />

          {/* loaded tracks from api call */}
          <TrackScoll>
            {load && <Lottie animationData={loadingAnim} />}
            {tracks.map((o, i) => <MyTrack
              key={i}
              selected={o._id}
              onTrackClick={() => router.push(o.Uri)}
              AddToLikedPlaylist={(obj) => setAsLiked(o)}
              DeleteFromLikedPlaylist={(obj) => setAsUnliked(o)}
              OpenOptions={(obj) => handleTrackOptions(o)}
              artist={o.Artist}
              song={o.Title}
              album={o.Album}
              time={((o.duration_ms / 1000) / 60).toFixed(2)}
            />)}
          </TrackScoll>
        </TracksCont>
      </Page>
    </>
  )
}