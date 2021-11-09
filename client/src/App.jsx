import './index.css';
import Home from './pages/HomePage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import PaymentPage from './pages/PaymentPage';
import Success from './pages/SuccessPage';
import Failed from './pages/FailedPage';

const theme = createTheme({
  palette: {
    primary: {
      light: '#b54cff',
      main: '#7c05f2',
      dark: '#3d00be',
      contrastText: '#fff',
    },
    white: {main: '#fff'},
    secondary: {
      main: '#592d03',
      dark: '#320400',
      contrastText: '#fff',
    },
    secondaryLight: {
      main: '#8a552d7f',
    },
  },
}); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/products/:category' element={<CategoryPage/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/customer' element={<CustomerPage/>}/>
          <Route path='/payment' element={<PaymentPage/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/failed' element={<Failed/>}/>
          <Route path='*' element={<Home/>}/>
      </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
