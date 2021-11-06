import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import Product from "../components/Product"
import styled from 'styled-components'


const Container = styled.div`
    height: 100%;
    width: 100%;
    background: #252525;
`
const ProductPage = () => {

    return (
        <Container>
            <Navbar/>
            <Categories/>
            <Product/>
        </Container>
    )
}

export default ProductPage
