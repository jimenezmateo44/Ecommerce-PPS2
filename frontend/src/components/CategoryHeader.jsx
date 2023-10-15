import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'
import '../assets/styles/header_style.css';

const CategoryHeader = () => {
  return (
    <div className='w-100 subHeader d-flex justify-content-center gap-3'>
       <button className="btn text-white"type="button"><Link to='/' className='linkBtn'>INICIO</Link></button>
       <button className="btn text-white" type="button">
       <NavDropdown title='CATEGORIAS' id='categoriasDropdown'>
            <LinkContainer to='/'>
                <NavDropdown.Item className='bg-dark'>MATES</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/'>
                <NavDropdown.Item className='bg-dark'>BOMBILLAS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/'>
                <NavDropdown.Item className='bg-dark'>YERBAS</NavDropdown.Item>
            </LinkContainer>
        </NavDropdown>
        </button>
        <button className="btn text-white" type="button"><Link to='/tips' className='linkBtn'>#TIPS</Link></button>
        <button className="btn text-white" type="button"><Link to='/contact' className='linkBtn'>CONTACTO</Link></button>
    </div>
  )
}

export default CategoryHeader