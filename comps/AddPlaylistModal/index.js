import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"

import SbButton from "../SbButton";
import MyButton from "../Button";


const Cont = styled.div`
    width:567px;
    height:557px;
    background-color: #282828;
    border-radius: 20.95px;
    justify-content: center;
    margin: 15px;
    z-index: 200;
`;

const TopCont = styled.div`
display: flex;
justify-content: space-around;
margin-top: 40px;
`;

const EPText = styled.text`
    font-size: 36px;
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
    font-size: ${props => props.size};
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
`;

const ButtonCont = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 30px;
    border:2px solid green;

`;


const AddPlaylist = ({
    coverSrc = '',
    onXClick = () => { },
    onSaveClick = () => { },
    handleChange = () => { },
}) => {
    return (
        <Cont>
            <TopCont>
                <EPText>Create new Playlist</EPText>
                <img onClick={onXClick} width="40.33px" height="40.33px" src={"/purpleX.png"} />
            </TopCont>

            <MidCont>
                <img width="207.69px" height="215.38px" src={coverSrc}></img>
                <ChangeImageText>Add image</ChangeImageText>
                <BotInput onChange={handleChange} type="text" placeholder="enter title here"  ></BotInput>
            </MidCont>

            <MyButton
                onClick={onSaveClick}
                text="Save"
                width="20%"
                style={{ position: 'relative', left: '70%' }}
            />




        </Cont>
    );
}

export default AddPlaylist;