// // import { TouchBackend } from 'react-dnd-touch-backend'
// // //import { HTML5Backend } from 'react-dnd-html5-backend'
// // import { DndProvider } from 'react-dnd'
// // import Dropzone from '../Dropzone';
// // import TrackInfoDnd from '../TrackInfoDnd';
// // import MyTrack from '../comps/TrackInfo'


// // import { v4 as uuidv4 } from 'uuid';

// // import { io } from "socket.io-client";
// // import styled from 'styled-components';
// // import { useState, useEffect } from 'react';


// // display: flex;
// // justify-content: flex-end;
// // `;

// // export default function BopBot() {
// //     const [dndtrack, setDndtrack] = useState({
// //         artist: "Zoe",
// //         song: "Mustang",
// //         time: "1964",
// //         album: "red"
// //     });
// //     const [mySoc, setMySoc] = useState(null);
// //     const [txt, setTxt] = useState('');
// //     const [msgs, setMsgs] = useState([]);
// //     const [users, setUsers] = useState({});




// //     useEffect(() => {
// //         const socket = io("http://localhost:8888");

// //         socket.on("init_user", (users) => {
// //             // set the user into the object so you store the users
// //             // console.log(users);
// //             setUsers(users);
// //         })

// //         socket.on("joined", (id, txt) => {
// //             setMsgs(() => [
// //                 `${id} is now playing ${txt}`
// //             ]);
// //         })

// //         setMySoc(socket)
// //     }, [])

// //     const EmitToIO = async () => {
// //         //mySoc to emit
// //         if (mySoc != null) {
// //             mySoc.emit("user_ready", txt);
// //         }
// //     }


// //     return (

// //         <Dropzone onDropItem={(item) => {
// //             //emit to socket the track that was dropped
// //             //the track info should be stored inside item
// //             // console.log('initial dndtrack')
// //             // console.log(dndtrack)
// //             console.log('item')
// //             console.log(item)
// //             // console.log('pls show this', dndtrack, 'track info', item)
// //             //emit the item
// //             //socket emit 'playing_song', `user is playing ${item.title}`
// //             // const t_id = uuidv4();

// //             // setDndtrack((prev) => ({
// //             //   ...prev,
// //             //   [t_id]: { id: t_id }
// //             // }))

// //             //  🪲🪲🪲🪲🪲 THIS NEEDS TO BE SET PROPERLY 🪲🪲🪲🪲🪲

// //             setDndtrack(() => {
// //                 return {
// //                     song: item.song,
// //                     time: item.time,
// //                     artist: item.artist,
// //                     album: item.album
// //                 }
// //             })


// //             console.log('set dndtrack')
// //             console.log(dndtrack)
// //         }}>
// //             <DndLogo src={'/BopBotLogo.svg'}></DndLogo>
// //             {/* {Object.values(dndtrack).map((o, i) => <MyTrack
// //                 type='boardtracks'
// //                 key={i}
// //                 artist={o.Artist}
// //                 song={o.Title}
// //                 album={o.Album}
// //                 time={((o.duration_ms / 1000) / 60).toFixed(2)}
// //                 trackpos={o.pos}
// //                 onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
// //                 item={o}
// //               />)} */}


// //             <input type='text' onChange={(e) => setTxt(e.target.value)} />
// //             <button onClick={EmitToIO}>Join and Alert</button>
// //             {msgs.map((o, i) => <div key={i} style={{ color: "#fff", backgroundColor: 'none', padding: 10 }}>
// //             </div>)}



// //             <Dropzone onDropItem={(item) => {
// //                 dndtrack[item.Title] = item;
// //                 setDndtrack({
// //                   ...dndtrack
// //                 })
// //               }}>
// //               <DndLogo src={'/BopBotLogo.svg'}></DndLogo>
// //               {Object.values(dndtrack).map((o, i) => <MyTrack
// //                 type='boardtracks'
// //                 key={i}
// //                 artist={o.Artist}
// //                 song={o.Title}
// //                 album={o.Album}
// //                 time={((o.duration_ms / 1000) / 60).toFixed(2)}
// //                 trackpos={o.pos}
// //                 onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
// //                 item={o}
// //               />)}

