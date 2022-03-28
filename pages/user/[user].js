import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../../comps/Button'
import NavBar from '../../comps/Nav'
import MyTrack from '../../comps/TrackInfo'

import Playlist from '../../comps/Playlist'
import SbButton from '../../comps/SbButton'
import { Carousel } from 'react-responsive-carousel';
import Toggle from '../../comps/Toggle'
import MyText from '../../comps/Text'
import { themes } from '../../utils/variables'
import { useTheme, useTitle, useHeader, useId, useEmail, usePar } from '../../utils/provider'
import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'
import MySwitch from '../../comps/Switch'
import Slider from '../../comps/Slider'
import UserInfo from '../../comps/UserInfo'
import { useEffect, useState, useRef, useCallback } from 'react'
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

    display: flex;
    height: 100vh;
    width: 100vw;

  @media ${device.mobile}{

      flex-direction: column;
      align-items:center ;

    }

    @media ${device.tablet}{
      display: flex;
      flex-direction: row;
      align-items:center ;

    }

    @media ${device.desktop}{
        display:flex;
        flex-direction: row;
        justify-content: center;
    
    }
  
`;

const Dashboard = styled.div`  
       background-color: ${props => props.bg};


    @media ${device.mobile}{

        width: 100vw;
        height: 50vh;
        padding-left: 3rem;
        padding-top: 1rem;
        /* justify-content:center ; */
        
        /* flex-grow: 1; */
    }

    @media ${device.tablet}{
        width: 50vw;
        height:100vh;
        padding-left: 10px;
     
    }

    @media ${device.desktop}{
        display: flex;
        flex-direction: column ;
        width:48vw;
        height: 90vh;
        padding:30px 10px 10px 60px;
        justify-content: flex-start;

        //min
    }
`;

const leftTop = styled.div`


    @media ${device.mobile}{
        width: 100vw;
        height: 50vh;
    }

    @media ${device.tablet}{

    }

    @media ${device.desktop}{
       
    }

`;




const SbCont = styled.div`
        display: flex;
        flex-wrap: wrap;   
       overflow-y: scroll ;
       justify-content: flex-start;

       &::-webkit-scrollbar {
        width: 1px;
        border: 1px solid white;
        margin-top: 20px;
    }

     @media ${device.mobile}{
 
        height: 30vh;
        width: 90vw;

    }

    @media ${device.tablet}{

        flex-wrap: wrap;
        height: 50vh;
        width: 50vw;

    }

    @media ${device.desktop}{

        height: 80vh;
        width: 45vw;
            }
`;

const SpaceCont = styled.div`
        display: flex;
        align-items:center ;
        margin-left: 10%;

        `;

const TracksCont = styled.div`
    z-index: 1;
    position: relative;

    @media ${device.mobile}{
        display:flex;
        flex-direction: column ;
        align-items: center ;
        width: 100vw;
        height: 50vh;
        /* justify-content:center ; */
    }

    @media ${device.tablet}{

        width: 40vw;
        height: 100vh;
        margin-right:5%;

    }

    @media ${device.desktop}{
        display:flex ;
        flex-direction: column ;
        /* padding:30px 10px 10px 60px; */
        justify-content:center ;
        width: 50vw;
        align-self: center;
        height: 100vh;
        
       
    }
`;

const RegCont = styled.div`
z-index:1;

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

    height:1px;

    @media ${device.mobile}{
        width: 80%;
        justify-content: center;
        height:1px;

    }

    @media ${device.tablet}{
    }

    @media ${device.desktop}{
        width: 100%;
       
    }
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


    //for updating & loading playlists
    const [playlistImg, setPlaylistImg] = useState(null);
    const [usersPlaylists, setUserPlaylists] = useState([])
    const [likedPlaylist, setLikedPlaylist] = useState([])
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
    const [selectedPlaylistCover, setSelectedPlaylistCover] = useState(null)
    const [newPlaylistName, setNewPlaylistName] = useState(null)
    const [updatePlaylistName, setUpdatePlaylistName] = useState(null)
    const [selectedTracks, setSelectedTracks] = useState([])
    const [clickedCover, setClickedCover] = useState(null)

    //toggle models & views
    const [selectedPlaylist, setSelectedPlaylist] = useState('likes')
    const [editPlaylistView, setEditPlaylistView] = useState(false)
    const [addPlaylistView, setAddPlaylistView] = useState(false)

    const { parSize } = usePar();

    //load user & playlist data on load
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('id')) {
            setId(localStorage.getItem('id'))
        }
        if (localStorage.getItem('email')) {
            setEmail(localStorage.getItem('email'))
        }

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
                    console.log('res.data.playlists')
                    console.log(res.data.playlists)
                    setUserPlaylists(res.data.playlists);
                    setLikedPlaylist(res.data.liked)
                }
            }).catch(e => {
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

        getPlaylists()

    }


    function onAddSaveClick() {
        setAddPlaylistView(!addPlaylistView)
        CreateNewPlaylist(newPlaylistName)
        getPlaylists();

    }

    function onEditSaveClick() {
        setEditPlaylistView(!editPlaylistView)
        console.log('editing ' + selectedPlaylist)
        console.log(selectedPlaylist, updatePlaylistName, localStorage.getItem('cover'))
        UpdatePlaylist(selectedPlaylist, updatePlaylistName, localStorage.getItem('cover'))
        setSelectedPlaylist(updatePlaylistName)
        getPlaylists();

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

<MyText
                                weight={100}
                                lineHeight='0'
                                text={`Drag your tracks into your preferred order!`}
                                size={`${parSize}px`}
                            />

                            <MyButton
                                onClick={() => setAddPlaylistView(!addPlaylistView)}
                                text='create playlist' 
                                width= '200px'
                                />
                 
                    </leftTop>

                    <SbCont>
                        <Playlist
                            text='likes'
                            cover={'/heartWhite.png'}
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
             
                        <SpaceCont>
                            <MyText
                                text={selectedPlaylist === null ? 'Select a Playlist' : selectedPlaylist}
                                size={`${headerSize}px`}
                                
                            />
                        
                            
                            <MyButton
                                onClick={() => setAddedRecent(!addedRecent)}
                                text={addedRecent ? 'See oldest ' : 'See newest'}
                            />

                            <MyButton
                                onClick={() => setEditPlaylistView(!editPlaylistView)}
                                text={editPlaylistView ? 'close ' : 'edit'}
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


                </TracksCont>


            </Page>
        </>
    )
}
