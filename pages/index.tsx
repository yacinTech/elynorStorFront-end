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
  // يُفضل تجنب any واستخدام Record<string, unknown> بدلاً منها
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
    'مرحباً بكم في متجرنا الإلكتروني حيث تجد أفضل المنتجات المختارة بعناية وجودة عالية وأسعار تنافسية. اكتشف تشكيلتنا الواسعة اليوم.';

  if (loading) return <p>جاري تحميل المنتجات...</p>;

  return (
    <>
      <Head>
        <title>متجر ELYNOR - أفضل المنتجات المختارة</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="اكتشف تشكيلة مميزة من المنتجات في متجر Elynor - ملابس، إلكترونيات، أدوات منزلية وأكثر!" />
        <meta name="keywords" content={keywords} />
        <meta property="og:url" content="https://elynor-store.vercel.app/" />
        <meta property="og:title" content="متجر ELYNOR - أفضل المنتجات المختارة" />
        <meta property="og:description" content="اكتشف تشكيلة مميزة من المنتجات في متجر Elynor - ملابس، إلكترونيات، أدوات منزلية وأكثر!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elynor-store.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J90YN8P50R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J90YN8P50R');
            `,
          }}
        />
      </Head>

      <div style={{ maxWidth: '1100px', margin: 'auto', padding: '20px' }}>
        {/* قسم الترحيب */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Image
            src="/introu.jpg"
            alt="ترحيب"
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '20px' }}
          />
          <h2
  style={{
    fontSize: '2.2rem',
    color: '#b980f0',
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
    color: '#444',
    lineHeight: '1.9',
    background: '#fdf7ff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    textAlign: 'justify',
  }}
>
  يسعدنا أن نرحب بكم في متجر Elynor، وجهتكم المثالية لعالم من الأناقة والجودة الرفيعة. نحن نهتم بكل تفصيلة، ونحرص على تقديم منتجات مختارة بعناية لتلائم ذوقكم الراقي. هدفنا هو توفير تجربة تسوق ممتعة، سهلة وآمنة، مع ضمان رضاكم الكامل في كل مرة. شكراً لاختياركم لنا، ونتمنى أن تجدوا ما يلهمكم ويعبّر عن ذوقكم.
</p>

        </div>

        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>جميع المنتجات</h1>

        {products.length === 0 ? (
          <p>لا توجد منتجات لعرضها.</p>
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
