import CreateNewAccount from "../comps/CreateAccount"
import styled from 'styled-components'

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
            <CreateNewAccount />
        </Page>
    )
}