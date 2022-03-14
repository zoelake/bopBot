import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"

const Cont = styled.div`
    width: 400px;
    height:75px;
    display: flex;
    background-color: ${props=>props.bg};
`;

const WhiteHeart = styled.img`
    width: 65px;
    height:65px;
`;


const Modal = ({
    heart = '/heart.png',
})=>{

    const {theme} = useTheme();
    const {parSize} = usePar();

    return (
    <Cont
    bg={themes[theme].contrast}
    >
        <WhiteHeart src={heart}/>
        <MyText  
        size={`${parSize}px`}
        text= "Added to liked songs"
        />
    </Cont>
    );
}

export default Modal;