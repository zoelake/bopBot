import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";


const Text = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    line-height: ${props => props.height};
    padding:0;
    font-weight: ${props => props.weight};
    word-wrap: break-word;

    :hover {
        color:${props => props.hover};
    }
`;

export default function MyText({
    text = 'button',
    size = '30px',
    color,
    weight,
    lineHeight = 'auto',
    hover,
    style,
    onClick = () => { },
}) {

    const { theme } = useTheme();


    return <Text
        style={style}
        onClick={onClick}
        color={color || themes[theme].text}
        fontSize={size}
        height={lineHeight}
        weight={weight}
        hover={hover || ''}
    >{text}</Text>
}