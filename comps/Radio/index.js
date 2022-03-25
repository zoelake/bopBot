import styled from "styled-components";
import { useTheme } from "../../utils/provider";
import { themes } from "../../utils/variables";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { device } from '../../styles/mediaSizes'

const CircBorder = styled.div`

    @media ${device.mobile}{
        width:25px;
        height:25px;
        border-radius:100%;
        border:1px solid ${props => props.border};
        display: flex;
        justify-content: center;
        align-items: center;

    }

    @media ${device.tablet}{
        width:25px;
        height:25px;
        border-radius:100%;
        border:2px solid ${props => props.border};
        display: flex;
        justify-content: center;
        align-items: center;

    }

    @media ${device.desktop}{
        width:35px;
        height:35px;
        border-radius:100%;
        border:2px solid ${props => props.border};
        display: flex;
        justify-content: center;
        align-items: center;

    }
`;

const CircInner = styled.div`

    @media ${device.mobile}{
        display: flex;
        width:15px;
        height:15px;
        border-radius:100%;
        background-color: ${props => props.col};

    }

    @media ${device.tablet}{
        display: flex;
        width:15px;
        height:15px;
        border-radius:100%;
        background-color: ${props => props.col};

    }

    @media ${device.desktop}{
        display: flex;
        width:25px;
        height:25px;
        border-radius:100%;
        background-color: ${props => props.col};

    }
`;

const HeartBorder = styled.div`

`;

const HeartInner = styled.div`
   
`;

export default function MyRadio({
    shape = 'circle',
    inner = 'white',
    onClick = () => { },
}) {

    const { theme } = useTheme()

    if (shape === 'circle') {
        return <CircBorder
            onClick={onClick}
            border={themes[theme].text}
        >
            <CircInner
                col={inner ? themes[theme].heart : 'transparent'} />
        </CircBorder>
    }
    if (shape === 'heart') {
        return <>
            {inner ?
                <AiFillHeart
                    size={20}
                    onClick={onClick}
                    color={themes[theme].heart} />

                : <AiOutlineHeart
                    size={20}
                    onClick={onClick}
                    color={themes[theme].text} />} </>

    }
}