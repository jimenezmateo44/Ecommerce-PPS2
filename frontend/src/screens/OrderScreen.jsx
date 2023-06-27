import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from './Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'; 


const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    efetch,
    isLoading,
    error
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' />
  ) : (
    <>
      <h1>Orden nro {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Envio</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Direccion: </strong> {order.shippingAddress.address}, 
                                             {order.shippingAddress.city}{' '}
                                             {order.shippingAddress.postalCode}, 
                                             {order.shippingAddress.country}
              </p>

              { order.isDelivered ? (
                <Message variant='success'>
                  Enviado en {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Producto no enviado</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metodo de pago</h2>
              <p>
                <strong>Metodo: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Pagado en {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Sin pagar </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Productos</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${ item.qty * item.price}
                      </Col>
                  </Row>
                </ListGroup.Item>
              )) }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Resumen de orden</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Productos</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Envio</Col>
                      <Col>Envio gratis</Col>
                    </Row>

                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )

  
};

export default OrderScreen