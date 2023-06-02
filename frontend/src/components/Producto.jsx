import React from 'react';
import '../assets/styles/producto_style.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Producto = ({productos}) => {
  return (
    <Card className="my-3 p-3">
        <Link to={`/productos/${productos._id}`}>
            <Card.Img src={productos.image} variant="top"/>
        </Link>
        <Card.Body>
            <Link to={`/productos/${productos._id}`}>
                <Card.Title as="div" className="titulo-producto">
                    <strong className="nombreProductos">{productos.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating value={productos.rating} text={`${productos.numReviews} reviews`}/>
            </Card.Text>

            <Card.Text as="h3" className='d-flex justify-content-center mt-4'>
                ${productos.price}
            </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Producto;