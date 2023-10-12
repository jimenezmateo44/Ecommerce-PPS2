import { Container } from 'react-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryHeader from './components/CategoryHeader';
import ImageSlider from './components/ImageSlider'

const App = () => {
  return (
    <>
      <Header />
      <CategoryHeader />
      <Routes>
        <Route path="/" element={<ImageSlider />} />
      </Routes>
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>   
      </main>
      <Footer />
      <ToastContainer /> 
    </>
    
  )
}

export default App