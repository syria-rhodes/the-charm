import axios from 'axios'
import { useEffect, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { addDays, setHours, setMinutes, getDay } from 'date-fns'
import { updateInfo } from '../redux/customerRedux'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    flex: 2;
    background: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3em;
    min-width: 320px;
`

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    flex-direction: column;
`

const Form = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1em;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    margin-bottom: 2rem;
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
`

const Customer = () => {
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();
    const history = useNavigate();
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
        const sheetData = () => {
            return axiosInstance.get('/google')
        .then(response => (setDates(response.data,
        )))
        .catch(err => console.log(err));  
        }
        sheetData();  
        // eslint-disable-next-line
    }, [])

    const cart = useSelector(state => state.cart);
    const cartItems = cart.items?.map(item => (
        {'description': item.description, 'amount': item.amount, "quantity": item.quantity}
    ))
    const holiday = dates?.map(date => new Date(date));

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
          {value || 'Select a Date'}
        </button>
    ));
    const TimeInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
          {value || 'Select a Time'}
        </button>
    ));
    
    
    const DateSelector = () => {

        const workingDays = (date) => {
            const day = getDay(date);
            return day !== 1 && day !== 0;
        };

        return (
            <>
            <div>
          <DatePicker  
          required
          withPortal 
          placeholderText='Choose a Pickup Date'
          selected={startDate} 
          onChange={(date) => setStartDate(date)}
          filterDate={workingDays} 
          minDate={addDays(new Date(), 3)}
          maxDate={addDays(new Date(), 24)}
          excludeDates={holiday}
          dateFormat="MM/dd/yyyy"
          customInput={<DateInput />}
          />
          </div>
          <div>
          <DatePicker
          includeTimes={[
              setHours(setMinutes(new Date(), 0), 10),
              setHours(setMinutes(new Date(), 30), 10),
              setHours(setMinutes(new Date(), 0), 11),
              setHours(setMinutes(new Date(), 30), 11),
              setHours(setMinutes(new Date(), 0), 12),
              setHours(setMinutes(new Date(), 30), 12),
              setHours(setMinutes(new Date(), 0), 13),
              setHours(setMinutes(new Date(), 30), 13),
              setHours(setMinutes(new Date(), 0), 14),
            ]}          
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            placeholderText='Choose a Pickup Time'
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            customInput={<TimeInput />}
            withPortal
            />
            </div>
            </>
          );        
      };
     


      
      const [firstname, setFirstName] = useState('')
      const [lastname, setLastName] = useState('')
      const [phone, setPhone] = useState('')
      const [email, setEmail] = useState('')
      
      const handleNext = (e) => {
          e.preventDefault();
          if (!firstname || !lastname || !email || !phone) {
              alert('Please fill in all required fields')
          } else if (!startDate) {
              alert('Please choose a pickup date')
          } else if (!startTime) {
                alert('please choose pickup time')
          } else {
                dispatch(updateInfo({firstname, lastname, email, phone, pickupDate: startDate.toLocaleDateString()+' '+startTime.toLocaleTimeString(), items: cartItems}))
                history('/payment')
          }
      
      }




    return (
        <Container>
            <h2 style={{textAlign: 'center'}}>Step 2: Choose a Pickup Date and Enter Information</h2>
            <DateContainer>
                <DateSelector/>
                <h3 style={{textAlign: 'center', margin: '1rem 0 0'}}>For orders outside of the available dates, please email Terri at terridoesdesserts@gmail.com</h3>
            </DateContainer>
            <Form>
                <Label for='firstname'>First Name:
                <Input required name='firstname' placeholder='First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
                </Label>
                <Label for='lastname'>Last Name:
                <Input required name='lastname' placeholder='Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                </Label>
                <Label for='phoneNumber'>Phone Number:
                <Input required name='phoneNumber' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </Label>
                <Label for='email'>Email:
                <Input required name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Label>
                <Button onClick={handleNext}>Next</Button>
            </Form>
        </Container>
    )
}

export default Customer
