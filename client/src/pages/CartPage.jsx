import styled from 'styled-components'
import Cart from '../components/Cart'
import Navbar from '../components/Navbar'

const PageWrapper = styled.html`
    background: #252525;
`



const CartPage = () => {
    return (
        <PageWrapper>
            <Navbar/>
            <Cart/>
        </PageWrapper>
    )
}

export default CartPage
