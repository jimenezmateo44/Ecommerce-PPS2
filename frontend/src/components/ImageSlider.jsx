import React from 'react'
import { useState, useEffect } from 'react'

const ImageSlider = () => {
    const imagenes = [
        'https://d22fxaf9t8d39k.cloudfront.net/bfcff9cd28146d464c90deb2d92e96b6a4c1287656094cbb4ffc94d1a4c95c1d19762.jpg',
        'https://d22fxaf9t8d39k.cloudfront.net/e8e1c141dcf97076a5feac2ad389843ed854110444b7a0a05c7ad87cc52e13dc19762.jpeg',
        'https://d22fxaf9t8d39k.cloudfront.net/b6121b7e9ea332027a0dd6a9200b9813a4f73dcd2e7f151b21c880fac797bb6019762.jpg',
        // Agrega más URLs de imágenes según sea necesario
      ];
    
      const [indice, setIndice] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setIndice((indice + 1) % imagenes.length);
        }, 3000); // Cambia el valor 3000 para ajustar la velocidad del slider
    
        return () => {
          clearInterval(interval);
        };
      }, [indice]);
    
      return (
        <div className="slider-container">
          <img src={imagenes[indice]} alt={`Imagen ${indice + 1}`} className="img-fluid" />
        </div>
      );
}

export default ImageSlider