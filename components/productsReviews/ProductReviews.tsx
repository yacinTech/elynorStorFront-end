import React, { useState, useRef } from 'react';
import styles from './ProductReviews.module.css';
import { FaStar, FaRegStar, FaArrowLeft, FaArrowRight, FaPen } from 'react-icons/fa';

type Review = {
  author: string;
  rating: number;
  comment: string;
};

type Props = {
  reviews: Review[];
  reviewFormUrl?: string;
};

const ProductReviews: React.FC<Props> = ({ reviews, reviewFormUrl }) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const showNav = reviews.length > 1;

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
    <div className={`${styles.container} ${reviews.length === 1 ? styles.oneCard : ''}`}>
      <h2 className={styles.title}>آراء الزبائن</h2>

      {reviews.length === 0 ? (
        <p className={styles.noReviews}>
          لا توجد تعليقات بعد. كن أول من يشارك رأيه حول المنتج!
        </p>
      ) : (
        <>
          <div className={styles.cardStack} ref={sliderRef}>
            {reviews.map((review, i) => {
              const position =
                i === index ? 'active' :
                i === (index - 1 + reviews.length) % reviews.length ? 'prev' :
                i === (index + 1) % reviews.length ? 'next' : 'hidden';
              return (
                <div className={`${styles.card} ${styles[position]}`} key={i}>
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

          {showNav && (
            <div className={styles.nav}>
              <button aria-label="السابق" onClick={next}><FaArrowRight /></button>
              <button aria-label="التالي" onClick={prev}><FaArrowLeft /></button>
            </div>
          )}
        </>
      )}

      {reviewFormUrl && (
        <div className={styles.buttonWrapper}>
          <a href={reviewFormUrl} className={styles.reviewButton}>
            <FaPen className={styles.icon} />
            اترك لنا تعليقًا حول المنتج
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
