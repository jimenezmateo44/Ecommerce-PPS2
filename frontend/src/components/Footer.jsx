import { FaInstagram, FaWhatsapp,  FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Col, Row, Container, Button } from 'react-bootstrap'
import LogosTarjeta from '../assets/tarjetas-logo.png'
import LogoDataFiscal from '../assets/data-fiscal-logo.jpg'
import "../assets/styles/footer_style.css";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className='d-flex bg-light py-5 text-dark'>
      <Container className='d-flex align-items-center justify-content-between bg-light'>
        <Row>
          <Col md={6}>
            <h3 className='mt-5'>¡Suscribite a nuestro Newsletter!</h3>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className='w-75 mt-2 rounded p-1 emailForm'>
            </input>
            <Button className='p-1 bg-black btnNews'>Suscribite</Button> 
          </Col>
          <Col md={6}>
            <h3 className='mt-5 text-center'>Redes Sociales</h3>
            <div className='d-flex align-items-center justify-content-center'>
              <FaInstagram className="mx-2 fs-3"/>
              <FaWhatsapp className="mx-2 fs-3"/>
              <FaFacebook className="mx-2 fs-3"/>
            </div> 
          </Col>
          <Col md={12} className='mt-5'>
            <div className='d-flex align-items-center justify-content-between'>
              <img src={LogosTarjeta} className=""></img>
              <div className='d-flex gap-2 links'>
                <Link to="/" className='text-dark'>FAQ</Link>
                <Link to="/" className='text-dark'>Terminos y condiciones</Link>
                <Link to="/" className='text-dark'>Como comprar</Link>
                <Link to="/" className='text-dark'>Devoluciones</Link>
                <Link to="/" className='text-dark'>Quienes somos</Link>
                <Link to="/" className='text-dark'>Envios</Link>
              </div>
              <img src={LogoDataFiscal} className='dataFiscal'></img>
            </div> 
             
             <p className='text-center mt-5 copyright'>&copy; {currentYear} Mateo Jimenez - Todos los derechos reservados</p>
          </Col>

        </Row>
      </Container>
    </footer>
    // <footer className="bg-light text-dark py-5">
    //   <div className="d-flex flex-direction-row justify-content-around align-items-center">
    //     <div>
    //       <h3>Suscribite a nuestro newsletter</h3>
    //       <input
    //         type="email"
    //         placeholder="Ingresa tu email"
    //         className="w-100">
    //         </input>
    //     </div>
    //     <div>
    //       <h3>Redes Sociales</h3>
    //       <FaInstagram className="mx-2"/>
    //       <FaWhatsapp className="mx-2"/>
    //       <FaFacebook className="mx-2"/>
    //     </div>
    //   </div>
    //   <div className="text-center mt-5">
    //     <p className='text-center'>&copy; {currentYear} Mateo Jimenez - Todos los derechos reservados</p>
    //   </div>
    // </footer>
  )
}

export default Footer