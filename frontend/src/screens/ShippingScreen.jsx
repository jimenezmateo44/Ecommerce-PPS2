import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';


const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { ShippingAddress } = cart;

    const [address, setAddress] = useState(ShippingAddress?.address || '');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState(ShippingAddress?.postalCode || '');
    const [country, setCountry] = useState(ShippingAddress?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country}));
        navigate('/payment');
    }

  return (
    <FormContainer>
      <h1>Envios</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
            <Form.Label>Domicilio</Form.Label>
            <Form.Control
                type='text'
                placeholder='Ingresa tu domicilio'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-2'>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
                type='text'
                placeholder='Ingresa tu ciudad'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-2'>
            <Form.Label>Codigo Postal</Form.Label>
            <Form.Control
                type='text'
                placeholder='Ingresa tu Codigo Postal'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='my-2'>
            <Form.Label>Pais</Form.Label>
            <Form.Control
                type='text'
                placeholder='Ingresa tu pais'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
            Continuar
        </Button>



      </Form>
    
    </FormContainer>
  )
}

export default ShippingScreen;