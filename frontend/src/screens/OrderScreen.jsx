import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from './Loader';
import { useGetOrderDetailsQuery, useDeliverOrderMutation, usePayOrderMutation} from '../slices/ordersApiSlice'; 
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Orden enviada');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  
  const setPaidHandler = async () => {
    try {
      // Llama a la mutación para marcar la orden como pagada
      const response = await payOrder({ orderId });
        refetch();
      if (response.data && response.data.payOrder) {
        refetch(); // Vuelve a cargar los datos de la orden
        toast.success('Orden pagada');
      } 
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
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
                      <Col>${order.itemsPrice * 10}</Col>
                    </Row>

                    <Row>
                      <Col>Envio</Col>
                      <Col>Envio gratis</Col>
                    </Row>

                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice * 10}</Col>
                    </Row>
                  </ListGroup.Item>

                  { loadingPay && <Loader /> }
                  { userInfo && userInfo.isAdmin && !order.isPaid &&(
                     <ListGroup.Item>
                     <Button type='button' className='btn btn-block' onClick={setPaidHandler}>
                       Marcar como pago
                     </Button>
                   </ListGroup.Item>
                  )}

                  { loadingDeliver && <Loader /> }
                  { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                        Marcar como enviado
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
          </Card>

          <ListGroup>
            <p className='mt-4 p-2 fs-5'>Enviar comprobante de pago a dosgauchitos@gmail.com o al celular +542932578382
               dentro de las 48 horas de realizada la orden</p>
          </ListGroup>
        </Col>
      </Row>
    </>
  )

  
};

export default OrderScreen
