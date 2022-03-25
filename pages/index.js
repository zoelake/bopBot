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
import { useTheme, useTitle, useHeader, usePar, useSbSize, useName } from "../utils/provider";
import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import MySwitch from '../comps/Switch'
import Slider from '../comps/Slider'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/router";
import { getPlaylists, AddTrackToPlaylist, AddTrackToLiked, SetTracksAsFavourite, DeleteTrackFromLiked, SetTracksAsUnfavourite, RemoveTrackFromPlaylist } from '../utils/backendFunctions';

import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Dropzone from '../comps/Dropzone'
import { v4 as uuidv4 } from 'uuid';

import { io } from "socket.io-client";
import EditPlaylist from '../comps/EditPlaylistModal'
import BopBot from '../comps/BopBot'





const Page = styled.div`
  display:flex;
  width:100%;
  position: absolute;
  height: 100%;

  bottom:0;
  /* border:8px solid green; */

  @media ${device.mobile}{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100%;
    top:20%;
  }

  @media ${device.tablet}{
    flex-direction: row;
    // height:95vh;
  }

  @media ${device.desktop}{
    margin:0;
    flex-direction: row;
    justify-content: space-between;
    // height:95vh;
  }

`;
const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    justify-content: center;

    @media ${device.mobile}{
      width:90%;
      margin-top: 700px;
      // padding: 0px 0px 50px 0px;
      // margin-bottom: 200px;

    }

    @media ${device.tablet}{
      width: 100vw;
      height:100vh;
      margin-top: 200px;
    }

    @media ${device.desktop}{
      padding-top: 150px;
      height:100vh;
      width:100vw;
      margin-left: 20px;
      margin-top: 10px;
    }
`;

const SbCont = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
align-self: center;
justify-content: center;


  @media ${device.mobile}{

    max-width: 100%;
    height: 50vh;
    flex-grow: 1;
    // padding: 30px 0px 10px 5px;
    // background-color: pink;

    }

    @media ${device.tablet}{
      width: 100%;
    }

    @media ${device.desktop}{
      max-width: 90%;
      align-items: center;
      align-self: center;
      justify-content: center;
      height: 50vh;
      // background-color: pink;

    }
`;


const SliderCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-self: center;
  height: 100vh;

  @media ${device.mobile}{
    width: 100%;
    height: 70vh;
    // padding: 30px 0px 10px 5px;

    }

    @media ${device.tablet}{
      width: 100%;
      height: 100%;
    }

    @media ${device.desktop}{
      width: 70%;
      padding: 0 10%;

    }
`;
const TrackScoll = styled.div`
  max-height: 80vh;
  overflow: scroll;
  width: 50%;
  scrollbar-color: blue;
`;
const TracksCont = styled.div`
  display: flex;
  flex-wrap: wrap;

  height:95vh;
  justify-content: left;
  border:2px solid green;


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

const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  width:  50vw;
  height: 100vh;

    @media ${device.mobile}{
      width:90%;
      height: 80vh;
      // margin-bottom: 200px;
    }

    @media ${device.tablet}{
      width:100%;
      height: 100%;

    }

    @media ${device.desktop}{
      width:50vw;
      padding-top: 50px;
      flex-grow: 1;
    }
`;

const Tracks = styled.div`
display: flex;
flex-direction: column;

     @media ${device.mobile}{
        width:100vw;
        height: 80vh;
    }
  
      @media ${device.tablet}{
        width:100%;
        height: 100%;
        // background-color: red;
    }
  
      @media ${device.desktop}{
        width:30vw;
        height: 100vh;
        padding:30px 10px 10px 60px;
        flex-grow: 2;
    }
  
`;

const BotCont = styled.div`
  display: flex;
  flex-grow: 1; 
  padding:30px 10px 10px 60px;
`;

const Divider = styled.div`
    background-color: ${props => props.color};
    align-self: center;
    width:1px;
    height:1250px;
