import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import {RiHeartLine, RiHeartFill} from "react-icons/ri";
import { useState } from "react";

const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    margin:0 15px 0 15px;
    
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
    border : 1px red;
    max-width: 800px;
`;

const Cont1= styled.div`
    display: flex;
    border : 1px solid red;
    flex-grow: 1;
    height: 82px;
`;

const Cont2 = styled.div`
    display: flex;
    flex-direction: column;
    height: 82px;
    border : 1px solid red;
    flex-grow: 2;
`;

const Cont3 = styled.div`
    display: flex;
    border : 1px solid red;
    height: 82px;
    flex-grow: 1;
`;

const Cont4 = styled.div`
    display: flex;
    border : 1px solid red;
    height: 82px;
    flex-grow: 1;
`;

const Cont5 = styled.div`
    display: flex;
    border : 1px solid red;
    height: 82px;
    flex-grow: 1;
`;

export default function MyTrack({
    text = 'button',
    size = '18px',
    time = '2:55',
    artist = 'Zoe James',
    song = 'In the House',
    album = 'Diffy',
    onClick = () => {},
}){
    const [heart, setHeart] = useState(false);
    const {theme} = useTheme();
   

    return <TrackCont>

        <Cont1>
            <Text
            color={themes[theme].focus}
            >1</Text>
        </Cont1>

        <Cont2>
            <Text color={themes[theme].focus}>
                {song}
            </Text>

            <Text
            color={themes[theme].highlight}
            textHover={themes[theme].accent1}
            >{artist}</Text>
        </Cont2>

        <Cont3>
            <Text
            color={themes[theme].focus}
            >{time}</Text>
        </Cont3>

        <Cont4>
            <Text
            color={themes[theme].focus}
            >{album}</Text>
        </Cont4>

        <Cont5>
            <Text
            color={themes[theme].focus}
            textHover={themes[theme].accent1}
            >
            {heart===false?<RiHeartLine onMouseOver={()=>setHeart(true)}/>:<RiHeartFill onMouseOut={()=>setHeart(false)}/>}
            </Text>
        </Cont5>




        
    </TrackCont>
    
    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>
    
}