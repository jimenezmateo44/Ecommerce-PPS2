import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "./Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import '../assets/styles/loginScreen_style.css'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

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
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res, })); //se invoca desde authSlice.js
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

  return (
    <FormContainer>
        <h1 className="mt-5">Ingresa</h1>

        <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary" className="mt-2 btnSubmit" disabled= { isLoading }>
                Ingresar
            </Button>

            { isLoading  && <Loader /> } 
        </Form>

        <Row className="py-3">
            <Col>
                ¿No tenés cuenta? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'} className="text-dark">Registrate</Link>
            </Col>
        </Row>
    
    
    </FormContainer>
  )
}

export default LoginScreen;