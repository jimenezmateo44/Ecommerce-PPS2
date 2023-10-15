import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import '../assets/styles/carrito_style.css'

//Este componente nos muestra detalles de carrito

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (item, qty) => {
        dispatch(addToCart({...item, qty}));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

     const keepShoppingHandler = () => {
        navigate('/');
    }

  return (
    <Row> {/*Si el carrito esta vacio*/}
        <Col md={8}>
            <h1 style={{marginBottom: '20px', marginTop: '20px'}}>Carrito de compras</h1>
            { cartItems.length === 0 ? (
                <Message>
                    Carrito vacio <Link to='/'>Volver</Link>
                </Message> /*Si el carrito esta vacio*/
            ) : ( /*Si el carrito tiene elementos:*/
                <ListGroup variant='flush'>
                    { cartItems.map((item) => (
                        <ListGroup.Item key= {item._id}>
                            <Row>
                                <Col md={2}> {/*Mostramos la imagen*/}
                                    <Image src={item.image} alt={item.name} fluid rounded className='imagenCarrito' />
                                </Col>
                                <Col md={3}> {/*Mostramos el nombre del producto*/}
                                    <Link to={`/productos/${item._id}`} className="link-productos nombreProductos">{item.name}</Link>
                                </Col>
                                <Col md={2}> {/*Mostramos el precio*/}
                                    ${item.price}
                                </Col>
                                <Col md={2}> {/*Mostramos la cantidad*/}
                                    <Form.Control as='select'
                                      value={item.qty}
                                      onChange={(e) => addToCartHandler(item, Number(e.target.value)) }>
                                         {[...Array(item.countInStock).keys()].map((x) => (
                                     <option key={ x + 1 } value={ x + 1 }>
                                        { x + 1 }
                                    </option>
                                    ) )}
                                     </Form.Control>
                                </Col>
                                <Col md={2}> {/*Mostramos icono para eliminar del carrito*/}
                                    <Button type='button' variant='light' onClick={ () =>
                                    removeFromCartHandler(item._id) }>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                <ListGroup.Item className='m-3 d-flex justify-content-end'>
                        <Button type='button' 
                                className='btn-block btnCarrito' 
                                onClick={ keepShoppingHandler }
                        >
                            Seguir comprando
                        </Button>
                    </ListGroup.Item>
                </ListGroup> /*Si el carrito tiene elementos:*/
            )}
        </Col>
        <Col md={4}> {/*En este col vamos a mostrar el total y boton de pago*/}
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='m-1'>
                        <h2>
                            Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0)} productos)
                        </h2>
                        ${ cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex justify-content-center m-1'>
                        <Button type='button' 
                                className='btn-block btnCarrito' 
                                disabled={ cartItems.length === 0 }
                                onClick={ checkoutHandler }
                        >

                            Continuar al pago
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen;