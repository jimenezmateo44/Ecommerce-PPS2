import React from 'react';
import '../assets/styles/producto_style.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Producto = ({productos}) => {
  return (
    <Card className="my-3 tarjeta-fija">
        <Link to={`/productos/${productos._id}`}>
            <Card.Img src={productos.image} variant="top" className='imagenFija'/>
        </Link>
        <Card.Body>
            <Link to={`/productos/${productos._id}`} className="link-productos">
                <Card.Title as="div" className="titulo-producto">
                    <strong className="nombreProductos">{productos.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3" className='h3_precio d-flex justify-content-center'>
                ${productos.price}
            </Card.Text>
            <Card.Text as="h4" className='cuotas d-flex justify-content-center'>
                3 cuotas sin interes de ${Math.floor(productos.price/3)}
            </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Producto;
