import styled from "styled-components";
import { useHeader } from "../../utils/provider";
import MyText from "../Text";


const Cont = styled.div`
    display:flex;
    width: 155px;
    height: 152px;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    border-radius:5px;
    padding: 25px 10px;
    margin:0 10px 0 0 ;
    justify-content: space-around;



    background-color:${props=>props.bg};
    color: ${props=>props.color};

    /* :hover {
        border: 2px solid ${props=>props.borderHover};
    } */
    
`;


const ImgCont = styled.a`
    height:150px;
    width: 150px;
    border-radius:5px;
    overflow: hidden;
  
`;
const Cover = styled.img`
    height:100px;
    width: 100px;
    border-radius:5px;
    overflow: hidden;
  
`;





export default function Playlist({
    text = 'Liked',
    onClick = () => {},
    cover = "https://placekitten.com/100/100",
    bg = 'white',
    color = 'red',
}){

    const {headerSize} = useHeader();

    return<Cont 
    onClick={onClick}
    bg={bg}
    color={color}
    >
        <Cover src={cover}/>
        <MyText
        size={`${headerSize}px`}
        text={text}
        
        />
    </Cont>
}