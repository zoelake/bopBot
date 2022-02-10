import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import Text from "../../comps/Text/index"

const Cont = styled.div`
    width: 400px;
    height:75px;
    display: flex;
`;

const WhiteHeart = styled.img`
    width: 65px;
    height:65px;
`;


const Modal = ({
    heart = require ('../../images/whitehHeart.png')
})=>{
    return (
    <Cont>
        <WhiteHeart source={heart}/>
        <Text  
        size="12px"
        text= "Added to liked songs"
        />
    </Cont>
    );
}

export default Modal;