// //               <input type='text' onChange={(e)=>setTxt(e.target.value)} />
// //               <button onClick={EmitToIO}>Join and Alert</button>
// //               {msgs.map((o, i) => <div key={i} style={{backgroundColor: 'red', padding: 10}}>
// //                 {o}
// //               </div>)}

// //             </Dropzone>

// //             {/* <input type='text' onChange={(e) => setTxt(e.target.value)} /> */}
// //             {/* <button onClick={EmitToIO}>Join and Alert</button> */}
// //             {msgs.map((o, i) => <div key={i} style={{ backgroundColor: 'red', padding: 10 }}>
// //                 {o}
// //             </div>)}

// //         </Dropzone>
// //         )

// import { TouchBackend } from 'react-dnd-touch-backend'
// //import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'
// import Dropzone from '../Dropzone';
// import TrackInfoDnd from '../TrackInfoDND';
// import MyTrack from '../TrackInfo';
// import React from 'react';
// import { device } from '../../styles/mediaSizes'


// import { v4 as uuidv4 } from 'uuid';

// import { io } from "socket.io-client";
// import styled from 'styled-components';
// import { useState, useEffect } from 'react';
// import MyText from '../Text';

// const Cont = styled.div`
// display:flex;
// flex-direction:row;
// justify-content: center;
// position: absolute;
// right: 2%;
// bottom: 2%;
// z-index:1000;
// `;

// const DndLogo = styled.img`
// height: 60px;
// width: 60px;
// `;

// const BotCont = styled.div`
// display:flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
// `;


// const BopBotIcon = styled.img`


// display: flex;
// justify-content: flex-end;
// position: absolute;
// top: 1000px;
// `;

// export default function BopBot() {
//     const [dndtrack, setDndtrack] = useState({
//         artist: "Zoe",
//         song: "Mustang",
//         time: "1964",
//         album: "red"
//     });
//     const [mySoc, setMySoc] = useState(null);
//     const [txt, setTxt] = useState('');
//     const [msgs, setMsgs] = useState([]);
//     const [users, setUsers] = useState({});




//     useEffect(() => {
//         const socket = io("http://localhost:8888");

//         socket.on("init_user", (users) => {
//             // set the user into the object so you store the users
//             // console.log(users);
//             setUsers(users);
//         })

//         socket.on("joined", (id, txt) => {
//             setMsgs(() => [
//                 `${id} is now playing ${txt}`
//             ]);
//         })

//         setMySoc(socket)
//     }, [])

//     const EmitToIO = async () => {
//         //mySoc to emit
//         if (mySoc != null) {
//             mySoc.emit("user_ready", txt);
//         }
//     }


//     return (

//         <Dropzone onDropItem={(item) => {
//             //emit to socket the track that was dropped
//             //the track info should be stored inside item
//             // console.log('initial dndtrack')
//             // console.log(dndtrack)
//             console.log('item')
//             console.log(item)
//             // console.log('pls show this', dndtrack, 'track info', item)
//             //emit the item
//             //socket emit 'playing_song', `user is playing ${item.title}`
//             // const t_id = uuidv4();

//             // setDndtrack((prev) => ({
//             //   ...prev,
//             //   [t_id]: { id: t_id }
//             // }))

//             //  🪲🪲🪲🪲🪲 THIS NEEDS TO BE SET PROPERLY 🪲🪲🪲🪲🪲

//             setDndtrack(() => {
//                 return {
//                     song: item.song,
//                     time: item.time,
//                     artist: item.artist,
//                     album: item.album
//                 }
//             })


//             console.log('set dndtrack')
//             console.log(dndtrack)
//         }}>            
//             <Dropzone onDropItem={(item) => {
//                 dndtrack[item.Title] = item;
//                 setDndtrack({
//                   ...dndtrack
//                 })
//               }}>
//               <DndLogo src={'/BopBotLogo.svg'}></DndLogo>
//               {Object.values(dndtrack).map((o, i) => <MyTrack
//                 type='boardtracks'
//                 key={i}
//                 // artist={o.Artist}
//                 // song={o.Title}
//                 // album={o.Album}
//                 // time={((o.duration_ms / 1000) / 60).toFixed(2)}
//                 // trackpos={o.pos}
//                 // onUpdateTrack={(obj) => HandleUpdateTrack(o.id, obj)}
//                 item={o}
//               />)}

