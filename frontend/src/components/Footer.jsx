import { FaInstagram, FaWhatsapp,  FaFacebook } from 'react-icons/fa';

import "../assets/styles/footer_style.css";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-light text-dark py-5">
      <div className="d-flex flex-direction-row justify-content-around align-items-center">
        <div>
          <h3>Suscribite a nuestro newsletter</h3>
          <input
            type="email"
            placeholder="Ingresa tu email"
            className="w-100">
            </input>
        </div>
        <div>
          <h3>Redes Sociales</h3>
          <FaInstagram className="mx-2"/>
          <FaWhatsapp className="mx-2"/>
          <FaFacebook className="mx-2"/>
        </div>
      </div>
      <div className="text-center mt-5">
        <p className='text-center'>&copy; {currentYear} Mateo Jimenez - Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer