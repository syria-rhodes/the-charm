import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import { useLocation } from 'react-router'
import Products from '../components/Products'

const Wrapper = styled.div`
    max-width: 1000px;
    background: white;
    margin: 0 auto;
    min-height: 100vh;
`

const Container = styled.div`
    color: #0D0D0D;
    padding: 1.5em;
`

const CategoryPage = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];

    return (
        <Wrapper>
            <Navbar/>
            <Categories/>
            <Container>
                <Products cat={cat}/>
            </Container>
        </Wrapper>
    )
}

export default CategoryPage
