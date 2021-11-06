import styled from "styled-components"
import Terri from '../img/terri.jpeg'

const Image = styled.img`
    height: 50%;
    width: 100vw;
    max-width: 1000px;
    display: block;
    object-position: center top;
`


const Hero = () => {
    return (
        <Image src={Terri} />
    )
}

export default Hero