`;

var timer = null;

export default function Home() {

  const router = useRouter();

  //global styles
  const { theme } = useTheme();
  const { titleSize } = useTitle();
  const { headerSize } = useHeader();
  const { parSize } = usePar();
  const { sbSize } = useSbSize();

  //user info
  const { name } = useName();

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

  useEffect(() => {
    getPlaylists()
  }, [])


  // //API CALLS TO BACKEND
  function getPlaylists() {

    console.log('GETTING PLAYLISTS')
    const user = {
      user: localStorage.getItem('email')
    }
    axios.post('https://bopbot-backend.herokuapp.com/get-playlists', user)
      .then((res) => {
        if (res.status == 200) {
          console.log('res.data.playlists')
          console.log(res.data.playlists)
          setUserPlaylists(res.data.playlists);
        }
      }).catch(e => {
        console.log(e)
      })

  }

  // //page functions
  // //---run filter
  const inputFilter = async () => {
    setLoad(true)
    console.log('input generated!')
    if (timer === null) {
      timer = setTimeout(async () => {
        const params = {};
        if (genre !== null) {
          params.genre = genre;
          console.log('genre is ' + genre)
        } if (acValue == 33 || acValue == 66 || acValue == 100) {
          params.acousticness = acValue;
          console.log('ac is: ' + acValue)
        } if (dncValue == 33 || dncValue == 66 || dncValue == 100) {
          params.danceability = dncValue;
          console.log('dnc is: ' + dncValue)
        } if (enValue == 33 || enValue == 66 || enValue == 100) {
          params.energy = enValue;
          console.log('en is: ' + enValue)
        } if (instValue == 100) {
          params.instrumentals = instValue;
          console.log('inst is: ' + instValue)
        } if (ldValue == 33 || ldValue == 66 || ldValue == 100) {
          params.loudness = ldValue;
          console.log('ld is: ' + ldValue)
        } if (tpValue == 80 || tpValue == 160 || tpValue == 240) {
          params.tempo = tpValue;
          console.log('tp is: ' + tpValue)
        }
        const res = await axios.get('/api/tracks', {
          params
        })
        console.log('passed!')
        setTracks(res.data);
        setLoad(false);
        timer = null;
      }, 2000);
    }
  }

  const [selectedPlaylist, setSelectedPlaylist] = useState([])


  function handleTrackOptions(trackdata) {
    console.log(trackdata)
    const playlist = localStorage.getItem('selectedPlaylist')
    const request = localStorage.getItem('request')

    if (request)
      if (request == 'add') {
        console.log(`adding ${trackdata.name} to ${playlist}`)
        AddTrackToPlaylist(trackdata, playlist);
      } else if (request == 'remove') {
        console.log(`removing ${trackdata.name} from ${playlist}`)
        RemoveTrackFromPlaylist(trackdata, playlist);
      }

    getPlaylists()
  }


  function SetAndAddTrack(req) {
    console.log('req')
    console.log(req)
    console.log('playlist name: ' + playlist)
    setSelectedPlaylist(playlist)
    AddTrackToPlaylist(selectedTrack, playlist)
  }

  function setAsLiked(trackdata) {
    SetTracksAsFavourite(trackdata)
    AddTrackToLiked(trackdata)
    console.log('THIS IS TRACK ID:')
    console.log(trackdata._id)
  }

  function setAsUnliked(trackdata) {
    SetTracksAsUnfavourite(trackdata)
    DeleteTrackFromLiked(trackdata)

    const [newTracks, setNewTracks] = useState();
    let loadedTracks = null;

    function getTracks() {
      console.log('connecting to database...')
      axios.get('https://bopbot-backend.herokuapp.com/tracks')
        .then((res) => {
          console.log('here are your tracks! ' + res)
          // setNewTracks(res)
          loadedTracks = res.data
          console.log(loadedTracks);

        }).catch(e => {
          console.log(e)
        })
    }

  }


  useEffect(() => {
    getPlaylists()
  }, [])

  function getPlaylists() {
    console.log('GETTING PLAYLISTS')
    const user = {
      user: localStorage.getItem('email')
    }
    axios.post('https://bopbot-backend.herokuapp.com/get-playlists', user)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.playlists)
          setUserPlaylists(res.data.playlists);
          console.log('playlists')
          console.log(usersPlaylists)
        }
      }).catch(e => {
        console.log(e)
      })
    setTrackModel(false)

  }


  function handleTrackOptions(trackdata) {
    console.log(trackdata)
    //display model
    setSelectedTrack(trackdata)
    console.log('modle is set to: ' + trackModel)
    getPlaylists();
    setTrackModel(!trackModel)

  }

  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="Generated by create next app" />
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
            <SbButton
              onClick={() => setGenre('country')}
              shadow={genre == 'country' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'country' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'country' ? themes[theme].white : themes[theme].grey}
              text='Country' />
            <SbButton
              onClick={() => setGenre('dance')}
              shadow={genre == 'dance' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'dance' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'dance' ? themes[theme].white : themes[theme].grey}
              text='Dance' />
            <SbButton
              onClick={() => setGenre('hipHop')}
              shadow={genre == 'hipHop' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'hipHop' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'hipHop' ? themes[theme].white : themes[theme].grey}
              text='Hip Hop' />
            <SbButton
              onClick={() => setGenre('house')}
              shadow={genre == 'house' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'house' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'house' ? themes[theme].white : themes[theme].grey}
              text='House' />
            <SbButton
              onClick={() => setGenre('indie')}
              shadow={genre == 'indie' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'indie' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'indie' ? themes[theme].white : themes[theme].grey}
              text='Indie' />
            <SbButton
              onClick={() => setGenre('jazz')}
              shadow={genre == 'jazz' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'jazz' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'jazz' ? themes[theme].white : themes[theme].grey}
              text='Jazz' />
            <SbButton
              onClick={() => setGenre('kPop')}
              shadow={genre == 'kPop' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'kPop' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'kPop' ? themes[theme].white : themes[theme].grey}
              text='K-pop' />
            <SbButton
              onClick={() => setGenre('pop')}
              shadow={genre == 'pop' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'pop' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'pop' ? themes[theme].white : themes[theme].grey}
              text='Pop' />
            <SbButton
              onClick={() => setGenre('metal')}
              shadow={genre == 'metal' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'metal' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'metal' ? themes[theme].white : themes[theme].grey}
              text='Metal' />
            <SbButton
              onClick={() => setGenre('rb')}
              shadow={genre == 'rb' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'rb' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'rb' ? themes[theme].white : themes[theme].grey}
              text='R&amp;B' />
            <SbButton
              onClick={() => setGenre('rap')}
              shadow={genre == 'rap' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'rap' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'rap' ? themes[theme].white : themes[theme].grey}
              text='Rap' />
            <SbButton
              onClick={() => setGenre('raggae')}
              shadow={genre == 'raggae' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'raggae' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'raggae' ? themes[theme].white : themes[theme].grey}
              text='Raggae' />
            <SbButton
              onClick={() => setGenre('rock')}
              shadow={genre == 'rock' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'rock' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'rock' ? themes[theme].white : themes[theme].grey}
              text='Rock' />
            <SbButton
              onClick={() => setGenre('trap')}
              shadow={genre == 'trap' ? 'inset 5px 5px 4px rgba(0,0,0,0.25)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
              width={sbSize}
              color={genre == 'trap' ? themes[theme].sbSelect : themes[theme].altAccent}
              textCol={genre == 'trap' ? themes[theme].white : themes[theme].grey}
              text='Trap' />
          </SbCont>

          <MyText
            text='Music values'
            size={`${headerSize}px`}
          />
          <SliderCont>
            {/* {sliderValues.map((o, i, ev) => <Slider
              text={o.title}
              number={o.value}
              value={o.value}
              onChange={this.o.onChange}
            />)} */}
            <Slider text='Acounticness' number={acValue} value={acValue} onChange={(ev) => setAcValue(ev.target.value)} />
            <Slider text='Danceability' number={dncValue} value={dncValue} onChange={(ev) => setDncValue(ev.target.value)} />

            <Slider text='Energy' number={enValue} value={enValue} onChange={(ev) => setEnValue(ev.target.value)} />
            <Slider text='Instrumentals' number={instValue} value={instValue} onChange={(ev) => setInstValue(ev.target.value)} />
            <Slider text='Loudness' number={ldValue} value={ldValue} onChange={(ev) => setLdValue(ev.target.value)} />
            <Slider text='Tempo' number={tpValue} max={240} step={80} value={tpValue} onChange={(ev) => setTpValue(ev.target.value)} />

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
              onClick={inputFilter}
              text='generate'
            />
          </div>

        </Dashboard>

        <Divider color={themes[theme].text} />

        <RightCont>


        <Tracks>

          <MyText
            text={load ? 'Generated Tracks:' : 'Tracks not yet generated'}
            size={`${headerSize}px`}
          />

          {/* loaded tracks from api call */}
          <TrackScoll>
            {load ? <div>Loading...</div> : <></>}
            {tracks.map((o, i) => <MyTrack
              key={i}
              selected={o.Canada}
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
        </Tracks>


        <BotCont>
          <DndProvider backend={TouchBackend} options={{
            enableTouchEvents: false,
            enableMouseEvents: true
          }}>
            {/* <MyTrack /> */}
            {load ? <div>Loading...</div> : <></>}
            {tracks.map((o, i) => <MyTrack
              key={i}

              onTrackClick={() => router.push(o.Uri)}
              AddToLikedPlaylist={(obj) => AddTrackToLiked(o)}
              OpenOptions={(obj) => handleTrackOptions(o)}
              artist={o.Artist}
              song={o.Title}
              album={o.Album}
              time={((o.duration_ms / 1000) / 60).toFixed(2)}
            />)}
            <BopBot />
          </DndProvider>
        </BotCont>

        </RightCont>

        {/* <EditPlaylist /> */}
      </Page>
    </>
  )
}
