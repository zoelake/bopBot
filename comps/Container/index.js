
import { Card } from '../Card';
import update from 'immutability-helper';
import {useState, useCallback, useEffect} from 'react'
import { useRouter } from 'next/router'
import { getPlaylists, AddTrackToPlaylist, AddTrackToLiked, SetTracksAsFavourite, DeleteTrackFromLiked, CreateNewPlaylist, DeletePlaylist, UpdatePlaylist, SetTracksAsUnfavourite, RemoveTrackFromPlaylist, RemoveFromThisPlaylist } from '../../utils/backendFunctions';
import { color } from '@mui/system';


const style = {
    // width: 600,
    // fontSize: `${parSize}`,
    // backgroundColor:'#fad',
    
};

export const Container = ({ data = null}) => {
    const router = useRouter();

    const [cards, setCards] = useState([]);

    useEffect(()=>{
        if(data) {
            setCards(data)
        }
     },[data])
  
    //page functions
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


        const moveCard = useCallback((dragIndex, hoverIndex) => {
            console.log(dragIndex, hoverIndex)
            setCards((prevCards) => update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }));
        }, []);
        const renderCard = useCallback((o, i) => {
            return (<Card 
                index={i}
                id={o._id}
                key={o._id+'-'+i} 
                song={o.Title} 
                selected={o.Canada}
                artist={o.Artist}
                time={((o.duration_ms  / 1000) / 60).toFixed(2)}
                album={o.Album}
                onTrackClick={() => router.push(o.Uri)}
                OpenOptions={(obj)=> handleTrackOptions(o)}
                AddToLikedPlaylist={(obj)=> setAsLiked(o)}
                DeleteFromLikedPlaylist={(obj)=>setAsUnliked(o)}
                moveCard={moveCard}/>)}, []);
        return <div style={style}>
            {cards !== null ? cards.map((o, i) => renderCard(o, i)) : <></>}
         </div>;
};
