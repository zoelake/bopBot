import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme, usePar } from "../../utils/provider";
import { device } from "../../styles/mediaSizes";

const Cont = styled.div`
    padding: 5px 8px;
    margin:5px;
    height: 35px;
    width:${props => props.width};
    border-radius:5px;
    display:flex;
    justify-content: center;
    background-color:${props => props.bg};
    color: ${props => props.color};
    box-shadow:${props => props.shadow};
    width: ${props=>props.width};


    /* :hover {
        background-color: ${props => props.bgHover};
        color: ${props => props.textHover};
    } */
    
`;
const Text = styled.p`
    display:flex;   
    justify-content: center;
    align-items: center;
    font-size: ${props => props.size};
`;

export default function MyButton({
    text = 'button',
    onClick = () => { },
    shadow,
    width = 'auto'
}) {

    const { theme } = useTheme();
    const { parSize } = usePar();


    return <Cont
        onClick={onClick}
        bg={themes[theme].heart}
        color={themes[theme].white}
        shadow={shadow}
        width={width}
    // bgHover={themes[theme].bntSelected}
    // textHover={themes[theme].bntTxtSelect}
    >
        <Text
            // color={themes[theme].focus}
            size={`${parSize}px`}
        >{text}</Text>
    </Cont>
}