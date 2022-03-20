import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useHeader, useTitle, titleSize, parSize, headerSize, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"


import SbButton from "../SbButton"



const Cont = styled.div`
    width:567px;
    height:557px;
    background-color: #282828;
    border-radius: 20.95px;
    justify-content: center;

    margin: 15px;;
`;

const TopCont = styled.div`
display: flex;
justify-content: space-around;
margin-top: 40px;
`;

const EPText = styled.text`
    font-size: ${titleSize};
    color:white;
`;

const MidCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;

`;

const ChangeImageText = styled.text`
    color: white;
    font-size: ${parSize};
    text-decoration: underline;
    margin-top: 10px;

`;

const BotInput = styled.input`
    display: flex;
    justify-content: center;
    color: #fff;
    width: 363px;
    height: 44.78px;
    background-color: #7C7C7C;
    border-radius:10px;
    margin-top: 22px;

    ::placeholder,
    ::-webkit-input-placeholder {
    color: lightgray;
    font-size: ${parSize};
    display: flex;

     }
     /* :-ms-input-placeholder {
     color: red;
    } */
`;

const ButtonCont =styled.div`
    display:flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 30px;
`;



const EditPlaylist = ({
    
}) => {
    const {parSize} = usePar()
    const {headerSize} = useHeader()
    const {titleSize} = useTitle()
    return (
    <Cont>
        <TopCont>
             <EPText>Edit Playlist</EPText>
             <img width="40.33px" height="40.33px" src={"../../public/purpleX.png"}></img>
        </TopCont>

        <MidCont>
        <img width="207.69px" height="215.38px" src={"../../public/playlistPop.png"}></img>
        <ChangeImageText>Change image</ChangeImageText>
        <BotInput type="text" placeholder="edit title here"  ></BotInput>
        {/* <input 
        width="363"
        height="45"
        background-color="#fad"
        ></input> */}
        </MidCont>

        <ButtonCont>
            <SbButton
              text= "Save"
              width= "98"
              height= "35"
             />
        </ButtonCont>

        

    </Cont>
    );
}

export default EditPlaylist;