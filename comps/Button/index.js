import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Cont = styled.div`
    padding:5px;
    margin:5px;
    max-width: 100px;
    height: 35px;
    border: none;
    border-radius:5px;
    display:flex;
    justify-content: center;
    background-color:${props=>props.bg};
    color: ${props=>props.color};

    :hover {
        background-color: ${props=>props.bgHover};
        color: ${props=>props.textHover};
    }
    
`;
const Text = styled.p`
    display:flex;   
    justify-content: center;
    align-items: center;
`;

export default function MyButton({
    text = 'button',
    onClick = () => {},
}){

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    bg={themes[theme].mid}
    color={themes[theme].highlight}
    bgHover={themes[theme].highlight}
    textHover={themes[theme].contrast}
    >
        <Text
        color={themes[theme].focus}
        >{text}</Text>
    </Cont>
}