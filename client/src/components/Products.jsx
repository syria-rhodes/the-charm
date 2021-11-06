import { useEffect, useState } from 'react';
import Item from './Item'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em;
    justify-content: center;
    flex-basis: 100%;
    padding-bottom: 2em;
`

const Products = ({cat}) => {
    const [products, setProducts] = useState([]);
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axiosInstance.get(`/products?category=${cat}`);
                setProducts(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getProducts();
    })

    return (
        <Container>
            {products.map(item => (
                <Item item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Products
