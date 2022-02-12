import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    margin:15px;
    padding:0;
`;

export default function MyText({
    text = 'button',
    size = '30px',
    color = 'themes[theme].focus',
}){

    const {theme} = useTheme();
   

    return <Text
   color={color}
    fontSize={size}
    >{text}</Text>
}