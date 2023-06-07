import { useState } from 'react';
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import '../assets/styles/index.css'
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productoId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: productos,
          isLoading,
          error, } = useGetProductsDetailsQuery(productoId);

  
  const addToCartHandler = () => {
      dispatch(addToCart({...productos, qty }));
      navigate('/cart');
  }
        

  return (
<>
  <Link className='btn btn-light my-3' to='/'>
    Volver
  </Link>
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
        <Row>
        <Col md={5}>
          <Image src={productos.image} alt={productos.name} fluid />
        </Col>
        
        <Col md={4}>
            <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{productos.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={productos.rating} text={`${productos.numReviews} reviews`}/>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p>Descripcion:</p>
                    {productos.description}
                  </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={3}>
            <Card className="p-3">
                <ListGroup variant='flush'>
                    <Row>
                        <Col className='pb-3'>
                          Precio:
                        </Col>

                        <Col>
                          <strong>${productos.price}</strong>
                        </Col>
                    </Row>
                </ListGroup>

                <ListGroup variant='flush'>
                    <Row  className='pb-3 mt-3'>
                        <Col>
                          Disponibilidad:
                        </Col>

                        <Col>
                          <strong>{productos.countInStock > 0 ? 'En stock' : 'Sin Stock'}</strong>
                        </Col>
                    </Row>
                </ListGroup>

                {productos.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Cantidad</Col>
                      <Col>
                        <Form.Control as='select'
                                      value={qty}
                                      onChange={(e) => setQty(Number(e.target.value))}>
                          {[...Array(productos.countInStock).keys()].map((x) => (
                            <option key={ x + 1 } value={ x + 1 }>
                              { x + 1 }
                            </option>
                          ) )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                  
                <ListGroup.Item className='d-flex justify-content-center mt-3'>
                    <Button className="btn-addCarrito btn-secondary "
                            type='button'
                            disabled={productos.countInStock ===0}
                            onClick={addToCartHandler}
                    >
                      Agregar al carrito
                    </Button>
                </ListGroup.Item>

            </Card>
        </Col>

      </Row>
      )}
  </>
  
  );
};

export default ProductScreen