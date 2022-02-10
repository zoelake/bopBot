import styled from "styled-components";
import { useState, useRef } from "react";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { RiMvFill, RiHome2Fill, RiSettings4Fill } from "react-icons/ri";
import { MyText } from "../Text/index";

const Container = styled.div`
    visibility: ${props=>props.visibility};
    width: 15%;
    height: 100%;
    background-color: ${props=>props.bg};
    display: flex;
    flex-direction: column;
    
`;

const NavLink = styled.a`
    padding: 10px;
    margin: 10px;
    maring-top: 20px;
    background-color: transparent ;
    border: none;
    text-align:left;
    font-weight: bold;
    text-decoration: none;
    font-size: 18px;
    color: ${props=>props.color};
    :hover {
        color: ${props=>props.linkHover};
    }
`;

const LinkCont = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const NavBar = ({
    iconColor= "white",
    fontSize= "18px", 
    iconSize= "18px",
    bgColor= "#212121",

}) => {



    const [hideNav, setHideNav] = useState(true)
    const [visibility, setVisibility] = useState()

    function View(){
        setHideNav(!hideNav)
        if (hideNav === true){
        setVisibility("visible")
        }
        if (hideNav === false){
            setVisibility("hidden")
        }
    }
    const {theme} = useTheme();


    return <><Container
        visibility={visibility}
        bg={themes[theme].mid}
    >
        <LinkCont>
        <NavLink href="/" 
        color={themes[theme].focus}
        linkHover={themes[theme].highlight}
        >
            <RiHome2Fill/> Home
        </NavLink>
        </LinkCont>

        <LinkCont>
        <NavLink href="/" 
        color={themes[theme].focus}
        linkHover={themes[theme].highlight}
        >
            <RiMvFill/> Library
        </NavLink>
        </LinkCont>

        <LinkCont>
        <NavLink href="/" 
        color={themes[theme].focus}
        linkHover={themes[theme].highlight}
        >
            <RiSettings4Fill/> Settings
        </NavLink>
        </LinkCont>
 
    </Container>
            <button onClick={View}>Toggle</button>

    </>
}

export default NavBar;