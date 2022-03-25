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
import { useEffect, useState, useRef, useCallback} from 'react'
import { useDrag, useDrop } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend'
import axios from 'axios'
import { useRouter } from 'next/router'
import EditPlaylist from '../../comps/EditPlaylistModal'
import AddPlaylist from '../../comps/AddPlaylistModal'
import { getPlaylists, AddTrackToPlaylist, AddTrackToLiked, SetTracksAsFavourite, DeleteTrackFromLiked, CreateNewPlaylist, DeletePlaylist, UpdatePlaylist, SetTracksAsUnfavourite, RemoveTrackFromPlaylist, RemoveFromThisPlaylist } from '../../utils/backendFunctions';
import DropDownEdit from '../../comps/DropDownModal'

import { Container } from '../../comps/Container'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'



const Page = styled.div`


  @media ${device.mobile}{
      display: flex;
      flex-direction: column;
      align-items:center ;
      height: 100vh;
      width: 100vw;
    }

    @media ${device.tablet}{
      display: flex;
      flex-direction: row;
      align-items:center ;
      height: 100vh;
      width: 100vw;
    }

    @media ${device.desktop}{
        display:flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;
        height:100vh;
    
    }
  
`;

const Dashboard = styled.div`



    @media ${device.mobile}{
        background-color: #fad ;
        width: 100vw;
        height: 50vh;
        /* flex-grow: 1; */
    }

    @media ${device.tablet}{
        background-color: #fad ;
        width: 50vw;
        height:100vh;
    }

    @media ${device.desktop}{
        display: flex;
        flex-direction: column ;
        background-color: ${props => props.bg};
        width:50vw;
        /* height: 0vh; */
        padding:30px 10px 10px 60px;
        justify-content: center;
        /* background-color: red ; */
    }
`;

const leftCont = styled.div`

`;
const leftTop = styled.div`
    @media ${device.mobile}{
        background-color: #fad ;
        width: 100vw;
        height: 50vh;
        /* flex-grow: 1; */
    }

    @media ${device.tablet}{
    }

    @media ${device.desktop}{
       
    }

`;

const rigthCont = styled.div`
`;


const SbCont = styled.div`

     @media ${device.mobile}{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 30vh;
        width: 100vw;
        overflow-y:scroll ;
        margin-top: 20px;
    }

    @media ${device.tablet}{

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 50vh;
        width: 50vw;
        overflow-y:scroll ;
        margin-top: 20px;
    }

    @media ${device.desktop}{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 25vh;
        width: 500px;
        overflow-y:scroll ;
        margin-top: 20px;
            }
`;

const SpaceCont = styled.div`
        display: flex;
        width: 90%;
        justify-content: space-between;
        `;

const TracksCont = styled.div`



    @media ${device.mobile}{
        background-color: #fad ;
        width: 100vw;
        height: 50vh;
    }

    @media ${device.tablet}{
        background-color: #fad ;
        width: 50vw;
        height: 100vh;

    }

    @media ${device.desktop}{
        display:flex ;
        flex-direction: row ;
        padding:30px 10px 10px 60px;
        justify-content:center ;
        width: 50vw;
        align-self: center;
        height: 100vh;
       
    }
`;

const RegCont = styled.div`

    @media ${device.mobile}{
        width: 100vw;

    }

    @media ${device.tablet}{
    }

    @media ${device.desktop}{
       
    }
    
`;
const Divider = styled.div`
    background-color: ${props => props.color};
    width:100%;
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
        axios.post('http://localhost:3001/get-playlists', user)
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
        axios.post('http://localhost:3001/get-a-playlist', user)
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
        console.log('tracks')
        console.log(tracks)
        setSelectedTracks(tracks)
        console.log('selectedTracks')
        console.log(selectedTracks)
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
        AddTrackToLiked(trackdata)
        SetTracksAsFavourite(trackdata)
        // AddTrackToLiked(trackdata)
    }

    function setAsUnliked(trackdata) {
        console.log('unliked')
        SetTracksAsUnfavourite(trackdata)
        DeleteTrackFromLiked(trackdata)
        RemoveFromThisPlaylist(trackdata, selectedPlaylist)
        // DeleteTrackFromLiked(trackdata)
    }

    // const ref = useRef(null);
    // const [selected, setSelected] = useState(false)

    // const moveCard = useCallback((dragIndex, hoverIndex) => {
    //     setCards((prevCards) => update(prevCards, {
    //         $splice: [
    //             [dragIndex, 1],
    //             [hoverIndex, 0, prevCards[dragIndex]],
    //         ],
    //     }));
    // }, []);

    return (
        <>
            <Head>
                <title>botBot</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="#" />
            </Head>
            <navCont>
            <NavBar />
            </navCont>
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

                    <leftTop>
                            <MyText
                                weight={500}
                                lineHeight='0'
                                text={`Your playlists`}
                                size={`${titleSize}px`}
                            />

                            <MyButton
                                onClick={() => setAddPlaylistView(!addPlaylistView)}
                                text='create playlist' 
                                width= '250px'
                                />
                    </leftTop>
            
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
                            : <></>
                        }


                    </SbCont>

                </Dashboard>
                <TracksCont>
                    <rightCont>
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
                            {selectedPlaylist == 'likes' ? 
                            <Container
                            data={likedPlaylist}
                            // moveCard={moveCard}
                        
                            /> : <></>}

                            {selectedPlaylist !== 'nothing' && selectedPlaylist !== 'likes' ? <Container
                                data={selectedTracks}
                                // moveCard={moveCard}
                              
                            /> : <></>}

                        

                        </DndProvider>
                        
                    </RegCont>
           
                    </rightCont>
                </TracksCont>


            </Page>
        </>
    )
}
