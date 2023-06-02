import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Producto from '../components/Producto';
import React from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [productos, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/productos');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
<>
<h1 className='text-center mt-5'>Ultimos lanzamientos</h1>
   <Row>
     {productos.map((productos) => (
        <Col key={productos._id} sm={12} md={6} lg={4} xl={3}>
          <Producto productos = {productos} />
        </Col>
     )) }
   </Row>
</>
 )  
}

export default HomeScreen