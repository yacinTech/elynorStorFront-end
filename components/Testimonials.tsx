// components/Testimonials.tsx
import React from 'react';
import styles from './Testimonials.module.css';

type Testimonial = {
  name: string;
  comment: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  // إناث
  {
    name: 'فاطمة الزهراء',
    comment: 'خدمة رائعة، الموقع سهل الاستخدام والمنتجات ممتازة!',
    rating: 5,
    image: '/avatar1.png',
  },

    {
    name: 'Hassan',
    comment: 'Expérience très positive, je recommande vivement ce magasin.',
    rating: 5,
    image: '/avatar8.png',
  },
  {
    name: 'Khadija',
    comment: 'Service impeccable, je reviendrai pour mes prochains achats!',
    rating: 4,
    image: '/avatar2.png',
  },
  {
    name: 'سلمى',
    comment: 'جودة عالية وأسعار مناسبة، تجربة رائعة مع متجر ألينور.',
    rating: 5,
    image: '/avatar3.png',
  },
   {
    name: 'آدم',
    comment: 'توصيل سريع والتغليف كان ممتازاً، أنصح الجميع بالتجربة.',
    rating: 5,
    image: '/avatar6.png',
  },
  {
    name: 'Laila',
    comment: 'Produits variés et livraison rapide, très satisfait!',
    rating: 5,
    image: '/avatar4.png',
  },

  {
    name: 'Youssef',
    comment: 'Très satisfait de la qualité des produits et du service client.',
    rating: 5,
    image: '/avatar5.png',
  },
 
  {
    name: 'محمد',
    comment: 'التعامل راقٍ جداً والخدمة ممتازة، شكراً لكم!',
    rating: 4,
    image: '/avatar7.png',
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
              <img src={t.image || '/default-avatar.png'} alt={t.name} className={styles.avatar} />
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
