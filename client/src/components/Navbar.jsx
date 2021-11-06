import { Badge } from '@mui/material';
import styled from 'styled-components'
import logo from '../img/logo.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'



const Container = styled.div`
    height: 5.5rem;
    display: flex;
    align-items: center;
    flex-basis: 100%;
    padding: 1rem;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background: white;
`

const Left = styled.div`
    text-align: left;
    flex: 1;

`

const Center = styled.div`
    text-align: center;
    flex: 2;
`

const Right = styled.div`
    text-align: right;
    flex: 1;
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.cartQuantity)
    return (
        <Container>
            <Left>
                <Link to='/'>
                <img style={{maxHeight: '4.5rem'}} src={logo} alt='logo'/>
                </Link>
            </Left>
            <Center>
                <h1 style={{color: '#7C05F2', fontSize: 'clamp(1em, 6vw, 3em)'}}>Terri Does Desserts</h1>
            </Center>
            <Right>
            <Badge badgeContent={quantity} color='secondaryLight'>
                    <Link to='/cart'>
                        <ShoppingCart color='secondary' className='cartHover'/>
                    </Link>
                </Badge>
            </Right>
        </Container>
    )
}

export default Navbar
