import styled from "styled-components";
import { useState, useRef } from "react";
import { themes } from "../../utils/variables";
import { useTheme, usePage, useHeader } from "../../utils/provider";
import { RiMvFill, RiHome2Fill, RiSettings4Fill } from "react-icons/ri";
import { MyText } from "../Text/index";
import { device } from "../../styles/mediaSizes";
import { useRouter } from "next/router";

const Container = styled.nav`
    visibility: ${props => props.visibility};
    height: 100vh;
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: column;
    /* position: absolute; */
    margin:0;
    /* flex:1; */
    max-width: 250px;
    min-width: 150px;
    width: 25%;

    @media ${device.mobile}{ 
    }

    @media ${device.tablet}{
        
    }

    @media ${device.desktop}{
         
    }
`;

const NavLink = styled.p`
    padding: 10px;
    margin: 20px 10px 10px 10px;
    text-align:left;
    font-weight: bold;
    text-decoration: none;
    font-size: ${props => props.size};
    color: ${props => props.color};
    display: flex;
    justify-content: space-between;
    align-items: center;

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



    const [hideNav, setHideNav] = useState(true);
    const [visibility, setVisibility] = useState();
    const { headerSize } = useHeader();

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
    const { page, setPage } = usePage();
    const router = useRouter();

    function goHome() {
        router.push('/')
        setPage('/')
    }

    function goLibrary() {
        router.push(`/user/${id}`)
        setPage('library')
    }

    function goSettings() {
        router.push('/settings')
        setPage('settings')
    }

    return <><Container
        visibility={visibility}
        bg={themes[theme].mid}
    >
        <LinkCont>
            <NavLink
                size={`${headerSize}px`}
                onClick={goHome}
                color={page === '/' ? themes[theme].highlight : themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiHome2Fill style={{ marginRight: '10px' }} /> Home
            </NavLink>
        </LinkCont>

        <LinkCont>
            <NavLink
                size={`${headerSize}px`}
                onClick={goLibrary}
                color={page === 'library' ? themes[theme].highlight : themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiMvFill style={{ marginRight: '10px' }} /> Library
            </NavLink>
        </LinkCont>

        <LinkCont>
            <NavLink
                size={`${headerSize}px`}
                onClick={goSettings}
                color={page === 'settings' ? themes[theme].highlight : themes[theme].focus}
                linkHover={themes[theme].highlight}
            >
                <RiSettings4Fill style={{ marginRight: '10px' }} /> Settings
            </NavLink>
        </LinkCont>

    </Container>

    </>
}

export default NavBar;
