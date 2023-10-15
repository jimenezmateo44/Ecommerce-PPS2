import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "./Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import '../assets/styles/loginScreen_style.css'


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
        }
        try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res, })); //se invoca desde authSlice.js
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

  return (
    <FormContainer>
        <h1>Registrate</h1>

        <Form onSubmit={submitHandler}>
             <Form.Group controlId="name" className="my-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type='text'
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
        </Form>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="password" className="my-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-3">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-2 btnSubmit" disabled= { isLoading }>
                Registrar
            </Button>

            { isLoading  && <Loader /> } 
        </Form>

        <Row className="py-3">
            <Col>
                ¿Ya tenés una cuenta? <Link to={ redirect ? `/register?redirect=${redirect}` : '/login'} className="text-dark">Inicia sesión</Link>
            </Col>
        </Row>
    
    
    </FormContainer>
  )
}

export default RegisterScreen;