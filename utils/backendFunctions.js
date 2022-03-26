import axios from "axios";
import { useState } from "react";

// update to get this tracked



//PLAYLIST FUNCTIONS

export function getPlaylists() {

    console.log('GETTING PLAYLISTS')
    const user = {
        user: localStorage.getItem('email')
    }
    axios.post('https://bopbot-backend.herokuapp.com/get-playlists', user)
        .then((res) => {
            if (res.status == 200) {
                console.log('res.data.playlists')
                console.log(res.data.playlists)
                res.send();
                // setUserPlaylists(res.data.playlists);
            }
        }).catch(e => {
            console.log(e)
        })

}

export function RemoveTrackFromPlaylist(trackdata, playlist) {
    console.log(trackdata)
    console.log('playlist: ' + playlist)
    const info = {
        user: localStorage.getItem('email'),
        playlist_name: playlist,
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-remove-playlist', info).then((res) => {
        console.log('returning:')
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}

export function AddTrackToPlaylist(trackdata, playlist) {
    console.log(trackdata)
    console.log('playlist: ' + playlist)
    const info = {
        user: localStorage.getItem('email'),
        playlist_name: playlist,
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-add-playlist', info).then((res) => {
        console.log('returning:')
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}



export function AddTrackToLiked(trackdata) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-add-liked', info).then((res) => {
        console.log('added to likes')
        console.log(res)
        // res.send(res.status)

    }).catch(e => {
        console.log(e)
    })
}

export function SetTracksAsFavourite(trackdata) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-set-favourite', info).then((res) => {
        console.log('track now favourited')
        console.log(res)

    }).catch(e => {
        console.log(e)
    })
}

export function SetTracksAsUnfavourite(trackdata) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-set-unfavourite', info).then((res) => {
        console.log('track now favourited')
        console.log(res)

    }).catch(e => {
        console.log(e)
    })
}

export function RemoveFromThisPlaylist(trackdata, playlist) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
        playlist_name: playlist
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-update-unfavourite-playlist', info).then((res) => {
        console.log('track now favourited')
        console.log(res)

    }).catch(e => {
        console.log(e)
    })
}



export function DeleteTrackFromLiked(trackdata) {
    console.log(trackdata)
    const info = {
        user: localStorage.getItem('email'),
        track: trackdata,
    }
    console.log(info)
    axios.post('https://bopbot-backend.herokuapp.com/tracks-delete-liked', info).then((res) => {
        console.log('deleted from likes:')
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}

export function CreateNewPlaylist(name, img) {
    const newPlaylist = {
        playlist_name: name,
        playlist_img: img,
        user: localStorage.getItem('email')
    }
    axios.post('https://bopbot-backend.herokuapp.com/create-playlist', newPlaylist)
        .then((res) => {
            if (res.status == 200) {
                console.log(res.data + ' was added!')
            }
        }).catch(e => {
            console.log(e)
        })

}


export function DeletePlaylist(name) {
    console.log('deleting playlist')
    const playlist = {
        playlist_name: name,
        user: localStorage.getItem('email')
    }
    axios.post('https://bopbot-backend.herokuapp.com/delete-playlist', playlist)
        .then((res) => {

            console.log(res.data + ' was delete!')

        }).catch(e => {
            console.log(e)
        })


}

export function UpdatePlaylist(name, newName, img) {
    console.log(`updating ${name} to ${newName}`)
    const playlist = {
        playlist_name: name,
        playlist_newName: newName,
        playlist_newImg: img,
        user: localStorage.getItem('email')
    }
    console.log('playlist')
    console.log(playlist)
    axios.post('https://bopbot-backend.herokuapp.com/update-playlist', playlist)
        .then((res) => {

            console.log(res.data + ' was updated!')

        }).catch(e => {
            console.log(e)
        })

}



// export function SetTracksAsFavourite(trackdata) {
//     console.log(trackdata)
//     const info = {
//         user: localStorage.getItem('email'),
//         track: trackdata,
//     }
//     console.log(info)
//     axios.post('https://bopbot-backend.herokuapp.com/tracks-set-favourite', info).then((res) => {
//         console.log('track now favourited')
//         console.log(res)

//     }).catch(e => {
//         console.log(e)
//     })
// }

// export function SetTracksAsUnfavourite(trackdata) {
//     console.log(trackdata)
//     const info = {
//         user: localStorage.getItem('email'),
//         track: trackdata,
//     }
//     console.log(info)
//     axios.post('https://bopbot-backend.herokuapp.com/tracks-set-unfavourite', info).then((res) => {
//         console.log('track now favourited')
//         console.log(res)

//     }).catch(e => {
//         console.log(e)
//     })
// }

// export function RemoveFromThisPlaylist(trackdata, playlist) {
//     console.log(trackdata)
//     const info = {
//         user: localStorage.getItem('email'),
//         track: trackdata,
//         playlist_name: playlist
//     }
//     console.log(info)
//     axios.post('https://bopbot-backend.herokuapp.com/tracks-update-unfavourite-playlist', info).then((res) => {
//         console.log('track now favourited')
//         console.log(res)

//     }).catch(e => {
//         console.log(e)
//     })
// }