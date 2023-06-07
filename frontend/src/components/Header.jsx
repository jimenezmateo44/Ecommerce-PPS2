import {Badge,  Navbar, Nav, Container, Button ,Form } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import logo from "../assets/logo.png";
import '../assets/styles/header_style.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
  
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
                        <LinkContainer to='/login'>
                            <Nav.Link className="navbar-item"><FaUser/> Ingresa</Nav.Link>
                        </LinkContainer>
                        
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