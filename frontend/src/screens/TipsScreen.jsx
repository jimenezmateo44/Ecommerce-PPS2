import { Container } from 'react-bootstrap'
import CurarMate from '../assets/curar-mate.jpeg'
import '../assets/styles/tips_style.css'

const TipsScreen = () => {
  return (
    <>
      <Container>
        <h1 className='text-center mt-5'>#TIPS - Dos Gauchitos</h1>
        <div>
          <h2 className='mt-5'>Por qué curar el mate?</h2>
          <p>
            El proceso de curado del mate, también conocido como "mateado" en algunas regiones de América del Sur, es esencial para preparar
            y mantener adecuadamente una calabaza de mate o bombilla de acero inoxidable. Hay varias razones para llevar a cabo este proceso:
            <ol className='mt-3'>
              <li>
                <strong>Eliminar sabores no deseados:</strong> La calabaza de mate y las bombillas de acero inoxidable pueden tener sabores naturales y aceites que no son ideales para el consumo de mate. 
                El curado ayuda a eliminar estos sabores no deseados, lo que resulta en un mejor sabor del mate.
              </li>
              <li>
                <strong>Prevenir la absorción de sabores amargos:</strong> La yerba mate, cuando se humedece, puede liberar compuestos amargos. Si no se cura el 
                mate, la calabaza o la bombilla puede absorber estos sabores amargos, lo que afecta negativamente el sabor del mate.
              </li>
              <li>
                <strong>Mejorar la durabilidad:</strong> El curado sella la superficie interna de la calabaza o bombilla, lo que ayuda a prevenir que se agrieten 
                o se dañen con el tiempo. Esto puede prolongar la vida útil de tu calabaza de mate o bombilla.
              </li>
              <li>
                <strong>Realzar el sabor:</strong> El proceso de curado ayuda a preparar la superficie de la calabaza o la bombilla para que pueda absorber los 
                sabores naturales de la yerba mate. Con el tiempo, esto puede contribuir a mejorar el sabor del mate que preparas.
              </li>
            </ol>

            En resumen, el curado del mate es un proceso importante para garantizar que disfrutes de un mate de mejor sabor y para mantener la 
            calabaza de mate o la bombilla en buenas condiciones a lo largo del tiempo. Si no se cura adecuadamente, es más probable que experimentes 
            sabores no deseados y que la calabaza o la bombilla se deteriore más rápidamente.
            </p>
          <hr></hr>
          <h2 className='mt-5'>Como curar el mate?</h2>
          <img src={CurarMate} className='curarImg'/>
        </div>
      </Container>
    </>
  )
}

export default TipsScreen