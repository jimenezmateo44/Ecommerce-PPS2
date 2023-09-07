import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../Loader';
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [ createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const deleteHandler = (id) => {
        console.log('delete', id)
     }

    const createProductHandler = async () => {
        if (window.confirm('Estas seguro que quieres crear un producto nuevo?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }
    }

  return <>
        <Row className='align-items-center'>
            <Col>
                <h1>Productos</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3' onClick={ createProductHandler }>
                    <FaEdit /> Crear Producto
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader />}

        { isLoading ? <Loader /> : error ? <Message variant='danger'>
            {error}</Message> : (
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>CATEGORIA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((producto) => (
                            <tr key={producto._id}>
                                <td>{producto._id}</td>
                                <td>{producto.name}</td>
                                <td>{producto.price}</td>
                                <td>{producto.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${producto._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm'
                                        onClick={ () => deleteHandler(producto._id) }>
                                        <FaTrash style={{ color: 'white' }}/>
                                    </Button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </Table>
            </>
        )}
    </>;
  
};

export default ProductListScreen