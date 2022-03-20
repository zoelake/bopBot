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
  flex-direction: row;
  margin:0;
  justify-content: center;
  width: 100vw;
  height:95vh;
  bottom:0;

  border:2px solid red;
`;

const Dashboard = styled.div`
    background-color: ${props => props.bg};
    height:45vh;
    padding:30px 10px 10px 60px;
    display: flex;
    justify-content:center ;
    /* border: 2px solid blue; */
    

    @media ${device.mobile}{
        flex-direction: column;
        flex-wrap: wrap;
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
       
    }

    border:2px solid red;
`;

const UserCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 50vw;
    height: 150px;
    padding-bottom: 10px;
    margin-top: 100px;
`;

const UserImage = styled.div`
    border-radius: 50px;
    background-color: pink;
    margin: 10px 0px 10px 10px;
    height: 100px;
    width: 100px;
`;

const UserID = styled.div`
    display: flex;
    align-items: center;
    font-size: 50px; 
    color: ${props => props.color};
    height: 100px;
    width: 25vw;
    padding-left: 25px;
`;

const LeftCont = styled.div`
    display: flex;
    flex-direction: column; 
    padding-left: 50px;
`;

const SbCont = styled.div`
  display: flex;
  height: 50vh;
  width: 800px;
  justify-content: space-aroud;

  border:2px solid red;
  flex-grow: 1;
  flex-flow: column wrap;

  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

 
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
width: 50vw;
padding-left: 20px;

justify-content: space-between;
border:2px solid red;
`;

const TracksCont = styled.div`
    height:40%;
    border:2px solid red;
    /* position: absolute; */
    /* bottom:0;
    left:10px; */
    align-self: center;
    width:50vw;

    flex-grow: 1
    
`;

const RegCont = styled.div`
  padding-left: 30px;
  border:2px solid red;
  
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

                <LeftCont>

                
                <UserCont>
                    <UserImage/>
                    <UserID
                     color={themes[theme].text} 
                    >User 123</UserID>

                </UserCont>

                <UserCont></UserCont>

            
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
                </LeftCont>

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
