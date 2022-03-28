import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useHeader, useTheme } from "../../utils/provider";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import axios from "axios";
import React, { useState, useEffect, } from "react";
import MyRadio from "../Radio";
import MyText from "../Text";
import { device } from "../../styles/mediaSizes";
import DropDownEdit from "../DropDownModal";

const Text = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    margin:0;
    padding:0;

    :hover{
        color: ${props => props.textHover};
    }
`;

const TrackCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    height:80px;

    @media ${device.mobile}{
        width:100%;
    }

    @media ${device.tablet}{
        width: 100%;
    }

    @media ${device.desktop}{
        width: 100%;
    }

`;

// const Cont1 = styled.div`
//     display: flex;
//     width: 5%;
//     border:2px solid red;


//      `;

const Cont2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    align-self: flex-start;
    top:-8px;
    position: relative;
`;
const Cont3 = styled.div`
    display: flex;
    width: 10%;
    align-self: flex-start;

     
`;
const Cont4 = styled.div`
    display: flex;
    width: 35%;
    align-self: flex-start;
     
`;
const Cont5 = styled.div`
    display: flex;
    width: 5%;
    align-content: left;
    align-self: flex-start;

     
`;
const Cont6 = styled.div`
    display: column;
    justify-content: space-between;
    align-content:space-between;
    width: 4%;
    align-self: flex-start;

`;

const Dots = styled.div`
    background-color: ${props => props.col};
    width:5px;
    height:5px;
    border-radius: 100%;
    margin-bottom: 2px;
`;



export default function MyTrack({

    time = '2:55',
    artist = 'Zoë James',
    song = 'In the House',
    album = 'Diffy',
    selected = false,
    onTrackClick = () => { },
    OpenOptions = () => { },
    AddToLikedPlaylist = () => { },
    DeleteFromLikedPlaylist = () => { },
    type = 'tracks',
    trackpos = null,
    children = null,
    content = null,
    onUpdateTrack = () => { }
}) {
    const [heart, setHeart] = useState(false);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const { headerSize } = useHeader();

    function LikeTrack() {
        // setSelected(!selected);
        console.log('selected')
        console.log(selected)
        setHeart(!heart)

        if (!heart) {
            console.log('adding track')
            AddToLikedPlaylist();
        }
        else {
            console.log('deleting track')
            DeleteFromLikedPlaylist();
        }
    }

    useEffect(() => {
        console.log('selected?' + selected)
        if (localStorage.getItem(`track #${selected}`) !== null) {
            setHeart(true)
        } else {
            setHeart(false)
        }

    }, [heart])




    return <TrackCont
    >
        <TrackCont >
            {/* {content} */}

            {/* <Cont1>
                <Text
                    color={themes[theme].text}
                >1</Text>
            </Cont1> */}


            <Cont2 onClick={onTrackClick}>
                <MyText
                    text={song}
                    size={`${parSize}px`}
                    lineHeight={0}
                    weight={600}
                    hover={themes[theme].heart}
                />


                <Text
                    color={themes[theme].accent}

                >{artist}</Text>
            </Cont2>

            <Cont3>
                <Text
                    color={themes[theme].text}
                >{time}</Text>
            </Cont3>

            <Cont4>
                <Text
                    color={themes[theme].text}
                >{album}</Text>
            </Cont4>


 <Cont5>
            <MyRadio shape={'heart'} inner={heart} onClick={LikeTrack} />
        </Cont5>
        <Cont6
            onClick={OpenOptions}>
            <DropDownEdit />
        </Cont6>

        </TrackCont>

    </TrackCont>



    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>

}