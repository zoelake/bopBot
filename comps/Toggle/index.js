import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from "react";

const Cont = styled.div`
    width:130px;
    height:52px;
    background-color: ${props=>props.bg};
    color: ${props=>props.color};
    justify-content: center;
    display:flex;
    flex-direction: row;
    border-radius: 5px;


    /* :hover {
        border: 2px solid ${props=>props.borderHover};
    } */
    
`;

const Plus = styled.div`
    height:52px;
    width: 65px;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;

`;
const Minus = styled.div`
    height:52px;
    width: 65px;
    /* background-color: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;

`;

const Text = styled.p``;

export default function Toggle({
    text = 'R&B',
    onClick = () => {},


}){
    let [count, setCount] = useState(0);
    function incrementCount(){
        count = count + 1;
        setCount(count);
    }

    function decrementCount(){
        count = count -1;
        setCount(count);
    }

    console.log(count);

    const {theme} = useTheme();

    return<Cont 
    onClick={onClick}
    // border={themes[theme].focus}
    bg={themes[theme].contrast}
    color={themes[theme].focus}
    >
        <Minus onClick={decrementCount}>-</Minus>
        <Plus onClick={incrementCount}>+</Plus>
    </Cont>
}