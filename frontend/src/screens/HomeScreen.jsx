import { Row, Col } from 'react-bootstrap'
import productos from '../productos'
import Producto from '../components/Producto'
import React from 'react'

const HomeScreen = () => {
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