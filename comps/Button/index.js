import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme, usePar } from "../../utils/provider";

const Cont = styled.div`
    padding: 5px 8px;
    margin:5px;
    height: 35px;
    border-radius:5px;
    display:flex;
    justify-content: center;
    background-color:${props => props.bg};
    color: ${props => props.color};

    :hover {
        background-color: ${props => props.bgHover};
        color: ${props => props.textHover};
    }
    
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
}) {

    const { theme } = useTheme();
    const { parSize } = usePar();


    return <Cont
        onClick={onClick}
        bg={themes[theme].button}
        color={themes[theme].accent}
        bgHover={themes[theme].bntSelected}
        textHover={themes[theme].bntTxtSelect}
    >
        <Text
            // color={themes[theme].focus}
            size={`${parSize}px`}
        >{text}</Text>
    </Cont>
}