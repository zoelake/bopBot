import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../Text/index"

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
    font-size: 18px;
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
`;


const AddedTrackPopup = ({
    playlist = 'Playlist',
    coverSrc = '/playlistPop.png',
    onXClick = () => { },
    onSaveClick = () => { },
    onDeleteClick = () => { },
    handleChange = () => { },
}) => {
    return (
        <Cont>
            <TopCont>
                <EPText>Edit {playlist}</EPText>
                <img onClick={onXClick} width="40.33px" height="40.33px" src={"/purpleX.png"} />
            </TopCont>

            <MidCont>
                <img width="207.69px" height="215.38px" src={coverSrc}></img>
                <ChangeImageText>Change image</ChangeImageText>
                <BotInput onChange={handleChange} type="text" placeholder="edit title here"  ></BotInput>
            </MidCont>

            <MyButton
                onClick={onSaveClick}
                text="Save"
                width="20%"
                style={{ position: 'relative', left: '70%' }}
            />
            <MyButton
                onClick={onDeleteClick}
                text="Delete"
                width="20%"
                style={{ position: 'relative', left: '70%' }}
            />




        </Cont>
    );
}

export default AddedTrackPopup;