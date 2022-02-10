import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import {RiHeartLine, RiHeartFill} from "react-icons/ri";
import { useState } from "react";

const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    margin:15px;
    padding:0;

    :hover{
        color: ${props=>props.textHover};
    }
`;

const TrackCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly
`;

export default function MyTrack({
    text = 'button',
    size = '18px',
    onClick = () => {},
}){
    const [heart, setHeart] = useState(false);
    const {theme} = useTheme();
   

    return <TrackCont>
        <Text
        color={themes[theme].focus}
        >1</Text>
        <Text
        color={themes[theme].focus}
        >In the House
            <Text
            color={themes[theme].highlight}
            textHover={themes[theme].accent1}
            >Zoe James</Text>
        </Text>
        <Text
        color={themes[theme].focus}
        >Time</Text>
        <Text
        color={themes[theme].focus}
        >Diffy</Text>
        <Text
        color={themes[theme].focus}
        textHover={themes[theme].accent1}
        >
        {heart===false?<RiHeartLine onMouseOver={()=>setHeart(true)}/>:<RiHeartFill onMouseOut={()=>setHeart(false)}/>}
        </Text>

        
    </TrackCont>
    
    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>
    
}