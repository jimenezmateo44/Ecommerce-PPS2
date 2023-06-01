import { Container, Row, Col} from "react-bootstrap";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import "../assets/styles/footer_style.css";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>Birzai Cervezas &copy; {currentYear}</p>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaWhatsapp /></a>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer