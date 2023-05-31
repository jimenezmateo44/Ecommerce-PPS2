import React from 'react'
import { Card } from 'react-bootstrap'

const Producto = ({productos}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <a href={`/productos/${productos._id}`}>
            <Card.Img src={productos.image} variant="top"/>
        </a>
        <Card.Body>
            <a href={`/productos/${productos._id}`}>
                <Card.Title as="div">
                    <strong>{productos.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="h3">
                ${productos.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Producto