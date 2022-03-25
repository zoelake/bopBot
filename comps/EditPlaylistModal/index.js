import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"

import SbButton from "../SbButton";
import MyButton from "../Button";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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
    margin: 22px 10px 0px 10px;
`;

const ButtonCont = styled.div`
    display:flex;
    justify-content: space-around;
   align-self: flex-end;
   margin-top: 40px;

`;


const EditPlaylist = ({
    playlist = 'Playlist',
    coverSrc = '/bopbot_happy.svg',
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
                <Carousel
                    ar
                    infiniteLoop={true}
                    showIndicators={false}
                    showStatus={false}
                    swipeable={true}
                    showThumbs={false}
                    emulateTouch={true}
                >
                    <div onClick={() => localStorage.setItem('cover', '/bopbot_happy.svg')}>
                        <img width="207.69px" height="215.38px" src={'/bopbot_happy.svg'} />
                    </div>
                    <div onClick={() => localStorage.setItem('cover', '/bopbot_embarassed.svg')}>
                        <img width="207.69px" height="215.38px" src={'/bopbot_embarassed.svg'} />
                    </div>
                    <div onClick={() => localStorage.setItem('cover', '/bopbot_mad.svg')}>
                        <img width="207.69px" height="215.38px" src={'/bopbot_mad.svg'} />
                    </div>
                    <div onClick={() => localStorage.setItem('cover', '/bopbot_neutral.svg')}>
                        <img width="207.69px" height="215.38px" src={'/bopbot_neutral.svg'} />
                    </div>
                    <div onClick={() => localStorage.setItem('cover', '/bopbot_sleepy.svg')}>
                        <img width="207.69px" height="215.38px" src={'/bopbot_sleepy.svg'} />
                    </div>


                </Carousel>
                <BotInput onChange={handleChange} type="text" placeholder="edit title here"  ></BotInput>
            </MidCont>
            <ButtonCont>

                <MyButton
                    onClick={onDeleteClick}
                    text="Delete"
                    width="20%"
                // style={{ position: 'relative', left: '70%' }}
                />
                <MyButton
                    onClick={onSaveClick}
                    text="Save"
                    width="20%"
                // style={{ position: 'relative', left: '70%' }}
                />
            </ButtonCont>




        </Cont>
    );
}

export default EditPlaylist;