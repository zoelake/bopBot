import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    padding:0;
    font-weight: ${props=>props.weight};
`;

export default function MyText({
    text = 'button',
    size = '30px',
    color,
    weight
}){

    const {theme} = useTheme();
   

    return <Text
   color={color || themes[theme].text}
    fontSize={size}
    weight={weight}
    >{text}</Text>
}