//               {/* <input type='text' onChange={(e)=>setTxt(e.target.value)} /> */}
//               <button onClick={EmitToIO}>Join and Alert</button>
//               {msgs.map((o, i) => <div key={i} style={{backgroundColor: 'red', padding: 10}}>
//                 {o}
//               </div>)}
//               
//             </Dropzone>

//             {/* <input type='text' onChange={(e) => setTxt(e.target.value)} /> */}
//             {/* <button onClick={EmitToIO}>Join and Alert</button> */}
//             {msgs.map((o, i) => <div key={i} style={{ backgroundColor: 'red', padding: 10 }}>
//                 {o}
//             </div>)}

//         </Dropzone>
//     )
// }

// // @media ${device.mobile}{
// //     height: 60px;
// //     width: 60px;
// //   }

// //   @media ${device.tablet}{
// //     height: auto;
// //     width: 50%;
// //     max-width: 150px;
// //   }


// // `;

// // export default function BopBot({
// //     dndtrack
// // }) {
// //     // const [dndtrack, setDndtrack] = useState({
// //     //     artist: "Zoe",
// //     //     song: "Mustang",
// //     //     time: "1964",
// //     //     album: "red"
// //     // });
// //     const [mySoc, setMySoc] = useState(null);
// //     const [txt, setTxt] = useState('');
// //     const [msgs, setMsgs] = useState([]);
// //     const [users, setUsers] = useState({});




// //     useEffect(() => {
// //         const socket = io("http://localhost:8888");

// //         socket.on("init_user", (users) => {
// //             // set the user into the object so you store the users
// //             // console.log(users);
// //             setUsers(users);
// //         })

// //         socket.on("joined", (id, txt) => {
// //             setMsgs((prev) => [
// //                 ...prev,
// //                 `Someone is listening to... ${txt}`
// //             ]);
// //         })

// //         setMySoc(socket)
// //     }, [])

// //     const EmitToIO = async () => {
// //         //mySoc to emit
// //         if (mySoc != null) {
// //             mySoc.emit("user_ready", txt);
// //         }
// //     }

// //     const [img, setImg] = useState(true)


// //     if (img) {
// //         return (
// //             <Cont>

// //                 <input type='text' onChange={(e) => setTxt(e.target.value)} />
// //                 <button onClick={EmitToIO}>Share a song!</button>
// //                 <BopBot>

// //                     <BotCont onClick={() => setImg(!img)} >
// //                         <BopBotIcon src={'/bopBot_neutral.svg'} />
// //                         <MyText
// //                             text='Click me!' />
// //                     </BotCont>
// //                     <BotCont>

// //                         {msgs.map((o, i) => <div key={i} style={{ backgroundColor: 'red', padding: 10 }}>
// //                             {o}
// //                         </div>)}
// //                     </BotCont>
// //                 </BopBot>

// //             </Cont>
// //         )
// //     }

// //     return (
// //         <Cont>
// //             <BotCont onClick={() => setImg(!img)}>
// //                 <BopBotIcon src={'/BopBotLogo.svg'} />
// //                 <MyText
// //                     text='Click me!' />
// //             </BotCont>
// //         </Cont>
// //     )
// // }

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

export default function BopBot() {
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




    // useEffect(() => {
    //     const socket = io("http://localhost:8888");

    //     socket.on("init_user", (users) => {
    //         // set the user into the object so you store the users
    //         // console.log(users);
    //         setUsers(users);
    //     })

    //     socket.on("joined", (id, txt) => {
    //         setMsgs((prev) => [
    //             ...prev,
    //             `Someone is listening to... ${txt}`
    //         ]);
    //     })

    //     setMySoc(socket)
    // }, [])

    const EmitToIO = async () => {
        //mySoc to emit
        // if (mySoc != null) {
        //     mySoc.emit("user_ready", txt);
        // }
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