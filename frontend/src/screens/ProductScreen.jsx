import React from 'react'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import '../assets/styles/index.css'

const ProductScreen = () => {
  const { id: productoId } = useParams();
  const { data: productos, isLoading, error } = useGetProductsDetailsQuery(productoId);

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
                  
                <ListGroup.Item className='d-flex justify-content-center mt-3'>
                    <Button className="btn-addCarrito btn-secondary "
                            type='button'
                            disabled={productos.countInStock ===0}
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