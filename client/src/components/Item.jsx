import styled from "styled-components"
import { AddRounded } from '@mui/icons-material'
import { Link } from "react-router-dom"


const Image = styled.img`
    width: clamp(6.5em, 25vw, 12.5em);
    border-radius: .5em;
`

const Title = styled.p`
    font-size: clamp(0.75em, 2.5vw, 1.125em);
    text-align: center;
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: clamp(6.5em, 25vw, 12.5em);
    border-radius: .5em;
    background: #0d0d0d68;
    display: none;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-direction: column;
    font-weight: 400;
    gap: 1em;
`

const CakeContainer = styled.div`
    width: clamp(6.5em, 25vw, 12.5em);
    height: clamp(8.25em, 28.5vw, 14.625em);
    cursor: pointer;
    position: relative;
    border-radius: .5em .5em 0 0;

    &:hover ${Image}{
        opacity: 0.5;
    }

    &:hover ${Title}{
        font-weight: bold;
    }

    &:hover ${Info}{
        display: flex;
    }
`



const Item = ({item}) => {
    return (
        <CakeContainer>
            <Image src={item.img}/>
            <Info>
                <h2>${item.price}</h2>
                <Link to={`/product/${item._id}`}>
                    <AddRounded className='cartHover' color='white'/>
                </Link>
            </Info>
            <Title>
                {item.title}
            </Title>
        </CakeContainer>
    )
}

export default Item
