import { Row, Col } from 'react-bootstrap';
import Producto from '../components/Producto';
import React from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: productos, isLoading, error } = useGetProductsQuery();

  return (
<>
  { isLoading ? (
    <Loader />
  ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>
  ) : (
  
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
  )}

</>
 )  
}

export default HomeScreen