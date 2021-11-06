import { ClearRounded } from '@mui/icons-material'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { delProduct } from '../redux/cartRedux'
import { Link } from 'react-router-dom'


const Container = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    background: white;
    min-height: calc(100vh - 5.5em);
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
`

const Button = styled.button`
    position: absolute;
    top: 0;
    left: 1.5em;
    border: none;
    background: #592d03;
    padding: .5em 1em;
    color: white;
    font-size: clamp(.75em, 3vw, 1em);
    border-radius: 1rem;
    cursor: pointer;

    &:hover {
        opacity: .5;
    }

    &:active {
        opacity: 1;
        border: 1px solid #0D0D0D;
    }
`

const CartHeaders = styled.div`
    display: grid;
    max-width: 1000px;
    width: 50%;
    min-width: 350px;
    grid-auto-flow: column;
    grid-template-columns: 10% 1fr 15% 10% 10%;
    margin-bottom: 1em;
`

const Headers = styled.h3`
    font-size: clamp(.75em, 3vw, 1.5em);
`

const CartItem = styled.div`
    display: grid;
    max-width: 1000px;
    width: 50%;
    min-width: 350px;
    grid-auto-flow: column;
    grid-template-columns: 10% 1fr 15% 10% 10%;
    border-bottom: 1px solid #0D0D0D;
    padding-top: .5em;
`

const Title = styled.p``

const Price = styled.p``

const Quantity = styled.p``

const Subtotal = styled.p``

const CheckoutInfo = styled.div`
    margin: 2em 0 0;
`
    
const Total = styled.h2`
    margin: 0 auto;
    text-align: center;
`

const Checkout = styled.button`
    border: none;
    background: #7c0f3c;
    padding: 1rem 2rem;
    color: white;
    font-size: 1em;
    border-radius: 1rem;
    cursor: pointer;
    margin: 1em 0;

    &:hover {
        opacity: .5;
    }

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`

const Cart = () => {
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const handleDelete = (id) => {
        const index = cart.items.findIndex((obj => obj.id === id));
        const price = cart.items[index].amount*cart.items[index].quantity/100;
        dispatch(delProduct({index, price}));
    }

    return (
        <Container>
            <h2 style={{marginBottom: '2em', marginTop: '2em'}}>Step 1: Review Your Cart</h2>
            <Link to='/products/cake'>
            <Button>
                Continue Shopping
            </Button>
            </Link>
            <CartHeaders>
                <Headers>Del</Headers>
                <Headers>Item</Headers>
                <Headers>Price</Headers>
                <Headers>Qty.</Headers>
                <Headers>Subtotal</Headers>
            </CartHeaders>
            {cart.items.map(product => (
                <CartItem>
                    <div style={{width: '1em'}}>
                    <ClearRounded onClick={() => handleDelete(product.id)} className='pointer'/>
                    </div>
                <Title>{product.description}</Title>
                <Price>${product.amount/100}</Price>
                <Quantity>{product.quantity}</Quantity>
                <Subtotal>${product.amount*product.quantity/100}</Subtotal>
            </CartItem>
                    ))}
            <CheckoutInfo>
                <Total>Total: ${cart.total}</Total>
                <Link to='/customer'>
                <Checkout disabled={cart.total === 0 ? true : false}>Checkout</Checkout>
                </Link>
            </CheckoutInfo>
        </Container>
    )
}

export default Cart
