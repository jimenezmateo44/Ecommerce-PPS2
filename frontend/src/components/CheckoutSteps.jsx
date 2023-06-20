import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>Ingresa</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Ingresa</Nav.Link>
            )}
        </Nav.Item>

         <Nav.Item>
            {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>Envios</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Envios</Nav.Link>
            )}
        </Nav.Item>

         <Nav.Item>
            {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>Pago</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Pago</Nav.Link>
            )}
        </Nav.Item>

         <Nav.Item>
            {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Confirmar Orden</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Confirmar Orden</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps