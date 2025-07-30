// ProductReviews.tsx
import React, { useState, useRef } from 'react';
import styles from './ProductReviews.module.css';
import { FaStar, FaRegStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Review = {
  author: string;
  rating: number;
  comment: string;
};

type Props = {
  reviews: Review[];
};

const ProductReviews: React.FC<Props> = ({ reviews }) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const next = () => {
    if (window.innerWidth <= 600 && sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth * 0.9, behavior: 'smooth' });
    } else {
      setIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  const prev = () => {
    if (window.innerWidth <= 600 && sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth * 0.9, behavior: 'smooth' });
    } else {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>آراء الزبائن</h2>

      <div className={styles.cardStack} ref={sliderRef}>
        {reviews.map((review, i) => {
          const position =
            i === index ? 'active' :
            i === (index - 1 + reviews.length) % reviews.length ? 'prev' :
            i === (index + 1) % reviews.length ? 'next' : 'hidden';
          return (
            <div
              className={`${styles.card} ${styles[position]}`}
              key={i}
            >
              <div className={styles.header}>
                <span className={styles.author}>{review.author}</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, idx) =>
                    idx < review.rating ? <FaStar key={idx} /> : <FaRegStar key={idx} />
                  )}
                </div>
              </div>
              <p className={styles.text}>{review.comment}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.nav}>
        <button onClick={prev}><FaArrowRight /></button>
        <button onClick={next}><FaArrowLeft /></button>
      </div>
    </div>
  );
};

export default ProductReviews;
