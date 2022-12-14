import axios from "axios";
import { useState } from "react";
const host = process.env.SERVERSIDE;
// update to get this tracked



//PLAYLIST FUNCTIONS

export function getPlaylists() {
    const user = {
        user: localStorage.getItem('email')
    }
    axios.post(`${host}/get-playlists`, user)
        .then(res => {
            if (res.status == 200) {
                res.send();
                // setUserPlaylists(res.data.playlists);
            }
        }).catch(e => {
            console.log(e)
        })

}

// export async function filterTracks(genre, acValue, dncValue, enValue, instValue, ldValue, tpValue) {
//     let ldVforNegative = null;
//     if (ldValue == 100 || ldValue == 99) {
//         ldVforNegative = -5
//     } else if (ldValue == 66) {
//         ldVforNegative = -10
//     } else {
//         ldVforNegative = -25
//     }
//     const filters = {
//         Genre: genre,
//         acoustics: acValue / 100,
//         danceability: dncValue / 110,
//         energy: enValue / 100,
//         instrumentalness: instValue / 100,
//         loudness: ldVforNegative,
//         tempo: tpValue
//     }
//     console.log('passing...')

//     await axios.post('http://localhost:3001/tracks-filter', filters).then((res) => {
//         if (res.status == 200) {
//             console.log(res.data[1])
//             res.end(res.data)
//         }
//     }).catch(e => {
//         console.log(e);
//         return null;
//     });
// }

export function RemoveTrackFromPlaylist(trackdata, playlist) {
    const info = {
        user: localStorage.getItem('email'),
        playlist_name: playlist,
        track: trackdata,
    }
    axios.post(`${host}/tracks-remove-playlist`, info)
        .then((res) => console.log(res))
        .catch(e => console.log(e));
}

export function AddTrackToPlaylist(trackdata, playlist) {
    const info = {
        user: localStorage.getItem('email'),
        playlist_name: playlist,
        track: trackdata,
    }
    console.log(info)
    axios.post(`${host}/tracks-add-playlist`, info).then(res => {
        console.log('returning:')
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}



export function AddTrackToLiked(trackdata) {
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    axios.post(`${host}/tracks-add-liked`, info)
        .then((res) => console.log(res))
        .catch(e => console.log(e))
}




export function DeleteTrackFromLiked(trackdata) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    console.log(info)
    axios.post(`${host}/tracks-delete-liked`, info)
        .then((res) => console.log(res))
        .catch(e => console.log(e))
}

export function CreateNewPlaylist(name, img) {
    const newPlaylist = {
        playlist_name: name,
        playlist_img: img,
        user: localStorage.getItem('email')
    }
    axios.post(`${host}/create-playlist`, newPlaylist)
        .then(res => res.status == 200 && console.log(res.data + ' was added!'))
        .catch(e => console.log(e))
}


export function DeletePlaylist(name) {
    const playlist = {
        playlist_name: name,
        user: localStorage.getItem('email')
    }
    axios.post(`${host}/delete-playlist`, playlist)
        .then(res => console.log(res.data + ' was delete!'))
        .catch(e => console.log(e));
}

export function UpdatePlaylist(name, newName, img) {
    const playlist = {
        playlist_name: name,
        playlist_newName: newName,
        playlist_newImg: img,
        user: localStorage.getItem('email')
    }
    axios.post(`${host}/update-playlist`, playlist)
        .then(res => console.log(res.data + ' was updated!'))
        .catch(e => console.log(e))
}

