import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useAvatar, useEmail, useId, useName, useTheme, useToken } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import { useRouter } from 'next/router'
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
    border:1.5px solid ${props=>props.border};
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
    switchView = () => {},
}) {

    const router = useRouter();

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
        console.log(userEmail)
    }

    function HandlePassword(value) {
        setUserPassword(value)
        console.log(userPassword)
    }



    function Login() {
        const getUser = {
            email: userEmail,
            password: userPassword
        }
        axios.post('https://bopbot-backend.herokuapp.com/login', getUser)
            .then((res) => {
                if (res) {
                    console.log(res.data.name)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('id', res.data._id)
                    // localStorage.setItem('token', res.data.token)
                    setName(res.data.name)
                    setId(res.data._id)
                    setEmail(res.data.email)
                    setAvatar(res.data.avatar)
                    // setToken(res.data.token)

                    router.push('/')

                } 
            })
            .catch(e => {
                console.log(e)
                setBorder(false)
                setInputError(true)
            })

    }

    

    return (
        <InputCont>
            <h1>Login to your account</h1>
            <p>Welcome back!</p>
            <p>{inputError ? 'Credentials incorrect or not found. Please, try again.' : ''}</p>
            <LoginInput border={border ? '#8B64FA' : 'red'} name='email' placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} onSelect={()=>setBorder(true)}/>
            <LoginInput border={border ? '#8B64FA' : 'red'} name='password' placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} onSelect={()=>setBorder(true)} />
            <ButtonCont>
                <MyButton onClick={Login} text='Login' />
                <p>Don't have an account?</p>
                <p style={{ textDecoration: 'underline' }} onClick={switchView}>Create Account</p>
            </ButtonCont>
        </InputCont>
    );
}