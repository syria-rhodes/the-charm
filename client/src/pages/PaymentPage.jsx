import styled from 'styled-components'
import Payment from '../components/Payment'
import Navbar from '../components/Navbar'
import Receipt from '../components/Receipt'


const PageWrapper = styled.html`
    background: #252525;
`

const Main = styled.div`
    max-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    flex-wrap: wrap;
    background: white;
    min-height: calc(100vh - 5.5em);
`

const PaymentPage = () => {
    return (
        <PageWrapper>
            <Navbar/>
            <Main>
            <Receipt/>
            <Payment/>
            </Main>
        </PageWrapper>
    )
}

export default PaymentPage
