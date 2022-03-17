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

import { TouchBackend } from 'react-dnd-touch-backend'
//import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Dropzone from '../comps/Dropzone'
import { v4 as uuidv4 } from 'uuid';

import { io } from "socket.io-client";
import TrackInfoDnd from '../comps/TrackInfoDnd'


const DndLogo = styled.img`
height: 60px;
width: 60px;

display: flex;
justify-content: flex-end;
`;


const Page = styled.div`
  display:flex;
  margin:0;
  
  position: absolute;
  
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
    justify-content: space-between;
    height:95vh;
  }

  @media ${device.desktop}{
    flex-direction: row;
    justify-content: space-between;
    height:95vh;
  }

`;

const Dashboard = styled.div`
    height:95vh;
    width:55%;
    
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
  overflow: scroll;
  width: 100%;
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

  //theme states
  const { theme } = useTheme();
  const { titleSize } = useTitle();
  const { headerSize } = useHeader();
  const { parSize } = usePar();
  const { sbSize } = useSbSize();

  //genre genre
  const [genre, setGenre] = useState(null)
  //slider values
  const [acValue, setAcValue] = useState(0);
  const [dncValue, setDncValue] = useState(0);
  const [enValue, setEnValue] = useState(0);
  const [instValue, setInstValue] = useState(0);
  const [ldValue, setLdValue] = useState(0)
  const [tpValue, setTpValue] = useState(0);



  const [tracks, setTracks] = useState([]);
  const [load, setLoad] = useState(null);
  const [button, setButton] = useState(false)

  function buttonPress() {
    setButton(true)
    setTimeout(() => {
      setButton(false)
    }, 200);

  }


  const inputFilter = async () => {
    buttonPress();
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


  // const sliderValues = [
  //   {
  //     'title': 'Acousticness',
  //     'value': acValue,
  //     'onChange': (e) => setAcValue(ev.target.value)
  //   },
  //   {
  //     'title': 'Danceability',
  //     'value': dncValue,
  //     'onChange': (e) => setDncValue(ev.target.value)
  //   },
  //   {
  //     'title': 'Energy',
  //     'value': enValue,
  //     'onChange': (e) => setEnValue(ev.target.value),
  //   },
  //   {
  //     'title': 'Instrumentals',
  //     'value': instValue,
  //     'onChange': (e) => setInstValue(ev.target.value)
  //   },
  //   {
  //     'title': 'Loudness',
  //     'value': ldValue,
  //     'onChange': (e) => setLdValue(ev.target.value)
  //   },

  // ]

  //setting user data
  const {name} = useName();
  //end set user data

  const [trackModel, setTrackModel] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState([])
  const [selectedTrack, setSelectedTrack] = useState([])

  function handleTrackOptions(trackdata) {
    console.log(trackdata)
    //display model
    setTrackModel(!trackModel)
    setSelectedTrack(trackdata)
    console.log('modle is set to: ' + trackModel)

  }

  function SetAndAddTrack(playlist) {
    console.log('playlist name: ' + playlist)
    setSelectedPlaylist(playlist)
    AddTrackToPlaylist(selectedTrack, playlist)
  }

  function AddTrackToPlaylist(trackdata, playlist) {
    console.log(trackdata)
    console.log('playlist: ' + playlist)
    const info = {
      user: localStorage.getItem('email'),
      playlist_name: playlist,
      track: trackdata,
    }
    console.log(info)
    axios.post('http://localhost:3001/tracks-add-playlist', info).then((res) => {
      console.log('returning:')
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
  }

  function AddTrackToLiked(trackdata) {
    console.log(trackdata)
    const info = {
      user: localStorage.getItem('email'),
      track: trackdata,
    }
    console.log(info)
    axios.post('http://localhost:3001/tracks-add-liked', info).then((res) => {
      console.log('added to likes:')
      console.log(res)
    }).catch(e => {
      console.log(e)
    })
  }

<<<<<<< HEAD
  const [newTracks, setNewTracks] = useState();
  let loadedTracks = null;

  function getTracks() {
    console.log('connecting to database...')
    axios.get('http://localhost:3001/tracks')
      .then((res) => {
        console.log('here are your tracks! ' + res)
        // setNewTracks(res)
        loadedTracks = res.data
        console.log(loadedTracks);

      }).catch(e => {
        console.log(e)
      })
=======
  const [dndtrack, setDndtrack] = useState({});

  const HandleUpdateTrack = (id, trackdata) => {
    console.log('this is' + trackdata.Title)
    dndtrack[id] = {
      ...dndtrack[id],
      ...trackdata
    }
>>>>>>> 3a4deea88951acc11e0e0f8a9daeee2c7f8a4efc

    setDndtrack({
      ...dndtrack
    })
    console.log('test dnd', dndtrack)
  }

<<<<<<< HEAD
  const [usersPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists()
  }, [])

  function getPlaylists() {
    console.log('GETTING PLAYLISTS')
    const user = {
      user: localStorage.getItem('email')
    }
    axios.post('http://localhost:3001/get-playlists', user)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.playlists)
          setUserPlaylists(res.data.playlists);
        }
      }).catch(e => {
        console.log(e)
      })
    setTrackModel(false)

  }

=======
  const [mySoc, setMySoc] = useState(null);

  const [txt, setTxt] = useState('');

  const [msgs, setMsgs] = useState([]);
>>>>>>> 3a4deea88951acc11e0e0f8a9daeee2c7f8a4efc

  const [users, setUsers] = useState({});

  useEffect(()=>{
    // const socket = io("ws://example.com/my-namespace", {
    //   reconnectionDelayMax: 10000,
    //   auth: {
    //     token: "123"
    //   },
    //   query: {
    //     "my-key": "my-value"
    //   }
    // });
    const socket = io("http://localhost:8888");

    socket.on("init_user", (users) => {
      // set the user into the object so you store the users
      // console.log(users);
      setUsers(users);
    })
    
    socket.on("joined", (id, txt) => {
      setMsgs((prev) => [
        ...prev,
        `${id} is now playing ${txt}`
      ]);
    })

    setMySoc(socket)
  }, [])

  const EmitToIO = async () => {
    //mySoc to emit
    if(mySoc != null) {
      mySoc.emit("user_ready", txt);
    }
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
<<<<<<< HEAD

          {trackModel ?
            <Model onBlur={() => setTrackModel(!trackModel)}>

              <MyText
                text='Add to playlists:'
                size={`${headerSize}px`}
              />
              {usersPlaylists !== [] ? usersPlaylists.map((o) => <MyText
                key={o._id}
                text={o.name}
                size={`${parSize}px`}
                onClick={(obj) => SetAndAddTrack(o.name)}
              />) : <></>}

            </Model>
            : <></>}

=======
>>>>>>> 3a4deea88951acc11e0e0f8a9daeee2c7f8a4efc
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
              shadow={button ? 'inset 2px 2px 4px rgba(0,0,0,0.1)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'} />
          </div>

        </Dashboard>

        <Divider color={themes[theme].text} />

        <TracksCont>

          <MyText
            text={load ? 'Generated Tracks:' : 'Tracks not yet generated'}
            size={`${headerSize}px`}
          />

<<<<<<< HEAD
          <TrackScoll>
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
          </TrackScoll>

=======
          <DndProvider backend={TouchBackend} options={{
            enableTouchEvents: false,
            enableMouseEvents: true
          }}>
            <TrackScoll>
              {/* <MyTrack /> */}
              {load ? <div>Loading...</div> : <></>}
                {tracks.map((o, i) => <MyTrack
                  key={i}
                  onTrackClick={() => router.push(o.Uri)}
                  AddToLikedPlaylist={(obj) => PostToLiked(o.id, o, obj)}
                  artist={o.Artist}
                  song={o.Title}
                  album={o.Album}
                  time={((o.duration_ms / 1000) / 60).toFixed(2)}
                  onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
                />)}
            </TrackScoll>
            <MyTrack song='Pls memorize this' artist='Alicia Yien' album='Pls work'/>
          
            <Dropzone onDropItem={(item) => {
                console.log('pls show this', dndtrack)
                const t_id = uuidv4();

                setDndtrack((prev) => ({
                  ...prev,
                  [t_id]:{id: t_id}
                }))
              }}>
              <DndLogo src={'/BopBotLogo.svg'}></DndLogo>
              {Object.values(dndtrack).map((o, i) => <MyTrack
                type='boardtracks'
                key={i}
                artist={o.Artist}
                song={o.Title}
                album={o.Album}
                // time={((o.duration_ms / 1000) / 60).toFixed(2)}
                trackpos={o.pos}
                onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
              />)}

              {Object.values(dndtrack).map((o, i) => <TrackInfoDnd
                type='boardtracks'
                key={i}
                trackpos={o.pos}
                onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
              >
                {o.id} - {o.Title} - {o.Artist}
              </TrackInfoDnd>)}

              <input type='text' onChange={(e)=>setTxt(e.target.value)} />
              <button onClick={EmitToIO}>Join and Alert</button>
              {msgs.map((o, i) => <div key={i} style={{backgroundColor: 'red', padding: 10}}>
                {o}
              </div>)}
              
            </Dropzone>
          </DndProvider>
>>>>>>> 3a4deea88951acc11e0e0f8a9daeee2c7f8a4efc
        </TracksCont>
        


      </Page>
    </>
  )


}


