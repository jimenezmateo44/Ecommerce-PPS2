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
                    <p>Dos Gauchitos &copy; {currentYear}</p>
                    <a className='socialClass' href="#"><FaInstagram /></a>
                    <a className='socialClass' href="#"><FaWhatsapp /></a>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer