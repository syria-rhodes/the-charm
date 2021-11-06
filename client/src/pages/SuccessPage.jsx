import styled from 'styled-components'
import Navbar from '../components/Navbar'


const PageWrapper = styled.html`
    background: #252525;
`

const Main = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: white;
    min-height: calc(100vh - 5.5em);
    gap: 1em;
`

const Success = () => {

    return (
        <PageWrapper>
            <Navbar/>
            <Main>
                <h1>Order Received</h1>
                <h1>Thank you for your order</h1>
            </Main>
        </PageWrapper>
    )
}

export default Success
