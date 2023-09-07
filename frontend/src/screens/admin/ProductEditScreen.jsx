import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: producto, isLoading, refetch, error } = useGetProductsDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (producto) {
            setName(producto.name);
            setPrice(producto.price);
            setImage(producto.image);
            setBrand(producto.brand);
            setCategory(producto.category);
            setCountInStock(producto.countInStock);
            setDescription(producto.description);
        }
     }, [producto]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Producto actualizado');
            navigate('/admin/productlist');
        }
    }


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
        Volver
        </Link>
        <FormContainer>
            <h1>Editar Producto</h1>
            {loadingUpdate && <Loader />}

            { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId='nombre' className='my-2'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingresa precio'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* image input placeholder */}

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa marca'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingresa Stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa Categoria'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='descriptio ' className='my-2'>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingresa Descripcion'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary'
                        className='my-2'
                    >Actualizar</Button>

                </Form>
            )}
        </FormContainer>
    </>
  );
};

export default ProductEditScreen