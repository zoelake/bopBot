import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from "react";

const Cont = styled.div`
    width:85px;
    height:85px;
    background-color: ${props=>props.bg};
    color: ${props=>props.color};
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius:5px;


    /* :hover {
        border: 2px solid ${props=>props.borderHover};
    } */
    
`;
const Text = styled.p``;

export default function SbButton({
    text = 'R&B',
    onClick = () => {},
}){

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    // border={themes[theme].focus}
    bg={themes[theme].light}

    >
        <Text
        color={themes[theme].focus}
        textHover={themes[theme].accent}
        >{text}</Text>
    </Cont>
}