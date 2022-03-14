import styled from "styled-components";
import { useHeader } from "../../utils/provider";
import MyText from "../Text";
import { device } from "../../styles/mediaSizes";

const Cont = styled.div`
    display:flex;
    min-width: 155px;
    height: 165px;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    border-radius:10px;
    padding: 15px 0px 10px 0px;
    margin:0 40px 0 0 ;
    justify-content: space-around;
    background-color:${props => props.bg};
    color: ${props => props.color};

    /* :hover {
        border: 2px solid ${props => props.borderHover};
    } */

`;



const Cover = styled.img`
    height:140px;
    width:100px;
    border-radius:5px;
    overflow: hidden;  
`;





export default function Playlist({
    text = 'Liked',
    onClick = () => { },
    cover = "https://placekitten.com/155/180",
    bg = 'white',
    color = 'red',
}) {

    const { headerSize } = useHeader();

    return <Cont
        onClick={onClick}
        bg={bg}
        color={color}
    >
        <Cover src={cover} />
        <MyText
            size={`${headerSize}px`}
            text={text}

        />
    </Cont>
}