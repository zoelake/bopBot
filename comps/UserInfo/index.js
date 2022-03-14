import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme, useTitle } from "../../utils/provider";
import Text from "../../comps/Text/index"

const Cont = styled.div`
    max-width: 600px;
    max-height: 200px;
    display: flex;
    align-items: center;
`;

const ProfilePic = styled.img`
    border-radius: 100px;
    width: 170px;
    height:170px;
    margin-right:25px;
`;

const UserInfo = ({
    iconimage = '/userDummy.png',
    username = "Tristan the Gobbler",
})=>{
    const {theme} = useTheme();
    const {titleSize} = useTitle();
    
    return (
       <Cont>
           <ProfilePic src={iconimage}/>
           <Text
           size={`${titleSize}px`}
           text={username}
           color={themes[theme].text}

           />
       </Cont>
    );
}

export default UserInfo;