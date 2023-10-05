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
import { AddTrackToPlaylist, AddTrackToLiked, DeleteTrackFromLiked, RemoveTrackFromPlaylist } from '../utils/backendFunctions';

import { v4 as uuidv4 } from 'uuid';

import EditPlaylist from '../comps/EditPlaylistModal'
import TrackAddedPopup from '../comps/TrackAddedPopup'

import Lottie from "lottie-react"
import loadingAnim from '../public/lottie/bopbot_load.json'
//lottie
import { Page, Dashboard, SbCont, SliderCont, Divider, TracksCont, TrackScoll } from '../pageComps/Dashboard';


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
  const [load, setLoad] = useState(false);
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
    const user = {
      user: localStorage.getItem('email')
    }
    axios.post(`${host}/get-playlists`, user)
      .then((res) => res.status == 200 && setUserPlaylists(res.data.playlists))
      .catch(e => console.log(e));
  }

  const filterTracks = () => {
    let ldVforNegative = null;
    setLoad(true)

    if (ldValue == 100 || ldValue == 99) ldVforNegative = -5;
    else if (ldValue == 66) ldVforNegative = -10;
    else ldVforNegative = -25;

    const filters = {
      Genre: genre,
      acoustics: acValue / 100,
      danceability: dncValue / 110,
      energy: enValue / 100,
      instrumentalness: instValue / 100,
      loudness: ldVforNegative,
      tempo: tpValue
    }

    axios.post(`${host}/tracks-filter`, filters)
      .then((res) =>{
         if(res.status == 200) {
          setTracks(res.data)
        }
        setLoad(false)
        })
      .catch(e =>{
         alert(e)
         setLoad(false);
        });
  }

  function handleTrackOptions(trackdata) {
    const playlist = localStorage.getItem('selectedPlaylist');
    const request = localStorage.getItem('request');
    if (request == 'add') AddTrackToPlaylist(trackdata, playlist);
    if (request == 'remove') RemoveTrackFromPlaylist(trackdata, playlist);
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
            text={"Tracks:"}
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
              playlists={usersPlaylists}
            />)}
          </TrackScoll>
        </TracksCont>
      </Page>
    </>
  )
}