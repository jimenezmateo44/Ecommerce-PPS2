import React from 'react'
import { useParams } from 'react-router-dom';
import productos from '../productos';

const ProductScreen = () => {
    const { id: productoId } = useParams();
    const producto = productos.find((p) => p._id === productoId);
    console.log(producto);
  return (
    <div>ProductScreen</div>
  )
}

export default ProductScreen