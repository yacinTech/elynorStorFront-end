// components/Testimonials.tsx
import React from 'react';
import styles from './Testimonials.module.css';
import Image from 'next/image';

type Testimonial = {
  name: string;
  comment: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'فاطمة الزهراء',
    comment: 'خدمة ممتازة ومنتجات رائعة! أنصح الجميع بالتجربة.',
    rating: 5,
    image: '/avatar1.png',
  },
  {
    name: 'خديجة',
    comment: 'توصيل سريع واحترافية في التعامل.',
    rating: 4,
    image: '/avatar2.png',
  },
  {
    name: 'سلمى',
    comment: 'أحببت تنوع المنتجات والجودة العالية.',
    rating: 5,
    image: '/avatar3.png',
  },
  {
    name: 'أم ريان',
    comment: 'تجربتي مع متجر ألينور كانت أكثر من رائعة! تغليف أنيق، جودة ممتازة، وتعامل راقٍ. شكراً لكم!',
    rating: 5,
    image: '/avatar4.png'
  },
];

const Testimonials = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>ماذا يقول عملاؤنا؟</h2>
      <div className={styles.cards}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.avatarWrapper}>
              <Image src={t.image || '/default-avatar.png'} alt={t.name} className={styles.avatar} />
            </div>
            <p className={styles.comment}>“{t.comment}”</p>
            <div className={styles.footer}>
              <strong className={styles.name}>{t.name}</strong>
              <span className={styles.stars}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
