import { Link } from 'react-router-dom'
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

const Button = styled.button`
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
`

const Failed = () => {

    return (
        <PageWrapper>
            <Navbar/>
            <Main>
                <h2>Order Not Received</h2>
                <h2>Please Try Again</h2>
                <Link to='/cart'>
                    <Button>Back to Cart</Button>
                </Link>
            </Main>
        </PageWrapper>
    )
}

export default Failed
