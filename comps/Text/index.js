import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    padding:0;
`;

export default function MyText({
    text = 'button',
    size = '30px',
}){

    const {theme} = useTheme();
   

    return <Text
   color={themes[theme].text}
    fontSize={size}
    >{text}</Text>
}