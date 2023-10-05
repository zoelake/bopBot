import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
//idk what this does??????? 
import React, { useState, useEffect } from "react";

import { themes } from '../../utils/variables';
import { usePar, useHeader, useTheme, theme } from "../../utils/provider";
import styled from 'styled-components';
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import MyRadio from "../Radio";
import MyText from '../Text';
import DropDownEdit from '../DropDownModal';

const Text = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.size};
    margin:0;
    padding:0;

    :hover{
        color: ${props => props.textHover};
    }
`;

const CardCont = styled.div`
    display: flex;
    /* flex-direction: row;
    justify-content: flex-start; */
    width: 100%;
    height: 85px;
    /* height: 51, */
    /* padding: 5px 5px; */
    background-color: ${props=>props.bg};
    /* color: #fff; */
    cursor: move;


    
`;


const Cont3 = styled.div`
    width:100%;


`;

const Cont4 = styled.div`
    display: flex;
    width: 100%;

`;

const Dotcont = styled.div`

`;

const BigCont = styled.div`
    display: flex ;
    flex-direction: row ;
    justify-content:flex-start ;
    align-items:center ;
    width:100%;
`;

const DurationCont = styled.div`
    width: 50px;
    margin-right:1rem ;



`;

const LikeIconCont = styled.div`
    /* width: 50px; */
    margin: 2%;
`;



// const style = {
//     // border: '1px dashed gray',
//     // height: 51,
//     // padding: '5px 5px',
//     // backgroundColor: '#ccc',
//     // color: '#fff',
//     // cursor: 'move',
// };

export const Card = ({ 
    time, 
    artist,
    song, 
    album, 
    selected = false,
    onTrackClick = () => {},
    OpenOptions = () => { },
    AddToLikedPlaylist = () => { },
    DeleteFromLikedPlaylist = () => { },
    
     moveCard,
    //data
    id,
    index,

}) => {
    const ref = useRef(null);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const [heart, setHeart] = useState(false);


 
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
        if (localStorage.getItem(`track #${selected}`) !== null) {
            setHeart(true)
        } else {
            setHeart(false)
        }

    }, [heart])

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (<CardCont ref={ref} 
            bg={themes[theme].playbg}
            style={{ opacity }} 
            op={isDragging ? 0.5 : 1}
            data-handler-id={handlerId}
            >
            <Cont3 onClick={onTrackClick}>
                <MyText
                    text={song}
                    size={`${parSize}px`}
                    lineHeight={0}
                    weight={400}
                    hover={themes[theme].heart} 
                    //is this working?
                    />

                <Text
                    color={themes[theme].grey}>
                    {artist}
                </Text>
            </Cont3>
        <BigCont>
            <DurationCont>
                <Text
                    color={themes[theme].text}
     
                    >
                    {time}
                </Text>
            </DurationCont>

            <Cont4>
                <Text
                    color={themes[theme].text}
                    
                    >
                    {album}
                </Text>
            </Cont4>

            <LikeIconCont>
                <MyRadio shape={'heart'} inner={heart} onClick={LikeTrack} />
            </LikeIconCont>

            <Dotcont onClick={OpenOptions}>
                <DropDownEdit/>
            </Dotcont>
            </BigCont>

		</CardCont>);
};
