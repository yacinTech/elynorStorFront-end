// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getAllProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';
import { useOnScreen } from '../hooks/useOnScreen';

interface Product {
  _id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  createdAt?: string;
  [key: string]: unknown;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>();

  // state للتحكم في عدد المنتجات المعروضة
  const [visibleCount, setVisibleCount] = useState(12);

  const keywords =
    products.length > 0
      ? Array.from(new Set(products.flatMap((p) => [p.name, p.category]).filter(Boolean))).join(', ')
      : 'منتجات, متجر, شراء, تسوق';

  const description =
    'مرحباً بكم في متجر Elynor حيث تجدون منتجات مختارة بعناية، بأناقة وجودة عالية. استمتعوا بتجربة تسوق مميزة وآمنة.';

  const ogImage = 'https://elynor-store.vercel.app/og-image.jpg';

  // المنتجات التي ستعرض حسب visibleCount
  const visibleProducts = products.slice(0, visibleCount);

  // دالة زيادة عدد المنتجات المعروضة بمقدار 10
  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <>
      <Head>
        <title>متجر ELYNOR | تسوق بأناقة وجودة</title>
        <link rel="icon" href="/og-image.jpg" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:url" content="https://elynor-store.vercel.app/" />
        <meta property="og:title" content="متجر ELYNOR | تسوق بأناقة وجودة" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div style={{ maxWidth: '1100px', margin: 'auto', padding: '20px' }}>
        {/* قسم الترحيب مع تأثير الصعود التدريجي عند التمرير */}
        <div
          ref={ref}
          className={`welcome-section ${isVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <Image
            src="/introu.jpg"
            alt="متجر Elynor"
            width={800}
            height={400}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              marginBottom: '20px',
              objectFit: 'cover',
            }}
          />
          <h2
            style={{
              fontSize: '2.4rem',
              color: '#6d28d9',
              fontWeight: 'bold',
              marginBottom: '16px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            مرحباً بكم في متجر Elynor
          </h2>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#333',
              lineHeight: '1.9',
              background: '#f4f0ff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
            }}
          >
            يسعدنا أن نرحب بكم في متجر Elynor، حيث نعرض لكم منتجات أنيقة، عالية الجودة ومختارة بعناية لتلائم ذوقكم.
            نحن نهتم بتوفير تجربة تسوق مريحة وآمنة وسريعة التوصيل. شكراً لاختياركم لنا.
          </p>
        </div>

        <h1
          style={{
            marginBottom: '30px',
            textAlign: 'center',
            fontSize: '2rem',
            color: '#4B0082',
            fontWeight: '700',
            letterSpacing: '1.2px',
            textShadow: '1px 1px 3px rgba(75, 0, 130, 0.3)',
            background: 'linear-gradient(90deg, #6d28d9, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'transform 0.3s ease, text-shadow 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            (e.currentTarget.style as any).transform = 'scale(1.05)';
            (e.currentTarget.style as any).textShadow = '2px 2px 8px rgba(105, 35, 221, 0.6)';
          }}
          onMouseLeave={e => {
            (e.currentTarget.style as any).transform = 'scale(1)';
            (e.currentTarget.style as any).textShadow = '1px 1px 3px rgba(75, 0, 130, 0.3)';
          }}
        >
          جميع المنتجات
        </h1>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>لا توجد منتجات حالياً.</p>
        ) : (
          <>
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* زر تحميل المزيد */}
            {visibleCount < products.length && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={loadMore}
                  style={{
                    padding: '10px 25px',
                    fontSize: '1rem',
                    backgroundColor: '#6d28d9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(109, 40, 217, 0.4)',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget.style as any).backgroundColor = '#7c3aed';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget.style as any).backgroundColor = '#6d28d9';
                  }}
                >
                  عرض المزيد
                </button>
              </div>
            )}
          </>
        )}

        <style jsx>{`
          .product-grid {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            padding-bottom: 40px;
          }

          @media (max-width: 600px) {
            .product-grid {
              grid-template-columns: 1fr;
            }
          }

          .welcome-section {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            max-width: 800px;
            margin: 0 auto 40px auto;
          }
          .welcome-section.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>

      <WhatsAppButton />
      <NewsletterForm />
    </>
  );
}

// جلب البيانات من السيرفر عند كل طلب
export async function getServerSideProps() {
  try {
    const products = await getAllProducts();

    const sorted = products.sort((a: Product, b: Product) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b._id.localeCompare(a._id);
    });

    return { props: { products: sorted } };
  } catch {
    return { props: { products: [] } };
  }
}
