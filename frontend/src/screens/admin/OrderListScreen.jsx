import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
  <>
    <h1>Ordenes</h1>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
      ) : (
      <Table striped hover responsive 
        className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { orders.map((orden) => (
              <tr key={orden._id}>
                <td>{orden._id}</td>
                <td>{orden.user && orden.user.name}</td>
                <td>{`$${orden.totalPrice}`}</td>
                <td>
                  <LinkContainer to={`/order/${orden._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Detalles
                      </Button>
                  </LinkContainer>
                </td>
              </tr>
            )) }
          </tbody>

      </Table>
    )}
  </>
);
};

export default OrderListScreen
