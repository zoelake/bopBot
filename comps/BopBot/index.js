import { TouchBackend } from 'react-dnd-touch-backend'
//import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Dropzone from '../Dropzone';
import { device } from '../../styles/mediaSizes'


import { v4 as uuidv4 } from 'uuid';

import { io } from "socket.io-client";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MyTrack from '../TrackInfo';
import MyText from '../Text';

const Cont = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: center;
    position:absolute;
    right:2%;
    bottom:2%;
    z-index:1000;

`;

const BotCont = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
`;


const BopBotIcon = styled.img`


display: flex;
justify-content: flex-end;


@media ${device.mobile}{
    height: 60px;
    width: 60px;
  }

  @media ${device.tablet}{
    height: auto;
width: 50%;
max-width: 150px;
  }


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

    const [img, setImg] = useState(true)


    if (img) {
        return (
            <Cont>

                <input type='text' onChange={(e) => setTxt(e.target.value)} />
                <button onClick={EmitToIO}>Share a song!</button>
                <BopBot>

                    <BotCont onClick={() => setImg(!img)} >
                        <BopBotIcon src={'/bopBot_neutral.svg'} />
                        <MyText
                            text='Click me!' />
                    </BotCont>
                    <BotCont>

                        {msgs.map((o, i) => <div key={i} style={{ backgroundColor: 'red', padding: 10 }}>
                            {o}
                        </div>)}
                    </BotCont>
                </BopBot>

            </Cont>
        )
    }

    return (


        <Cont>
            <BotCont onClick={() => setImg(!img)}>
                <BopBotIcon src={'/BopBotLogo.svg'} />
                <MyText
                    text='Click me!' />
            </BotCont>


        </Cont>


    )
}

