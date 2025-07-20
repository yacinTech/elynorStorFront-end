import React from 'react';
import Slider from 'react-slick';

interface ProductSliderProps {
  images: string[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    rtl: true, // لدعم الاتجاه من اليمين إلى اليسار
  };

  if (!images || images.length === 0) {
    return (
      <div style={{ 
        width: '100%', 
        height: 300, 
        backgroundColor: '#eee', 
        borderRadius: 12, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#555', 
        fontSize: 18 
      }}>
        لا توجد صور
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', borderRadius: 12, overflow: 'hidden' }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`صورة ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 12,
                userSelect: 'none',
              }}
              draggable={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
