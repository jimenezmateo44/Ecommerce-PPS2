import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'
import '../assets/styles/header_style.css';

const SubHeader = () => {

  return (
    <div className='w-100 subHeader d-flex justify-content-center gap-3'>
       <button className="btn text-white"type="button"><Link to='/' className='linkBtn'>INICIO</Link></button>
        <button className="btn text-white" type="button"><Link to='/tips' className='linkBtn'>#TIPS</Link></button>
        <button className="btn text-white" type="button"><Link to='/contact' className='linkBtn'>CONTACTO</Link></button>

        
    </div>

  )
}

export default SubHeader