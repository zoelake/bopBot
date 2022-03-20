import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useHeader, useTheme } from "../../utils/provider";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";
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
        width: 40vw;
    }

    @media ${device.desktop}{
        width: 40vw;
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

const Model = styled.div`
    position:absolute;
    display: flex;
    flex-direction: column;
    width: 200px;
    height:auto;
    background-color: rgba(255,255,255,0.5);
    padding:10px;
`;


export default function MyTrack({
    text = 'button',
    size = '18px',
    time = '2:55',
    artist = 'Zoë James',
    song = 'In the House',
    album = 'Diffy',
    playlists,
    selected = false,
    onTrackClick = () => { },
    OpenOptions = () => { },
    AddToLikedPlaylist = () => { },
    DeleteFromLikedPlaylist = () => { },
}) {
    const [heart, setHeart] = useState(false);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const { headerSize } = useHeader();

    function LikeTrack() {
        // setSelected(!selected);
        console.log('selected')
        console.log(selected)

        if (selected !== 100) {
            console.log('adding track')
            AddToLikedPlaylist();
        }
        if (selected == 100) {
            console.log('deleting track')
            DeleteFromLikedPlaylist();
        }
    }

    return <TrackCont>

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
            <MyRadio shape={'heart'} inner={selected == 100 ? true : false} onClick={LikeTrack} />
        </Cont5>
        <Cont6
            onClick={OpenOptions}>
            <DropDownEdit />
        </Cont6>





    </TrackCont>

    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>

}