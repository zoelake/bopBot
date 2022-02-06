import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Cont = styled.div`
    display:flex;
    width: 140px;
    height: 182px;
    justify-content: center;
    border-radius:5px;


    background-color:${props=>props.bg};
    color: ${props=>props.color};

    /* :hover {
        border: 2px solid ${props=>props.borderHover};
    } */
    
`;


const ImgCont = styled.div`
    
`;



export default function Playlist({
    text = 'button',
    onClick = () => {},
}){

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    bg={themes[theme].contrast}
    color={themes[theme].focus}
    >

    </Cont>
}