import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
//idk what this does??????? 
import React, { useState, useEffect } from "react";

import { themes } from '../../utils/variables';
import { usePar, useHeader, useTheme } from "../../utils/provider";
import styled from 'styled-components';
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import MyRadio from "../Radio";

import MyText from '../Text';

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
    align-items: center;
    /* flex-direction: row; */
    justify-content: space-evenly;
    height:80px;

    
`;


const Cont2 = styled.div`
    /* align-self: flex-start; */
`;

const Cont3 = styled.div`
    width:300px;

`;

const Cont4 = styled.div`
`;

const Dotcont = styled.div`
    /* display: column; */
    /* align-items:center ;
    justify-content: center;
    align-content:center; */


`;


const Dots = styled.div`
    background-color: ${props => props.col};
    width:5px;
    height:5px;
    border-radius: 100%;
    margin-bottom: 2px;
`;


const style = {
    // border: '1px dashed gray',
    height: 51,
    padding: '5px 5px',
    backgroundColor: '#000',
    // backgroundColor: themes[theme].heart,
    color: '#fff',
    cursor: 'move',
};

export const Card = ({ 
    id, 
    title, 
    index, 
    artist, duration, albumname, moveCard,
    //data

   OpenOptions = () => { },
    AddToLikedPlaylist = () => { },
}) => {
    const ref = useRef(null);
    const { theme } = useTheme();
    const { parSize } = usePar();
    const [selected, setSelected] = useState(false)

    function LikeTrack() {
        setSelected(!selected);
        AddToLikedPlaylist();
        
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
            style={{ ...style, opacity }} 
            op={isDragging ? 0.5 : 1}
            data-handler-id={handlerId}>
			<Cont2>
            {id}
            </Cont2>

            <Cont3>
                <MyText
                    text={title}
                    size={`${parSize}px`}
                    lineHeight={0}
                    weight={400}
                    hover={themes[theme].heart} 
                    //is this working?
                    >
                    {title}
                </MyText>

                <Text
                    color={themes[theme].accent}>
                    {artist}
                </Text>
            </Cont3>

            <Cont4>
                <Text
                    color={themes[theme].text}
                    >
                    {duration}
                </Text>
            </Cont4>

            <Cont4>
                <Text
                    color={themes[theme].text}
                    >
                    {albumname}
                </Text>
            </Cont4>

            <Cont4>
                <MyRadio shape={'heart'} inner={selected} onClick={LikeTrack} />
            </Cont4>

            <Dotcont onClick={OpenOptions}>
                <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} />
                <Dots col={themes[theme].text} />
            </Dotcont>

		</CardCont>);
};
