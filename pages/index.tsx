// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getAllProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  createdAt?: string;
  [key: string]: unknown;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((data: Product[]) => {
        const sorted = data.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b._id.localeCompare(a._id);
        });
        setProducts(sorted);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const keywords =
    products.length > 0
      ? Array.from(new Set(products.flatMap((p) => [p.name, p.category]).filter(Boolean))).join(', ')
      : 'منتجات, متجر, شراء, تسوق';

  const description =
    'مرحباً بكم في متجر Elynor حيث تجدون منتجات مختارة بعناية، بأناقة وجودة عالية. استمتعوا بتجربة تسوق مميزة وآمنة.';

  const ogImage = 'https://elynor-store.vercel.app/og-image.jpg';

  if (loading) return <p>جاري تحميل المنتجات...</p>;

  return (
    <>
      <Head>
        <title>متجر ELYNOR | تسوق بأناقة وجودة</title>
        <link rel="icon" href="/logo.png" />
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
        {/* قسم الترحيب */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
              textAlign: 'justify',
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
            fontSize: '1.8rem',
            color: '#111',
          }}
        >
          جميع المنتجات
        </h1>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>لا توجد منتجات حالياً.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
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
        `}</style>
      </div>

      <WhatsAppButton />
      <NewsletterForm />
    </>
  );
}
