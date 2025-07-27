import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface ProductSliderProps {
  images: string[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    rtl: true,
    beforeChange: (_: number, next: number) => setCurrent(next),
  };

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: 300,
          backgroundColor: '#eee',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#555',
          fontSize: 18,
        }}
      >
        لا توجد صور
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 16px',
          position: 'relative',  // مهم جداً ليحترم ترتيب الطبقات
          zIndex: 1,             // ضع طبقة منخفضة للسلايدر
        }}
        className="product-slider-wrapper"
      >
        {/* السلايدر الكبير */}
        <div
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
          className="product-slider-container"
        >
          <Slider ref={sliderRef} {...settings}>
            {images.map((src, index) => (
              <div
                key={index}
                onClick={() => setZoomedImage(src)}
                style={{ cursor: 'zoom-in' }}
              >
                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                  <Image
                    src={src}
                    alt={`صورة ${index + 1}`}
                    fill
                    style={{
                      objectFit: 'contain',
                      userSelect: 'none',
                      cursor: 'pointer',
                    }}
                    priority={index === 0}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* صور مصغرة */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
          className="product-slider-thumbnails"
        >
          {images.map((src, index) => {
            const isActive = index === current;
            return (
              <div
                key={index}
                onClick={() => {
                  sliderRef.current?.slickGoTo(index);
                }}
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: isActive ? '3px solid #4caf50' : '3px solid transparent',
                  boxShadow: isActive
                    ? '0 0 8px 2px rgba(76, 175, 80, 0.7)'
                    : 'none',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                  width: 80,
                  height: 60,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={src}
                  alt={`صورة مصغرة ${index + 1}`}
                  width={80}
                  height={60}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* الصورة المكبرة عند الضغط */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          {/* زر الإغلاق */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // منع الإغلاق إذا ضغط على الزر
              setZoomedImage(null);
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              color: '#fff',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            ✖
          </button>

          <Image
            src={zoomedImage}
            alt="صورة مكبرة"
            width={1000}
            height={800}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              userSelect: 'none',
              borderRadius: 8,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          />
        </div>
      )}

      {/* CSS خاص بالـ slick arrows و dots لضبط z-index */}
      <style jsx>{`
        :global(.slick-slider) {
          position: relative;
          z-index: 1; /* أقل من الهيدر */
        }
        :global(.slick-arrow) {
          z-index: 2; /* فوق السلايدر */
        }
        :global(.slick-dots) {
          z-index: 2; /* فوق السلايدر */
        }
      `}</style>
    </>
  );
};

export default ProductSlider;
