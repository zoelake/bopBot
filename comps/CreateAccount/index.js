import { themes } from "../../utils/variables";
import { useEmail, useId, useName, useTheme, useTitle, useHeader, usePar } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import MyText from '../Text';
import { useRouter } from 'next/router';
import axios from 'axios';
import { InputCont, ButtonCont, LoginInput } from './style'

export default function CreateNewAccount({
    switchView = () => { },
}) {

    const router = useRouter();
    const host = process.env.SERVERSIDE;
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


    function CreateAccount() {
        const newUser = {
            name: usersName,
            email: userEmail,
            password: userPassword
        }
        axios.post(`${host}/signup`, newUser)
            .then(res => {
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
                alert(e)
                setBorder(false)
                setInputError(true)
            })
    }


    return (
        <InputCont color={themes[theme].contrast}>
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
            {inputError && <MyText
                lineHeight='0'
                text='Credentials incorrect or not found. Please, try again.'
                size={`${parSize}px`}
                color={themes[theme].contrast}
            />}
            <LoginInput border={'#8B64FA'} placeholder='Name...' onChange={(e) => setUsersName(e.target.value)} />
            <LoginInput border={border ? '#8B64FA' : 'red'} placeholder='Email...' onChange={(e) => setUserEmail(e.target.value)} onSelect={() => setBorder(true)} />
            <LoginInput type='password' border={'#8B64FA'} placeholder='Password...' onChange={(e) => setUserPassword(e.target.value)} />
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
