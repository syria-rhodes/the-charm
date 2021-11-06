import { AddRounded, RemoveRounded } from '@mui/icons-material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { increaseID } from '../redux/itemIdRedux'
import axios from 'axios'

const Wrapper = styled.div`
    max-width: 1000px;
    background: white;
    margin: 0 auto;
    display: flex;
    min-height: calc(100vh - 11em);
    justify-content: space-between;
    flex-basis: 100%;
    flex-wrap: wrap;
`
const ImageContainer = styled.div`
    flex: 1;
    padding: 1em 4em;
    justify-self: center;
    display: flex;
    justify-content: center;
`
const Image = styled.img`
    height: clamp(15em, 40vw, 25em);
    margin: 0 auto;
    border-radius: 2rem;
`
const InfoContainer = styled.div`
    min-width: 350px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h2`
    font-size: clamp(2em, 7vw, 2.5em);
    margin-bottom: 1rem;
    text-align: center;
    padding-left: 1rem;
`
const Description = styled.h2`
    font-size: 1.5em;
    margin-bottom: 1rem;
`
const Price = styled.p`
    font-size: 3em;  
    font-weight: 300;  
    margin-bottom: 1rem;
`

const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
`

const Number = styled.h2`
    font-size: 2em;
    font-weight: 300;
    margin: 0 1em;
    border: 1px solid brown;
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
`

const Button = styled.button`
    border: none;
    background: #7c0f3c;
    padding: 1rem 2rem;
    color: white;
    font-size: 1.5em;
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

const Selections = styled.div`
    display: grid;
    justify-content: center;
    width: 100%;
    align-items: center;
`

const SelectTitle = styled.label`
    text-align: center;
`

const Select = styled.select`
    padding: .75em;
    cursor: pointer;
    margin-bottom: 1rem;
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [display, setDisplay] = useState('none');
    const [icingDisplay, setIcingDisplay] = useState('none');
    const [flavor, setFlavor] = useState('');
    const [icing, setIcing] = useState('');
    const [quantity, setQuantity] = useState(id === '61859a886c934dfa2e3aa9c5' ? 6 : 1);
    const itemId = useSelector(state => state.itemID);

    const dispatch = useDispatch();
    
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axiosInstance.get(`/products/find/${id}`);
                setProduct(res.data);
                if (res.data.flavors.length > 0) {
                    setDisplay('grid')
                } else {
                    setDisplay('none')
                }
                if (res.data.icing.length > 0) {
                    setIcingDisplay('block')
                } else {
                    setIcingDisplay('none')
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProduct();
    })

    const handleQuantity = (type) => {
        if (type === 'dec') {
            if (id === '61859a886c934dfa2e3aa9c5') {
                quantity > 6 && setQuantity(quantity - 1);
            } else {
            quantity > 1 && setQuantity(quantity - 1);
            }
        } else {
            setQuantity(quantity + 1)
        }
    };

    const handleClick = () => {
        if(product.flavors.length) {
            if (flavor) {
            dispatch(addProduct({product: {description: product.title+' ('+flavor+' '+icing+')', quantity, amount: product.price*100, id: itemId}, quantity, price: product.price*quantity}));
            } else {
                alert('Please choose a flavor')
            }
        } else{
            dispatch(addProduct({product: {description: product.title, quantity, amount: product.price*100, id: itemId}, quantity, price: product.price*quantity}));
        }
        dispatch(increaseID());
    }
    
    return (
        <Wrapper>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Description>{product.desc}</Description>
                <Selections style={{display: display}}> 
                    <SelectTitle for='flavor'>Flavor</SelectTitle>
                    <Select name='flavor' onChange={(e) => setFlavor(e.target.value)}>
                        <option selected disabled>Choose Flavor</option>
                        {product.flavors?.map((flavor) => (
                            <option value={flavor} key={flavor}>{flavor}</option>
                            ))
                        }
                </Select>
                <SelectTitle style={{display: icingDisplay}} for='icing'>Icing</SelectTitle>
                <Select style={{display: icingDisplay}} name='icing' onChange={(e) => setIcing(e.target.value)}>
                <option selected disabled>Choose Icing</option>
                {product.icing?.map((flavor) => (
                    <option value={flavor} key={flavor}>{flavor}</option>
                    ))
                }
                </Select>
                </Selections>
                <Price>
                    ${product.price}
                </Price>
                <Quantity>
                    <RemoveRounded onClick={() => handleQuantity('dec')} className='pointer' style={{fontSize: "3em"}}/>
                        <Number>
                            {quantity}
                        </Number>
                    <AddRounded onClick={() => handleQuantity('inc')} className='pointer' style={{fontSize: "3em"}}/>
                </Quantity>
                <Button onClick={handleClick}>
                    Add to Cart
                </Button>
            </InfoContainer>
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>
        </Wrapper>
    )
}

export default Product
 