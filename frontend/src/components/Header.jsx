import { Navbar, Nav, Container, Button ,Form } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from "../assets/logo.png";
import '../assets/styles/header_style.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
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
                            <Nav.Link className="navbar-item"><FaShoppingCart/> Carrito</Nav.Link>
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
                            <Button className="rounded-pill" variant="outline-secondary">
                             Buscar
                            </Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header