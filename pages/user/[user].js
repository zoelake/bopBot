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
import { useTheme, useTitle, useHeader, useId, useEmail } from '../../utils/provider'
import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'
import MySwitch from '../../comps/Switch'
import Slider from '../../comps/Slider'
import UserInfo from '../../comps/UserInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import EditPlaylist from '../../comps/EditPlaylistModal'
import AddPlaylist from '../../comps/AddPlaylistModal'
import { getPlaylists, AddTrackToPlaylist, AddTrackToLiked, DeleteTrackFromLiked, CreateNewPlaylist, DeletePlaylist, UpdatePlaylist, RemoveTrackFromPlaylist, RemoveFromThisPlaylist } from '../../utils/backendFunctions';
import DropDownEdit from '../../comps/DropDownModal'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'




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

    const router = useRouter();

    //global styles
    const { theme } = useTheme();
    const { titleSize } = useTitle();
    const { headerSize } = useHeader();

    //user info
    const { id, setId } = useId();
    const { email, setEmail } = useEmail();

    //for sort by age button
    const [addedRecent, setAddedRecent] = useState(true)

    //for updating & loading playlists
    const [playlistImg, setPlaylistImg] = useState(null);
    const [usersPlaylists, setUserPlaylists] = useState([])
    const [likedPlaylist, setLikedPlaylist] = useState([])
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
    const [selectedPlaylistCover, setSelectedPlaylistCover] = useState(null)
    const [newPlaylistName, setNewPlaylistName] = useState(null)
    const [updatePlaylistName, setUpdatePlaylistName] = useState(null)
    const [selectedTracks, setSelectedTracks] = useState([])

    //toggle models & views
    const [selectedPlaylist, setSelectedPlaylist] = useState('likes')
    const [editPlaylistView, setEditPlaylistView] = useState(false)
    const [addPlaylistView, setAddPlaylistView] = useState(false)



    //load user & playlist data on load
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('id')) {
            setId(localStorage.getItem('id'))
        }
        if (localStorage.getItem('email')) {
            setEmail(localStorage.getItem('email'))

        }
        useEffect(() => {
            getPlaylists()
        }, [])

    }

    //protect users' page from unauthorized accounts
    if (router.isReady) {
        const activeUser = router.asPath;
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

    //API CALLS TO BACKEND
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
                    setLikedPlaylist(res.data.liked)
                }
            }).catch(e => {
                console.log(e)
            })

    }

    function getPlaylistById(id) {
        console.log(`getting playlist by its id: ${id}`)
        const user = {
            playlist_id: id,
            email: localStorage.getItem('email')
        }
        console.log('user')
        console.log(user)
        axios.post('https://bopbot-backend.herokuapp.com/get-a-playlist', user)
            .then((res) => {
                if (res.status == 200) {
                    console.log('ur res: ')
                    console.log(res.data)
                    // return res.data;
                }
            }).catch((e) => {
                console.log(e)
            })
    }



    //page functions
    function onDeleteClick() {
        setEditPlaylistView(false)
        DeletePlaylist(selectedPlaylist)
        setSelectedTracks([])
        getPlaylists()
    }

    function handlePlaylistClick(playlist) {
        //sets currently selected playlist
        const { tracks } = playlist;
        console.log(tracks)
        setSelectedTracks(tracks)

        setSelectedPlaylist(playlist.name)
        setSelectedPlaylistId(playlist._id)
        setSelectedPlaylistCover(playlist.img)

        console.log(selectedPlaylist, selectedPlaylistId, selectedPlaylistCover)

    }


    function onAddSaveClick() {
        setAddPlaylistView(!addPlaylistView)
        CreateNewPlaylist(newPlaylistName)
        getPlaylists();

    }

    function onEditSaveClick() {
        setEditPlaylistView(!editPlaylistView)
        console.log('editing ' + selectedPlaylist)
        console.log(selectedPlaylist, updatePlaylistName, playlistImg)
        UpdatePlaylist(selectedPlaylist, updatePlaylistName, playlistImg)
        setSelectedPlaylist(updatePlaylistName)
        getPlaylists();

    }

    function handleTrackOptions(trackdata) {
        console.log('opening model for options')
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



    function setAsLiked(trackdata) {
        console.log('liked')
        console.log(trackdata._id)
        AddTrackToLiked(trackdata)
        localStorage.setItem(`track #${trackdata._id}`, trackdata._id)
        // SetTracksAsFavourite(trackdata)
        // AddTrackToLiked(trackdata)
    }

    function setAsUnliked(trackdata) {
        console.log('unliked')
        console.log(trackdata._id)
        localStorage.removeItem(`track #${trackdata._id}`)
        // SetTracksAsUnfavourite(trackdata)
        DeleteTrackFromLiked(trackdata)
        // RemoveFromThisPlaylist(trackdata, selectedPlaylist)
        // DeleteTrackFromLiked(trackdata)
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

                <Dashboard
                    bg={themes[theme].contrast}>


                    {/* <UserInfo /> */}

                    {/* if users clicks create playlist */}
                    {addPlaylistView ? <AddPlaylist
                        coverSrc=''
                        handleChange={(e) => setNewPlaylistName(e.target.value)}
                        onXClick={() => setAddPlaylistView(false)}
                        onSaveClick={onAddSaveClick}
                    /> : <></>}

                    {/* if users clicks edit playlist */}
                    {editPlaylistView ? <EditPlaylist
                        playlist={selectedPlaylist}
                        handleChange={(e) => setUpdatePlaylistName(e.target.value)}
                        onXClick={() => setEditPlaylistView(false)}
                        onSaveClick={onEditSaveClick}
                        onDeleteClick={onDeleteClick}
                    /> : <></>}


                    <MyText
                        weight={500}
                        lineHeight='0'
                        text={`Your playlists`}
                        size={`${titleSize}px`}
                    />

                    <MyButton
                        onClick={() => setAddPlaylistView(!addPlaylistView)}
                        text='create playlist' />

                    <SbCont>
                        <Playlist
                            text='likes'
                            cover={'/heart.png'}
                            onClick={() => setSelectedPlaylist('likes')}
                            bg={selectedPlaylist === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                            color={selectedPlaylist === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}
                        />


                        {usersPlaylists !== [] ? usersPlaylists.map((o, i) => <Playlist
                            key={i}
                            text={o.name}
                            cover={o.img}
                            onClick={(obj) => handlePlaylistClick(o)}
                            bg={selectedPlaylist === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                            color={selectedPlaylist === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}

                        />)
                            : <Playlist
                                key={i}
                                cover='/playlistLiked.png'
                                onClick={() => setSelectedPlaylist('liked')}
                                bg={selectedPlaylist === 'liked' || null ? themes[theme].accent : themes[theme].playBg}
                                color={selectedPlaylist === 'liked' || themes[theme].white ? themes[theme].text : themes[theme].accent}
                                text='Loading'
                            />
                        }


                    </SbCont>
                </Dashboard>
                <TracksCont>

                    <SpaceCont>
                        <MyText
                            text={selectedPlaylist === null ? 'Select a Playlist' : selectedPlaylist}
                            size={`${headerSize}px`}
                        />
                        <MyButton
                            onClick={() => setEditPlaylistView(!editPlaylistView)}
                            text={editPlaylistView ? 'close ' : 'edit'}
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
                        <DndProvider backend={TouchBackend} options={{
                            enableTouchEvents: false,
                            enableMouseEvents: true
                        }}>
                            {selectedPlaylist == 'likes' ? likedPlaylist.map((o, i) => <MyTrack
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
                            />) : <></>}

                            {selectedPlaylist !== 'nothing' && selectedPlaylist !== 'likes' ? selectedTracks.map((o, i) => <MyTrack
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
                            />) : <></>}



                        </DndProvider>
                    </RegCont>

                </TracksCont>

            </Page>
        </>
    )
}
