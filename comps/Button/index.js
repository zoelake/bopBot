import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme, usePar } from "../../utils/provider";
import { device } from "../../styles/mediaSizes";
import { useState } from "react";

const Cont = styled.div`


    @media ${device.mobile}{
        padding: 20px 8px;
        margin:5px;
        height: 10px;
        width: 100%;


    }

    @media ${device.tablet}{


    }

    @media ${device.desktop}{


    }

    padding: 20px 8px;
    margin:5px;
    height: 20px;
    width:${props => props.width};
    border-radius:7px;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:${props => props.bg};
    color: ${props => props.color};
    // box-shadow:${props => props.shadow};
    width: ${props=>props.width};
    cursor: pointer;

    /* :hover {
        background-color: ${props => props.bgHover};
        color: ${props => props.textHover};
    } */

`
;
const Text = styled.p`
@media ${device.mobile}{
    font-size: 13px;

}

@media ${device.tablet}{


}

@media ${device.desktop}{


}

display:flex;   
justify-content: center;
align-items: center;
font-size: ${props => props.size};`

;

export default function MyButton({
    text = 'button',
    onClick = () => { },
    shadow,
    width = 'auto',
    style,
    bg
}) {

    const { theme } = useTheme();
    const { parSize } = usePar();

    const [press, setPress] = useState(false);

    function buttonPress() {
        onClick();
        setPress(true)
        setTimeout(() => {
          setPress(false)
        }, 200);

      }


    return <Cont
    style={style}
        onClick={buttonPress}
        bg={bg || themes[theme].heart}
        color={themes[theme].white}
        shadow={press ? 'inset 2px 2px 4px rgba(0,0,0,0.1)' : 'inset 5px 5px 2px rgba(255,255,255,0.25)'}
        width={width}
    >
        <Text
            // color={themes[theme].focus}
            size={`${parSize}px`}
        >{text}</Text>
    </Cont>
}