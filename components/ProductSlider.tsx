import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import ImageModal from './ImageModal';

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
            {images.map((src, index) => {
              const optimizedSrc = src.includes('/upload/')
                ? src.replace('/upload/', '/upload/f_auto,q_auto/')
                : src;

              return (
                <div
                  key={index}
                  onClick={() => setZoomedImage(optimizedSrc)}
                  style={{ cursor: 'zoom-in' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '400px',
                      position: 'relative',
                      border: '4px solid #f0f0f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={optimizedSrc}
                      alt={`صورة ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'cover',
                        userSelect: 'none',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.02)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = 'scale(1)')
                      }
                      priority={index < 2}          // 👈 أول صورتين فقط priority
                      loading={index < 2 ? 'eager' : 'lazy'} // 👈 البقية lazy
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* صور مصغرة */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            overflowX: 'auto',      // يسمح بالتمرير أفقي فقط عند زيادة الصور
            padding: '8px 0',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
          className="product-slider-thumbnails"
        >
          {images.map((src, index) => {
            const optimizedSrc = src.includes('/upload/')
              ? src.replace('/upload/', '/upload/f_auto,q_auto/')
              : src;

            const isActive = index === current;
            return (
              <div
                key={index}
                onClick={() => {
                  sliderRef.current?.slickGoTo(index);
                }}
                style={{
                  cursor: 'pointer',
                  borderRadius: 12,
                  border: isActive ? '2px solid #4caf50' : '1px solid #ccc',
                  boxShadow: isActive
                    ? '0 0 10px rgba(76, 175, 80, 0.6)'
                    : '0 0 6px rgba(0,0,0,0.1)',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                  width: 80,
                  height: 60,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                }}
              >
                <Image
                  src={optimizedSrc}
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
        <ImageModal
          image={zoomedImage}
          onClose={() => setZoomedImage(null)}
        />
      )}

      {/* CSS خاص بالـ slick arrows و dots لضبط z-index */}
      <style jsx>{`
        :global(.slick-prev),
        :global(.slick-next) {
          width: 40px;
          height: 40px;
          z-index: 5;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          display: flex !important;
          align-items: center;
          justify-content: center;
        }

        :global(.slick-prev) {
          left: 10px;
        }

        :global(.slick-next) {
          right: 10px;
        }

        :global(.slick-prev:before),
        :global(.slick-next:before) {
          color: #333;
          font-size: 20px;
        }

        :global(.slick-dots li button:before) {
          font-size: 10px;
          color: #ccc;
        }

        :global(.slick-dots li.slick-active button:before) {
          color: #4caf50;
        }
      `}</style>
    </>
  );
};

export default ProductSlider;
