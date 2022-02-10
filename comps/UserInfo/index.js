import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import Text from "../../comps/Text/index"

const Cont = styled.div`
    max-width: 600px;
    max-height: 200px;
    display: flex;

`;

const ProfilePic = styled.img`
    border-radius: 100px;
    width: 65px;
    height:65px;
`;

const UserInfo = ({
    iconimage= require ('../../images/profilepicture.png')
})=>{
    return (
       <Cont>
           <ProfilePic source={iconimage}/>
           <Text
           size="12px"
           text="Tristan the Gobbler"
           />
       </Cont>
    );
}

export default UserInfo;