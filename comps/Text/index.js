import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { device } from "../../styles/mediaSizes";


const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: ${props=>props.height};
    padding:0;
    font-weight: ${props=>props.weight};

    :hover {
        color:${props=>props.hover};
    }

    @media ${device.mobile}{
        color: ${props=>props.color};
        font-size: 15px;
        line-height: ${props=>props.height};
        padding:0;
        font-weight: ${props=>props.weight};

    }

    @media ${device.tablet}{


    }

    @media ${device.desktop}{
        color: ${props=>props.color};
        font-size: ${props=>props.fontSize};
        line-height: ${props=>props.height};
        padding:0;
        font-weight: ${props=>props.weight};


    }
`;

export default function MyText({
    text = 'button',
    size = '30px',
    color,
    weight,
    lineHeight = 'auto',
    hover,
    onClick = () => {},
}){

    const {theme} = useTheme();
   

    return <Text
    onClick={onClick}
   color={color || themes[theme].text}
    fontSize={size}
    height={lineHeight}
    weight={weight}
    hover={hover || ''}
    >{text}</Text>
}