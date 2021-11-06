import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    background: white;
    margin: 0 auto;
    min-width: 320px;
    height: 100%;
`

const ReceiptContainer = styled.div`
    padding: 1.5em;
    outline: #7c05f2 1px dotted;
    margin: 0 1em 1em;
`
const ReceiptItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: .5em 0;
`

const Receipt = () => {
    const cart = useSelector(state => state.cart);

    return (
        <Container>
            <ReceiptContainer>
                <h1 style={{textAlign: 'center'}}>Receipt</h1>
            {cart.items.map(item => (
                <ReceiptItem key={item.id}>
                 <p>({item.quantity}) {item.description}</p><p>${item.amount*item.quantity/100}</p>
            </ReceiptItem>))}
            <h2 style={{textAlign: 'center'}}>Total: ${cart.total}</h2>
                    </ReceiptContainer>
        </Container>
    )
}

export default Receipt
