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
    height: 5vh;
    background-color: ${props => props.bg};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    margin:0;
    width: 100%;
    /* position:absolute; */
    //min's change
    top:0;
    padding:5px 0px;
    z-index:999;
    /* padding:5px; */

    @media ${device.mobile}{ 
    }

    @media ${device.tablet}{
        
    }

    @media ${device.desktop}{
         
    }
`;

const NavLink = styled.p`
    /* padding: 10px; */
    margin: 0px 20px 0px 0px;
    font-weight: bold;
    line-height: 0;
    text-decoration: none;
    font-size: ${props => props.size};
    color: ${props => props.color};
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;

    :hover {
        color: ${props => props.linkHover};
    }
`;

const Logo = styled.img`
    height:100%;
    margin: 0px 0px 0px 10px;
`;

const LinkCont = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const NavBar = ({
    // id = 1,
    visibility = 'visible',
}) => {



    const [hideNav, setHideNav] = useState(true);
    // const [visibility, setVisibility] = useState();
    const { headerSize } = useHeader();

    // function View() {
    //     setHideNav(!hideNav)
    //     if (hideNav === true) {
    //         setVisibility("visible")
    //     }
    //     if (hideNav === false) {
    //         setVisibility("hidden")
    //     }
    // }
    const { theme } = useTheme();
    const { page, setPage } = usePage('home');
    const router = useRouter();

    function goHome() {
        router.push('/')
        setPage('home')
    }

    function goLibrary() {
        const id = localStorage.getItem('id')
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
            <Logo
                src={'/bopBot_neutral.svg'}
                onClick={goHome}
            />
            {/* <NavLink
                size={`${headerSize}px`}
                onClick={goHome}
                color={page == 'home' ? themes[theme].accent : themes[theme].emText}
                linkHover={themes[theme].accent}
            >
                <RiHome2Fill style={{ marginRight: '10px' }} /> Home
            </NavLink> */}
        </LinkCont>
        <LinkCont>

            
            <NavLink
                size={`${headerSize}px`}
                onClick={goLibrary}
                color={page === 'library' ? themes[theme].accent : themes[theme].text}
                linkHover={themes[theme].accent}
            >
                <RiMvFill style={{ marginRight: '10px' }} /> Library
            </NavLink>

            <NavLink
                size={`${headerSize}px`}
                onClick={goSettings}
                color={page === 'settings' ? themes[theme].accent : themes[theme].text}
                linkHover={themes[theme].accent}
            >
                <RiSettings4Fill style={{ marginRight: '10px' }} /> Settings
            </NavLink>
        </LinkCont>

    </Container>

    </>
}

export default NavBar;
