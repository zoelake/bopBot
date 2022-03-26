import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import MyRadio from "../Radio";
import MyText from "../Text";
import { device } from "../../styles/mediaSizes";
import { useDrag, useDrop } from 'react-dnd'

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
    ${({ op }) => op && `opacity:${op};`};
    ${({ position, left, top }) => (position === 'fixed' || position === 'absolute') && `
        left: ${left}px;
        top: ${top}px;
        position: ${position};
    `}
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
    AddToLikedPlaylist = () => { },
    children = null,
    item = {}
}) {
    const [heart, setHeart] = useState(false);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const [selected, setSelected] = useState(false)

    function LikeTrack() {
        setSelected(!selected);
        AddToLikedPlaylist();
    }

    const [pos, setPos] = useState({
        left: 0,
        top: 0,
        position: 'relative'
    })


    const [{ isDragging, coords }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'tracks',
        item,
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        end: (item, monitor) => {
            console.log('item')
            console.log(item)
            if (!monitor.didDrop()) {
                setPos({
                    left: monitor.getClientOffset().x,
                    top: monitor.getClientOffset().y,
                    // position: 'fixed'
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            coords: monitor.getClientOffset(),
        })
    }))

    // console.log(coords)
    //console.log(isDragging);

    const sty = {
        left: pos.left,
        top: pos.top,
        position: pos.position
    }

    if (coords && isDragging) {
        sty.left = coords.x + 10
        sty.top = coords.y
        sty.position = 'fixed'
    }

    return <TrackCont ref={dragPreview}
        op={isDragging ? 0.5 : 1}
        {...sty}
    >
        <TrackCont ref={drag}>
            {children}

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
                <MyRadio shape={'heart'} inner={selected} onClick={LikeTrack} />
            </Cont5>
            <Cont6 onClick={onDotsClick}>
                <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} />
            </Cont6>

        </TrackCont>





    </TrackCont>



    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>

}