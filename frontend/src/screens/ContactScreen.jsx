import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import logo from '../assets/logo.png'
import '../assets/styles/tips_style.css'

const ContactScreen = () => {
  return (
    <>
      <Container>
        <h1 className='text-center mt-3'>Contactanos</h1>
        <Row>
        <Col md={6}>
          <Form className='mt-3'>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí" style={{ minHeight: '100px', maxHeight: '100px' }} />
            </Form.Group>

            <Button className="btnContactForm "type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <img
            src={logo}
            alt="Logo dosgauchitos"
            className="logoContactForm"
          />
        </Col>
      </Row>
      </Container>
    </>
  )
}

export default ContactScreen