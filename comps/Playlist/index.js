import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Cont = styled.div`
    display:flex;
    width: 140px;
    height: 182px;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    border-radius:5px;
    padding: 5px;
    justify-content: space-around;



    background-color:${props=>props.bg};
    color: ${props=>props.color};

    /* :hover {
        border: 2px solid ${props=>props.borderHover};
    } */
    
`;


const ImgCont = styled.div`
    height:100px;
    width: 100px;
    border-radius:5px;
    overflow: hidden;
  
`;

const Text = styled.p`
    font-size: 24px;
`;



export default function Playlist({
    text = 'Liked',
    onClick = () => {},
    image = "https://placekitten.com/100/100"
}){

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    bg={themes[theme].contrast}
    color={themes[theme].focus}
    >
        <ImgCont>
            <img src={image}></img>
        </ImgCont>
        <Text>{text}</Text>
    </Cont>
}