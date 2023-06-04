import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import '../assets/styles/index.css'
import axios from 'axios';

const ProductScreen = () => {
  const [product, setProduct] = useState({});

    const { id: productId } = useParams(); 
    
    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await axios.get(`/api/productos/${productId}`);
        setProduct(data);
      }
      
      fetchProduct();
    }, [productId]);
  return <>
      <Link className='btn btn-light my-3' to='/'>
        Volver
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        
        <Col md={4}>
            <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p>Descripcion:</p>
                    {product.description}
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
                          <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup>

                <ListGroup variant='flush'>
                    <Row  className='pb-3 mt-3'>
                        <Col>
                          Disponibilidad:
                        </Col>

                        <Col>
                          <strong>{product.countInStock > 0 ? 'En stock' : 'Sin Stock'}</strong>
                        </Col>
                    </Row>
                </ListGroup>
                  
                <ListGroup.Item className='d-flex justify-content-center mt-3'>
                    <Button className="btn-addCarrito btn-secondary "
                            type='button'
                            disabled={product.countInStock ===0}
                    >
                      Agregar al carrito
                    </Button>
                </ListGroup.Item>

            </Card>
        </Col>

      </Row>
    </>
}

export default ProductScreen