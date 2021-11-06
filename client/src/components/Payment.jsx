import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { clearCart } from '../redux/cartRedux';

const Container = styled.div`
    flex: 2;
    background: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3em;
    min-width: 320px;
`

const Form = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1em;
`

const Expiration = styled.div`
    display: flex;
    gap: 0 2em;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 1rem;

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`

const Button = styled.button`
    border: none;
    background: #7c0f3c;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
        opacity: .5;
    }
    &:disabled {
        opacity: .5;
        cursor: wait;
    }
`

const Payment = () => {
    const history = useNavigate();
    const [number, setNumber] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [cvv, setCvv] = useState('')
    const [buttonTitle, setButtonTitle] = useState('Pay')
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const info = useSelector(state => state.customer);
    const infoArray = [info.pickupDate, `${info.firstname} ${info.lastname}`, info.email, info.phone]
    
    const dispatch = useDispatch();
    const handlePayment = async () => {
        if (number && month && year && cvv) {
            setButtonDisabled(true)
            info.items.map(item => (
                infoArray.push(`(${item.quantity}) ${item.description}`)
                ))
            setButtonTitle('Processing...')
            try {
                const res = await axiosInstance.post('/clover/pay', 
                {
                    "card": {
                        "number": number,
                        "exp_month": month,
                        "exp_year": year,
                        "cvv": cvv
                    },
                    "email": info.email,
                    "items": info.items,
                    "phone": info.phone
                });
                await axiosInstance.post('/orders/add', 
                {
                    email: info.email,
                    firstname: info.firstname,
                    lastname: info.lastname,
                    phone: info.phone,
                    items: info.items,
                    orderId: res.data.id,
                    pickupDate: info.pickupDate
                });
                infoArray.unshift(res.data.status)
                await axiosInstance.post('/google/append',
                {
                    orderInfo: infoArray
                })
                history('/success');
                dispatch(clearCart())
                console.log(infoArray)
            } catch (err) {
                history('/failed')
                console.error(err);
            }
        } else {
            alert("Please fill out every field")
        }
    }


    return (
        <Container>
            <h2 style={{textAlign: 'center'}}>Step 3: Submit Payment</h2>
            <Form>
                <Label>Card Number:
                <Input type='number' required placeholder='Card Number' value={number} onChange={(e) => setNumber(e.target.value)}/>
                </Label>
                <Expiration>
                <Label>Exp Month:
                <Input required type='number' max='12' pattern='[0-9]{2}' placeholder='MM' value={month} onChange={(e) => setMonth(e.target.value)}/>
                </Label>
                <Label>Exp Year:
                <Input required type='number' max='99' pattern='[0-9]{2}' placeholder='YY' value={year} onChange={(e) => setYear(e.target.value)}/>
                </Label>
                <Label>CVV:
                <Input required type='password' placeholder='CVV' value={cvv} onChange={(e) => setCvv(e.target.value)}/>
                </Label>
                </Expiration>
                <Button disabled={buttonDisabled} onClick={handlePayment}>{buttonTitle}</Button>
            </Form>
        </Container>
    )
}

export default Payment
