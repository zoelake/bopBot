import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useAvatar, useEmail, useId, useName, useTheme, useToken, useHeader, usePar, useTitle } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import { useRouter } from 'next/router'
import axios from 'axios';
import MyText from '../Text';

const InputCont = styled.div`
    width:80%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    padding:10px;
    border-radius: 5px;
    background-color: #fff;
`;

const LoginInput = styled.input`
    border-radius: 5px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:1.5px solid ${props => props.border};
    margin:5px;
    padding:0 10px;
    width:90%;
`;

const ButtonCont = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    text-align:center;
`;


export default function LoginAccount({
    switchView = () => { },
}) {

    const router = useRouter();

    const { theme } = useTheme();
    const { titleSize } = useTitle();
    const { headerSize } = useHeader();
    const { parSize } = usePar();

    //local storage info
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);

    //provider info
    const { name, setName } = useName();
    const { email, setEmail } = useEmail();
    const { id, setId } = useId();
    const { avatar, setAvatar } = useAvatar();
    const { token, setToken } = useToken();

    //ui states 
    const [border, setBorder] = useState(true);
    const [inputError, setInputError] = useState(false);

    function HandleEmail(value) {
        setUserEmail(value)
        // console.log(userEmail)
    }

    function HandlePassword(value) {
        setUserPassword(value)
        // console.log(userPassword)
    }



    function Login() {
        const getUser = {
            email: userEmail,
            password: userPassword
        }
        axios.post('https://bopbot-backend.herokuapp.com/login', getUser)
            .then((res) => {
                if (res) {

                    // console.log('res.data.name')
                    // console.log(res.data.name)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('id', res.data._id)
                    setName(res.data.name)
                    setId(res.data._id)
                    setEmail(res.data.email)

                    router.push('/')

                }
            })
            .catch(e => {
                // console.log(e)
                setBorder(false)
                setInputError(true)
            })

    }



    return (
        <InputCont>
            <img src='/bopbot_neutral.svg' style={{ width: '100px' }} />
            <MyText
                lineHeight='0'
                text='Login to your account'
                size={`${titleSize}px`}
                color={themes[theme].contrast}
            />
            <MyText
                lineHeight='0'
                text='Welcome back!'
                size={`${headerSize}px`}
                color={themes[theme].contrast}
            />
            {inputError ? <MyText
                lineHeight='0'
                text='Credentials incorrect or not found. Please, try again.'
                size={`${parSize}px`}
                color={themes[theme].contrast}
            /> : <></>}
            <LoginInput border={border ? '#8B64FA' : 'red'} name='email' placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} onSelect={() => setBorder(true)} />
            <LoginInput type='password' border={border ? '#8B64FA' : 'red'} name='password' placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} onSelect={() => setBorder(true)} />
            <ButtonCont>
                <MyButton onClick={Login} text='Login' />
                <MyText
                    lineHeight='0'
                    text="Don't have an account?"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                />
                <MyText
                    lineHeight='0'
                    text="Create Account"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                    style={{ textDecoration: 'underline' }}
                    onClick={switchView}
                />
            </ButtonCont>
        </InputCont>
    );
}