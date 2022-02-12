import styled from "styled-components";
import { useState, useRef } from "react";
import { themes } from "../../utils/variables";
import { useTheme, usePage } from "../../utils/provider";
import { RiMvFill, RiHome2Fill, RiSettings4Fill } from "react-icons/ri";
import { MyText } from "../Text/index";
import { device } from "../../styles/mediaSizes";
import { useRouter } from "next/router";

const Container = styled.div`
    visibility: ${props => props.visibility};
    height: 100vh;
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    position: absolute;
    left:0;
    top:0;

    @media ${device.mobile}{
        width:30%;
    }

    @media ${device.tablet}{
        max-width:250px;
        width:25%;
    }

    @media ${device.desktop}{
        max-width: 250px;
        width: 25%;
    }
`;

const NavLink = styled.nav`
    padding: 10px;
    margin: 10px;
    margin-top: 20px;
    background-color: transparent ;
    border: none;
    text-align:left;
    font-weight: bold;
    text-decoration: none;
    font-size: 18px;
    color: ${props => props.color};
    :hover {
        color: ${props => props.linkHover};
    }
`;

const LinkCont = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const NavBar = ({
    id = 1,
}) => {



    const [hideNav, setHideNav] = useState(true)
    const [visibility, setVisibility] = useState()

    function View() {
        setHideNav(!hideNav)
        if (hideNav === true) {
            setVisibility("visible")
        }
        if (hideNav === false) {
            setVisibility("hidden")
        }
    }
    const { theme } = useTheme();
    const {page, setPage} = usePage();
    const router = useRouter();

    function goHome(){
        router.push('/')
        setPage('/')
    }

    function goLibrary(){
        router.push(`/user/${id}`)
        setPage('library')
    }

    function goSettings(){
        router.push('/settings')
        setPage('settings')
    }

    return <><Container
        visibility={visibility}
        bg={themes[theme].mid}
    >
        <LinkCont>
            <NavLink
                onClick={goHome}
                color={page === '/' ? themes[theme].highlight :themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiHome2Fill /> Home
            </NavLink>
        </LinkCont>

        <LinkCont>
            <NavLink
                onClick={goLibrary}
                color={page === 'library' ? themes[theme].highlight :themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiMvFill /> Library
            </NavLink>
        </LinkCont>

        <LinkCont>
            <NavLink 
                onClick={goSettings}
                color={page === 'settings' ? themes[theme].highlight :themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiSettings4Fill /> Settings
            </NavLink>
        </LinkCont>

    </Container>

    </>
}

export default NavBar;
