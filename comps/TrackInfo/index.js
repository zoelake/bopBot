import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useState } from "react";
import MyRadio from "../Radio";
import MyText from "../Text";

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
    width: 40vw;
    height:80px;
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
    text = 'button',
    size = '18px',
    time = '2:55',
    artist = 'Zoë James',
    song = 'In the House',
    album = 'Diffy',
    onTrackClick = () => { },
    onDotsClick = () => { },
}) {
    const [heart, setHeart] = useState(false);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const [selected, setSelected] = useState(false)


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
            {/* <Text
                color={themes[theme].text}
                textHover={themes[theme].heart}
            >
                {heart === false ? <RiHeartLine onMouseOver={() => setHeart(true)} /> : <RiHeartFill onMouseOut={() => setHeart(false)} />}
            </Text> */}
            <MyRadio shape={'heart'} inner={selected} onClick={() => setSelected(!selected)} />
        </Cont5>
        <Cont6 onClick={onDotsClick}>
            <Dots col={themes[theme].text} />
            <Dots col={themes[theme].text} />
            <Dots col={themes[theme].text} />
        </Cont6>





    </TrackCont>

    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>

}