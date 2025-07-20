// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAllProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(data => {
        const sorted = data.sort((a: any, b: any) => {
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

  // توليد كلمات مفتاحية من أسماء وتصنيفات المنتجات
  const keywords = products.length > 0
    ? Array.from(
        new Set(
          products.flatMap(p => [p.name, p.category]).filter(Boolean)
        )
      ).join(', ')
    : 'منتجات, متجر, شراء, تسوق';

  const description = 'مرحباً بكم في متجرنا الإلكتروني حيث تجد أفضل المنتجات المختارة بعناية وجودة عالية وأسعار تنافسية. اكتشف تشكيلتنا الواسعة اليوم.';

  if (loading) return <p>جاري تحميل المنتجات...</p>;

  return (
    <>
      <Head>
        <title>متجر ELYNOR - أفضل المنتجات المختارة</title>
         <link rel="icon" href="/logo.png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content="متجر ELYNOR - أفضل المنتجات المختارة" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/introu.jpg" />
      </Head>

      <div style={{ maxWidth: '1100px', margin: 'auto', padding: '20px' }}>
        {/* قسم الترحيب */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img
            src="/introu.jpg"
            alt="ترحيب"
            style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '20px' }}
          />
          <h2 style={{ fontSize: '1.8rem', color: '#333' }}>مرحباً بكم في متجرنا!</h2>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            اكتشفوا أفضل المنتجات المختارة بعناية وجودة عالية وأسعار تنافسية.
          </p>
        </div>

        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>جميع المنتجات</h1>

        {products.length === 0 ? (
          <p>لا توجد منتجات لعرضها.</p>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <style jsx>{`
          .product-grid {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }
          @media (max-width: 600px) {
            .product-grid {
              grid-template-columns: 1fr; /* عمود واحد في الشاشات الصغيرة */
            }
          }
        `}</style>
      </div>
      <WhatsAppButton />
      <NewsletterForm />
    </>
  );
}
