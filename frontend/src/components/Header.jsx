import {Badge,  Navbar, Nav, Container, Button ,Form, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import logo from "../assets/logo.png";
import '../assets/styles/header_style.css';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

  
    return (
    <header>
        <Navbar className="navbar" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="DosGauchitos" className="navbar-logo"></img>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link className="navbar-item"><FaShoppingCart/> Carrito
                            {
                                cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                        { cartItems.reduce((a, c) => a + c.qty, 0) }
                                    </Badge>
                                )
                            }
                            </Nav.Link>
                        </LinkContainer>
                        { userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Cerrar Sesión 
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : 
                        ( //else
                            <LinkContainer to='/login'>
                                <Nav.Link className="navbar-item"><FaUser/> Ingresa</Nav.Link>
                            </LinkContainer>
                        )}
                        
                        
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Buscar productos"
                                className="me-2 rounded"
                                aria-label="Search"
                            />
                            <a href='#' className='btn-buscar'><FaSearch /></a>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header