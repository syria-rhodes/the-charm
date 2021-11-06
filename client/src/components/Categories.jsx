import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    height: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    background: white;
    max-width: 1000px;
    margin: 0 auto;
`

const Category = styled.h1`
    color: #0D0D0D;
    cursor: pointer;
    font-size: clamp(.875em, 4vw, 2.5em);
    font-weight: 300;

    &:hover {
        font-weight: bold;
    }
`

const Categories = () => {
    return (
        <Container>
                <Link to='/products/cake'>
            <Category>
                Cakes
            </Category>
                </Link>
                <Link to='/products/cobbler'>
            <Category>
                Cobblers, Pies, & Rolls
            </Category>
                </Link>
                <Link to='/products/cookie'>
            <Category>
                Cookies
            </Category>
                </Link>
                <Link to='/products/cupcake'>
            <Category>
                Cupcakes
            </Category>
                </Link>
        </Container>
    )
}

export default Categories
