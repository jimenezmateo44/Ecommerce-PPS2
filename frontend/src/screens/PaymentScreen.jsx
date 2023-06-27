import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('MercadoPago');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
        navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Metodo de pago</h1>
        <Form onSubmit= { submitHandler }>
            <Form.Group>
                <Form.Label as='legend'>Selecciona metodo de pago</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        label= 'Mercado Pago o tarjeta de credito'
                        id='MercadoPago'
                        name='paymentMethod'
                        value='Mercado Pago'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                     <Form.Check
                        type='radio'
                        className='my-2'
                        label= 'Deposito o transferencia bancaria'
                        id='Transferencia bancaria'
                        name='paymentMethod'
                        value='Transferencia bancaria'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continuar
            </Button>
        </Form>
    
    </FormContainer>
  )
}

export default PaymentScreen