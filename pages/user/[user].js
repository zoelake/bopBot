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
import { useTheme, useTitle, useHeader, usePar, useId, useEmail } from '../../utils/provider'
import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'
import MySwitch from '../../comps/Switch'
import Slider from '../../comps/Slider'
import UserInfo from '../../comps/UserInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'



const Page = styled.div`
  display:flex;
  flex-direction: column;
  margin:0;
  justify-content: center;
  width: 100vw;
  position: absolute;
  height:95vh;
  bottom:0;
`;

const Dashboard = styled.div`
    background-color: ${props => props.bg};
    height:45vh;
    padding:30px 10px 10px 60px;
    display: flex;
    justify-content:center ;
    /* border: 2px solid blue; */
    

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

const TracksCont = styled.div`
    height:40%;
    /* border:2px solid red; */
    /* position: absolute; */
    /* bottom:0;
    left:10px; */
    align-self: center;
    width:80%;
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

    const [playlistInput, setPlaylistInput] = useState(null);
    const [playlistInput2, setPlaylistInput2] = useState(null);
    const [playlistImg, setPlaylistImg] = useState(null);
    const [usersPlaylists, setUserPlaylists] = useState([])
    const [likedPlaylist, setLikedPlaylist] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)





    function HandlePlaylists(value) {
        setPlaylistInput(value)
        console.log('new playlist name: ' + playlistInput)
    }
    function HandlePlaylists2(value) {
        setPlaylistInput2(value)
        console.log('updating name: ' + playlistInput2)
    }

    function CreateNewPlaylist() {
        const newPlaylist = {
            playlist_name: playlistInput,
            playlist_img: 'https://placekitten.com/100/100',
            user: localStorage.getItem('email')
        }
        axios.post('http://localhost:3001/create-playlist', newPlaylist)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data + ' was added!')
                }
            }).catch(e => {
                console.log(e)
            })
        setTimeout(getPlaylists, 500);

    }

    function UpdatePlaylist() {
        const playlist = {
            playlist_name: playlistInput,
            playlist_newName: playlistInput2,
            playlist_newImg: playlistImg,
            user: localStorage.getItem('email')
        }
        axios.post('http://localhost:3001/update-playlist', playlist)
            .then((res) => {

                console.log(res.data + ' was updated!')

            }).catch(e => {
                console.log(e)
            })
        setTimeout(getPlaylists, 500);


    }

    function DeletePlaylist() {
        const playlist = {
            playlist_name: playlistInput,
            user: localStorage.getItem('email')
        }
        axios.post('http://localhost:3001/delete-playlist', playlist)
            .then((res) => {

                console.log(res.data + ' was delete!')

            }).catch(e => {
                console.log(e)
            })

        setTimeout(getPlaylists, 500);

    }


    const { id, setId } = useId();
    const { email, setEmail } = useEmail();
    const router = useRouter();

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('id')) {
            setId(localStorage.getItem('id'))
        }
        if (localStorage.getItem('email')) {
            setEmail(localStorage.getItem('email'))

        }
    }
    useEffect(() => {
        getPlaylists()
    }, [])

    function getPlaylists() {
        console.log('GETTING PLAYLISTS')
        const user = {
            playlist_name: playlistInput,
            user: localStorage.getItem('email')
        }
        axios.post('http://localhost:3001/get-playlists', user)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    setUserPlaylists(res.data.playlists)
                    setLikedPlaylist(res.data.liked)
                }
            }).catch(e => {
                console.log(e)
            })

    }

    function getPlaylistByName() {
        console.log('GETTING SPECIFIC PLAYLIST')
        console.log('playlist id')
        const user = {
            playlist_id: selectedPlaylistId,
            email: localStorage.getItem('email')
        }
        console.log(user)
        axios.get('http://localhost:3001/get-a-playlist', user)
            .then((res) => {
                if (res.status == 200) {
                    console.log('ur res: ')
                    console.log(res.data)
                    setSelectedPlaylist(res.data)
                }
            }).catch((e) => {
                console.log(e)
            })
    }

    if (router.isReady) {
        // console.log('router is ready')
        const activeUser = router.asPath;
        // console.log(id)
        // console.log(activeUser)
        if (`/user/${id}` !== activeUser) {
            return (<>
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
                            text="Uh oh, looks like you don't have permission to be here!" />
                    </Dashboard>


                </Page>
            </>

            )
        }
    }

    function handlePlaylistClick(playlist) {
        console.log('the playlist:')
        console.log(playlist._id)
        setSelected(playlist.name)
        setSelectedPlaylistId(playlist._id)
        getPlaylistByName();
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
                {/* <input placeholder='new playlist name / current ...' onChange={(e) => HandlePlaylists(e.target.value)}></input>
                <input placeholder='updating playlist name to...' onChange={(e) => HandlePlaylists2(e.target.value)}></input>
                <button onClick={CreateNewPlaylist}>add new playlist</button>
                <button onClick={UpdatePlaylist}>update a playlist name</button>
                <button onClick={DeletePlaylist}>delete playlist</button> */}
                <Dashboard
                    bg={themes[theme].contrast}>

                    {/* <UserInfo /> */}
                    <MyText
                        weight={500}
                        lineHeight='0'
                        text={`Your playlists`}
                        size={`${titleSize}px`}
                    />

                    <SbCont>
                        <Playlist
                            text='likes'
                            cover={'/heart.png'}
                            onClick={() => setSelected('likes')}
                            bg={selected === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}
                        />

                        {usersPlaylists !== [] ? usersPlaylists.map((o) => <Playlist
                            key={o._id}
                            text={o.name}
                            cover={o.img}
                            onClick={(obj) => handlePlaylistClick(o)}
                            bg={selected === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                            color={selected === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}

                        />)
                            : <Playlist
                                cover='/playlistLiked.png'
                                onClick={() => setSelected('liked')}
                                bg={selected === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                                color={selected === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}
                                text='Loading'
                            />
                        }


                    </SbCont>
                </Dashboard>
                <TracksCont>
                    <SpaceCont>
                        <MyText
                            text={selected === null ? 'likes' : selected}
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
                        {selected == 'likes' & likedPlaylist !== [] ? likedPlaylist.map((o, i) => <MyTrack
                            key={i}
                            onTrackClick={() => router.push(o.Uri)}
                            AddToLikedPlaylist={(obj) => AddTrackToLiked(o)}
                            OpenOptions={(obj) => handleTrackOptions(o)}
                            artist={o.Artist}
                            song={o.Title}
                            album={o.Album}
                            time={((o.duration_ms / 1000) / 60).toFixed(2)}
                        />) : usersPlaylists.map((o, i) => <MyTrack
                            key={i}
                            onTrackClick={() => router.push(o.Uri)}
                            AddToLikedPlaylist={(obj) => AddTrackToLiked(o)}
                            OpenOptions={(obj) => handleTrackOptions(o)}
                            artist={o.Artist}
                            song={o.Title}
                            album={o.Album}
                            time={((o.duration_ms / 1000) / 60).toFixed(2)}
                        />)}



                    </RegCont>

                </TracksCont>

            </Page>
        </>
    )
}
