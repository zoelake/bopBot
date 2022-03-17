import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme, useSbSize } from "../../utils/provider";
import { useEffect, useState } from "react";
import MyText from "../Text";

const Cont = styled.div`
    width:${props => props.width}px;
    height:${props => props.height}px;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius:5px;
    margin: 0 5px 5px 0;
    box-shadow: ${props=>props.shadow};


    /* :hover {
        border: 2px solid ${props => props.borderHover};
    } */
    
`;

export default function SbButton({
    text = 'R&B',
    onClick = () => { },
    color,
    textCol,
    width,
    shadow = 'transparent',
    height= "65"
}) {

    const { theme } = useTheme();
    const { parSize } = usePar();

    const [selected, setSelected] = useState(null);
    let [newWidth, setNewWidth] = useState(85)


    return <Cont
        shadow={shadow}
        width={width}
        onClick={onClick}
        // border={themes[theme].focus}
        bg={themes[theme].accent}
        height={height}
    
    >
        <MyText
            text={text}
            size={`${parSize}px`}
            color={themes[theme].white}
            textHover={'#fff'}
            weight={600}
        />
    </Cont>
}