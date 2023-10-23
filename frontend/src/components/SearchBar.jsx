import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/styles/header_style.css';

const SearchBar = () => {
    const navigate = useNavigate();

    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('');
        }
    }

  return (
    <>
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type="text"
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className="me-2 rounded"
                value={keyword}
                placeholder="Buscar productos"
                />
            <Button type='submit' className='btn-buscar'><FaSearch /></Button>
        </Form>
    </>
  )
}

export default SearchBar