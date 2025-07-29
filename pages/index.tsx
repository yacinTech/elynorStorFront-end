// ✅ Suggested improvements:
// 1. Consolidated layout to ensure spacing and centering are unified
// 2. Added semantic container for layout clarity
// 3. Cleaned nested flex/grid sections for better responsiveness and readability
// 4. Moved styling logic to CSS-in-JS where appropriate for readability

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

import { useState, useEffect } from 'react';

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
  const [visibleCount, setVisibleCount] = useState(12);

  const keywords =
    products.length > 0
      ? Array.from(new Set(products.flatMap((p) => [p.name, p.category]).filter(Boolean))).join(', ')
      : 'منتجات, متجر, شراء, تسوق';

  const description =
    'مرحباً بكم في متجر Elynor حيث تجدون منتجات مختارة بعناية، بأناقة وجودة عالية. استمتعوا بتجربة تسوق مميزة وآمنة.';

  const ogImage = 'https://elynor-store.vercel.app/og-image.jpg';
  const visibleProducts = products.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 10);



  const [spacerHeight, setSpacerHeight] = useState(74);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 400) setSpacerHeight(40);
      else if (width <= 640) setSpacerHeight(50);
      else setSpacerHeight(74);
    }

    handleResize(); // تعيين الارتفاع عند تحميل الصفحة
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
          <title>متجر ELYNOR | تسوق بأناقة وجودة</title>

          {/* أيقونة الموقع (favicon) */}
          <link rel="icon" href="https://elynor-store.vercel.app/og-image.jpg" type="image/jpeg" />

          {/* الوصف والكلمات المفتاحية */}
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />

          {/* بيانات Open Graph الأساسية */}
          <meta property="og:url" content="https://elynor-store.vercel.app/" />
          <meta property="og:title" content="متجر ELYNOR | تسوق بأناقة وجودة" />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* بيانات الشعار لمحركات البحث */}
         
      </Head>

       <div style={{ height: `${spacerHeight}px` }} />
      <TopBanner />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <NavbarHero />
        </section>

        <section
          ref={ref}
          className={`welcome-section ${isVisible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Image
              src="/Elynor1.png"
              alt="متجر Elynor"
              width={1200}
              height={600}
              style={{
                width: '100%',
                maxWidth: '900px',
                height: 'auto',
                borderRadius: '16px',
                objectFit: 'cover',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          <h2 style={{ fontSize: '2.6rem', color: '#5b21b6', fontWeight: 800, margin: '1rem 0' }}>
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
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            اكتشفوا في متجر <strong style={{ color: '#7c3aed' }}>Elynor</strong> تشكيلة فريدة من المنتجات المختارة بذوق رفيع، تجمع بين الأناقة والجودة. نحن هنا لنقدم لكم تجربة تسوق ممتعة، آمنة وسريعة، مع خدمة عملاء متميزة.
          </p>
        </section>

        <section>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#4B0082', marginBottom: '30px' }}>
            جميع المنتجات
          </h1>

          {products.length === 0 ? (
            <p style={{ textAlign: 'center' }}>لا توجد منتجات حالياً.</p>
          ) : (
            <>
              <div id="products" className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

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
                    }}
                  >
                    عرض المزيد
                  </button>
                </div>
              )}
              <AboutUs />
            </>
          )}
        </section>

        <style jsx>{`
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            padding-bottom: 40px;
          }

          .welcome-section {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            max-width: 800px;
            margin: 0 auto;
          }

          .welcome-section.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </main>
       <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ELYNOR",
            "url": "https://elynor-store.vercel.app",
            "logo": "https://elynor-store.vercel.app/og-image.jpg"
          }),
        }}
      />
    </>
  );
}

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
