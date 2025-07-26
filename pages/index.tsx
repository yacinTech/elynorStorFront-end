// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getAllProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { useOnScreen } from '../hooks/useOnScreen';
import TopBanner from '../components/TopBanner';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarHero from '../components/Hero/NavbarHero';
import AboutUs from '../components/AboutUs';



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
      <TopBanner />
      <div style={{marginBottom: '60px'}}><NavbarHero /></div>

      <div style={{ maxWidth: '1100px', margin: 'auto', padding: '5px' }}>
        
         
        {/* قسم الترحيب مع تأثير الصعود التدريجي عند التمرير */}
        <div
          ref={ref}
          className={`welcome-section ${isVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
       <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
  }}
>
  <Image
    src="/Elynor1.png"
    alt="متجر Elynor"
    width={1200}
    height={600}
    style={{
      width: '100%',
      maxWidth: '900px', // تم تكبير الحد الأقصى
      height: 'auto',
      borderRadius: '16px',
      objectFit: 'cover',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'scale(1.03)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  />
</div>

        <h2
  style={{
    fontSize: '2.6rem',
    color: '#5b21b6',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Cairo, sans-serif',
    letterSpacing: '0.5px',
  }}
>
  أهلاً بكم في عالم Elynor
</h2>

<p
  style={{
    fontSize: '1.3rem',
    color: '#444',
    lineHeight: '2',
    background: '#f3e8ff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    fontFamily: 'Cairo, sans-serif',
    maxWidth: '700px',
    margin: '0 auto',
  }}
>
  اكتشفوا في متجر <strong style={{ color: '#7c3aed' }}>Elynor</strong> تشكيلة فريدة من المنتجات المختارة بذوق رفيع، تجمع بين الأناقة والجودة.
  نحن هنا لنقدم لكم تجربة تسوق ممتعة، آمنة وسريعة، مع خدمة عملاء متميزة تضع رضاكم أولاً.
  شكراً لثقتكم بنا ومرحباً بكم دائماً في عالـم التميز.
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
            const target = e.currentTarget as HTMLElement;
            target.style.transform = 'scale(1.05)';
            target.style.textShadow = '2px 2px 8px rgba(105, 35, 221, 0.6)';
          }}
          onMouseLeave={e => {
            const target = e.currentTarget as HTMLElement;
            target.style.transform = 'scale(1)';
            target.style.textShadow = '1px 1px 3px rgba(75, 0, 130, 0.3)';
          }}
        >
          جميع المنتجات
        </h1>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>لا توجد منتجات حالياً.</p>
        ) : (
          <>
            <div id='products' className="product-grid">
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
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = '#7c3aed';
                  }}
                  onMouseLeave={e => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.backgroundColor = '#6d28d9';
                  }}

                >
                  عرض المزيد
                </button>

                
              </div>
             

            )}
            <AboutUs />
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
