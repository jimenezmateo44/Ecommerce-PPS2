import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../screens/Loader';
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]); 

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
             const errorMessage = error.data ? error.data.message : 'An error occurred';
        toast.error(errorMessage);
        }
    };

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Envio</h2>
                        <p>
                            <strong>Direccion: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Metodo de pago</h2>
                        <strong>Metodo: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Productos</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Tu carrito esta vacio</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/productos/${item.productos}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty } x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Resumen de orden</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Productos:</Col>
                                <Col>
                                   ${cart.itemsPrice * 10} 
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Envio:</Col>
                                <Col>
                                   $0
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>
                                   ${cart.totalPrice * 10} 
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            { error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems.length === 0}
                                onClick= {placeOrderHandler}
                                >
                                    Generar Orden
                            </Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    
    </>
  )
}

export default PlaceOrderScreen;