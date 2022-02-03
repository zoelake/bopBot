import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Cont = styled.div`
    padding:5px;
    margin:5px;
    min-width:150px;
    border: 2px solid ${props=>props.border};
    border-radius:5px;
    display:flex;
    justify-content: center;
    background-color:${props=>props.bg};
    color: ${props=>props.color};

    :hover {
        border: 2px solid ${props=>props.borderHover};
    }
    
`;
const Text = styled.p``;

export default function MyButton({
    text = 'button',
    onClick = () => {},
}){

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    border={themes[theme].focus}
    bg={themes[theme].contrast}
    color={themes[theme].focus}
    >
        <Text
        color={themes[theme].focus}
        textHover={themes[theme].accent}
        >{text}</Text>
    </Cont>
}