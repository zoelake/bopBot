import styled from 'styled-components'
import LoginAccount from "../comps/LoginAccount";

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function CreateAccount() {

    return (
        <Page>
            <LoginAccount />
            {/* banner */}
        </Page>
    )
}