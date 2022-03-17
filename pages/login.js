import { useState } from 'react';
import styled from 'styled-components'
import CreateNewAccount from '../comps/CreateAccount';
import LoginAccount from "../comps/LoginAccount";

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function CreateAccount() {

    const [view, setView] = useState('login')

    if (view == 'login') {
        return <Page>
            <LoginAccount switchView={() => setView('create-account')} />
        </Page>
    }
    return (
        <Page>
            <CreateNewAccount switchView={() => setView('login')} />
        </Page>
    )
}