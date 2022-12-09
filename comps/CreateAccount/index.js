import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useEmail, useId, useName, useTheme, useTitle, useHeader, usePar } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import MyText from '../Text';
import { useRouter } from 'next/router';

import axios from 'axios';

const InputCont = styled.div`
    width:80%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    padding:5px;
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
    text-align:center ;
`;


export default function CreateNewAccount({
    switchView = () => { },
}) {

    const router = useRouter();
    const { theme } = useTheme();
    const titleSize = useTitle();
    const headerSize = useHeader();
    const parSize = usePar();

    // local storage info
    const [usersName, setUsersName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);

    //provider info
    const { name, setName } = useName();
    const { email, setEmail } = useEmail();
    const { id, setId } = useId();

    //ui states
    const [border, setBorder] = useState(true);
    const [inputError, setInputError] = useState(false);

    function HandleName(value) {
        setUsersName(value)
        // console.log(usersName)
    }

    function HandleEmail(value) {
        setUserEmail(value)
        // console.log(userEmail)
    }

    function HandlePassword(value) {
        setUserPassword(value)
        // console.log(userPassword)
    }



    function CreateAccount() {
        const newUser = {
            name: usersName,
            email: userEmail,
            password: userPassword
        }

        axios.post('https://botbot-server.cyclic.app/signup', newUser)
            .then((res) => {
                if (res.status == 200) {
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('id', res.data._id)
                    setName(res.data.name)
                    setEmail(res.data.email)
                    setId(res.data._id)
                    router.push('/')
                }
            }).catch(e => {
                // console.log(e)
                setBorder(false)
                setInputError(true)
            })
    }


    return (
        <InputCont
            color={themes[theme].contrast}
        >
            <img src='/bopbot_neutral.svg' style={{ width: '100px' }} />

            <MyText
                lineHeight='0'
                text='Create an Account'
                size={`${titleSize}px`}
                color={themes[theme].contrast}
            />
            <MyText
                lineHeight='0'
                text='Create an account to get started!'
                size={`${headerSize}px`}
                color={themes[theme].contrast}
            />
            {inputError ? <MyText
                lineHeight='0'
                text='Credentials incorrect or not found. Please, try again.'
                size={`${parSize}px`}
                color={themes[theme].contrast}
            /> : <></>}
            <LoginInput border={'#8B64FA'} placeholder='Name...' onChange={(e) => HandleName(e.target.value)} />
            <LoginInput border={border ? '#8B64FA' : 'red'} placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} onSelect={() => setBorder(true)} />
            <LoginInput type='password' border={'#8B64FA'} placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} />
            <ButtonCont>
                <MyButton onClick={CreateAccount} text='Create Account' />
                <MyText
                    lineHeight='0'
                    text="Already have an account?"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                />
                <MyText
                    lineHeight='0'
                    text="Login"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                    style={{ textDecoration: 'underline' }}
                    onClick={switchView}
                />
            </ButtonCont>
        </InputCont>
    );
}
