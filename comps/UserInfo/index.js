import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import Text from "../../comps/Text/index"

const Cont = styled.div`
    max-width: 600px;
    max-height: 200px;
    display: flex;
    align-items: center;
`;

const ProfilePic = styled.img`
    border-radius: 100px;
    width: 180px;
    height:180px;
`;

const UserInfo = ({
    iconimage = '/userDummy.png',
    username = "Tristan the Gobbler",
})=>{
    const {theme} = useTheme();
    return (
       <Cont>
           <ProfilePic src={iconimage}/>
           <Text
           size="36px"
           text={username}
           color={themes[theme].focus}

           />
       </Cont>
    );
}

export default UserInfo;