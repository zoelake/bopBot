import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from "react";
import MyText from "../Text";

const Cont = styled.div`
    width:85px;
    height:85px;
    background-color: ${props => props.bg};
    color: ${props => props.color};
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius:5px;


    /* :hover {
        border: 2px solid ${props => props.borderHover};
    } */
    
`;

export default function SbButton({
    text = 'R&B',
    onClick = () => { },
    color = 'white',
}) {

    const { theme } = useTheme();

    const [selected, setSelected] = useState(null)

    return <Cont
        onClick={onClick}
        // border={themes[theme].focus}
        bg={color}

    >
        <MyText
            text={text}
            size='18px'
            color={themes[theme].contrast}
            textHover={themes[theme].accent}
       />
    </Cont>
}