import { Container, Row, Col, Form} from "react-bootstrap";
import { FaInstagram, FaWhatsapp, FaFacebookSquare, FaCheck } from 'react-icons/fa';

import "../assets/styles/footer_style.css";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-light text-dark py-5">
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={6}>
            <h4>Suscribite a nuestro newsletter</h4>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                className="w-100 me-2 rounded"
                aria-label="Email"
              />
              <button className="btn btn-dark" type="button">
                <FaCheck />
              </button>
            </Form>
          </Col>

          <Col xs={12} md={6}>
            <div>
              <h4>Síguenos en redes sociales</h4>
              <a className="socialClass fs-3 text-dark" href="#">
                <FaInstagram />
              </a>
              <a className="socialClass fs-3 text-dark" href="#">
                <FaWhatsapp />
              </a>
              <a className="socialClass fs-3 text-dark">
                <FaFacebookSquare />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-5">
            <p>&copy; {currentYear} Mateo Jimenez - Todos los derechos reservados</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer