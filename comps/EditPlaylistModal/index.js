import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"
import SbButton from "../SbButton";
import MyButton from "../Button";


const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .3);
    /* overflow: auto; */
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    position: absolute;
`;

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    width:450px;
    height:520px;
    background-color: #282828;
    border-radius: 20.95px;
    z-index: 999999;
    position: relative;

    
`;

const HoldItems = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const TopCont = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    margin-top: 40px;
    width:100%;
`;

const EPText = styled.text`
    font-size: 36px;
    color:white;
`;
const Row = styled.div`
    display:flex;
    flex-direction: row;
    width: 200px;
    padding: 10px;
    
`;

// const MidCont = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     margin-top: 40px;
// `;

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
    
`;

const BottomCont = styled.div`
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items:flex-end;
    display:flex;
`;


const EditPlaylist = ({
    playlist = 'Playlist',
    coverSrc = '/playlistPop.png',
    onXClick = () => { },
    onSaveClick = () => { },
    onDeleteClick = () => { },
    handleChange = () => { },
}) => {
    return (
        <Page>
            <Cont>
                <HoldItems>

                
                <TopCont>
                    <EPText>Edit {playlist}</EPText>
                    <img onClick={onXClick} width="40.33px" height="40.33px" src={"/purpleX.png"} />
                </TopCont>

                <img width="207.69px" height="215.38px" src={coverSrc}></img>
                    <ChangeImageText>Change image</ChangeImageText>
                    

                    <BottomCont>
                        <BotInput onChange={handleChange} type="text" placeholder="edit title here"  ></BotInput>
                        <Row>

                        <MyButton
                            onClick={onSaveClick}
                            text="Save"
                            width="50%"
                            />
                        <MyButton
                            onClick={onDeleteClick}
                            text="Delete"
                            width="70%"
                            />
                            </Row>
                    </BottomCont>
                </HoldItems>
            </Cont>
        </Page>
    );
}

export default EditPlaylist;