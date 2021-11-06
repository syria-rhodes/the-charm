import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import Hero from '../components/Hero'

const Wrapper = styled.div`
    max-width: 1000px;
    background: white;
    margin: 0 auto;
    min-height: 100vh;
`


const HomePage = () => {
    return (
        <Wrapper>
            <Navbar/>
            <Categories/>
            <Hero/>
        </Wrapper>
    )
}

export default HomePage
