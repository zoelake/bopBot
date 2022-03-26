import { TouchBackend } from 'react-dnd-touch-backend'
//import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Dropzone from '../Dropzone';

import { v4 as uuidv4 } from 'uuid';

import { io } from "socket.io-client";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MyTrack from '../TrackInfo';

const Cont = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
`;


const DndLogo = styled.img`
height: 60px;
width: 60px;

display: flex;
justify-content: flex-end;
`;

export default function BopBot({
    dndtrack
}) {
    // const [dndtrack, setDndtrack] = useState({
    //     artist: "Zoe",
    //     song: "Mustang",
    //     time: "1964",
    //     album: "red"
    // });
    const [mySoc, setMySoc] = useState(null);
    const [txt, setTxt] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [users, setUsers] = useState({});




    useEffect(() => {
        const socket = io("http://localhost:8888");

        socket.on("init_user", (users) => {
            // set the user into the object so you store the users
            // console.log(users);
            setUsers(users);
        })

        socket.on("joined", (id, txt) => {
            setMsgs((prev) => [
                ...prev,
                `Someone is listening to... ${txt}`
            ]);
        })

        setMySoc(socket)
    }, [])

    const EmitToIO = async () => {
        //mySoc to emit
        if (mySoc != null) {
            mySoc.emit("user_ready", txt);
        }
    }


    return (

        <Dropzone onDropItem={(item) => {
            //emit to socket the track that was dropped
            //the track info should be stored inside item
            // console.log('initial dndtrack')
            // console.log(dndtrack)

            // console.log('pls show this', dndtrack, 'track info', item)
            //emit the item
            //socket emit 'playing_song', `user is playing ${item.title}`
            // const t_id = uuidv4();

            setDndtrack((prev) => ({
              ...prev,
              [t_id]: { id: t_id }
            }))

            //  🪲🪲🪲🪲🪲 THIS NEEDS TO BE SET PROPERLY 🪲🪲🪲🪲🪲
            // setDndtrack(previousState => {
            //     return {
            //         ...previousState,
            //         song: item.song,
            //         time: item.time,
            //         artist: item.artist,
            //         album: item.album
            //     }
            // });


            console.log('set dndtrack')
            console.log(dndtrack)
        }}>
            <Cont>

                <input type='text' onChange={(e) => setTxt(e.target.value)} />
                <button onClick={EmitToIO}>Share a song!</button>
                <DndLogo src={'/BopBotLogo.svg'}></DndLogo>
                {msgs.map((o, i) => <div key={i} style={{ backgroundColor: 'red', padding: 10 }}>
                    {o}
                </div>)}

            </Cont>


        </Dropzone>
    )
}

