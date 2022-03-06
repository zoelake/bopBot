import Login from "../comps/Login"
import styled from 'styled-components'

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function LoginPage() {

    return (
        <Page>
            <Login />
        </Page>
    )
}