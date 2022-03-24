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
    font-size: ${props => props.fontSize};
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
    height:50px;
    width: 90%;
    /* height: 51, */
    padding: 5px 5px;
    background-color: ${props=>props.bg};
    color: #fff;
    cursor: move;

    
`;


const Cont2 = styled.div`
    /* align-self: flex-start; */
`;

const Cont3 = styled.div`
    width:450px;

`;

const Cont4 = styled.div`
    display: flex;
    min-width: 250px;
    margin-right:1rem ;
    /* justify-content: flex-start ; */
    /* background-color:#fad ; */
    /* padding-right: 1rem ; */
`;

const Dotcont = styled.div`
    /* display: column; */
    /* align-items:center ;
    justify-content: center;
    align-content:center; */


`;

const BigCont = styled.div`
    display: flex ;
    flex-direction: row ;
    justify-content:flex-start ;
    align-items:center ;
    width: 450px;
`;

const DurationCont = styled.div`
    width: 50px;
    margin-right:1rem ;
`;

const LikeIconCont = styled.div`
    width: 50px;
    /* margin-right:1rem ; */
`;


const Dots = styled.div`
    background-color: ${props => props.col};
    width:5px;
    height:5px;
    border-radius: 100%;
    margin-bottom: 2px;
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
            bg={themes[theme].heart}
            style={{ opacity }} 
            op={isDragging ? 0.5 : 1}
            data-handler-id={handlerId}>
			{/* <Cont2>
            {id}
            </Cont2> */}

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
                <MyRadio shape={'heart'} inner={selected == 100 ? true : false} onClick={LikeTrack} />
            </LikeIconCont>

            <Dotcont onClick={OpenOptions}>
                {/* <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} /> */}
                <DropDownEdit/>
            </Dotcont>
            </BigCont>

		</CardCont>);
};
