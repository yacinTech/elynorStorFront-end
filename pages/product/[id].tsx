import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getProductById, getProductsByCategory } from '../../lib/api';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../../pages/order';
import WhatsAppButton from '../../components/WhatsAppButton';
import NewsletterForm from '../../components/NewsletterForm';
import ProductSlider from '../../components/ProductSlider';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};


export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id !== 'string') return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const data = await getProductById(id);
        if (!data) throw new Error('المنتج غير موجود');
        if (!cancelled) setProduct(data);

        const others = await getProductsByCategory(data.category);
        if (!cancelled) {
          setRelated(others.filter((p: Product) => p._id !== data._id));
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setProduct(null);
          setLoading(false);
          console.error(error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>جاري تحميل تفاصيل المنتج...</p>;
  if (!product) return <p>المنتج غير موجود.</p>;

  return (
    <>
      <Head>
        <title>{product.name} - ELYNOR</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content={product.description || 'تفاصيل المنتج'} />
        <meta
          name="keywords"
          content={`${product.name}, ${product.description
            .split(' ')
            .slice(0, 10)
            .join(', ')}, ${product.category}, منتجات, متجر, شراء`}
        />

        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || 'تفاصيل المنتج'} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.images?.[0] || '/logo.png'} />
        <meta property="og:url" content={`https://yourdomain.com/product/${product._id}`} />
        <link rel="canonical" href={`https://yourdomain.com/product/${product._id}`} />
      </Head>

      <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
        {/* سلايدر الصور */}
       <ProductSlider images={product.images || []} />

        {/* معلومات المنتج */}
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            maxWidth: '600px',
            margin: '0 auto 30px',
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#333',
              textAlign: 'center',
            }}
          >
            {product.name}
          </h2>

          <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.5', marginBottom: '20px', textAlign: 'center' }}>
            {product.description}
          </p>

          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#e60023', textAlign: 'center' }}>
            السعر: {product.price} درهم
          </p>

          <p style={{ fontSize: '1rem', color: '#007BFF', textAlign: 'center' }}>التصنيف: {product.category}</p>
        </div>

        <OrderForm productId={product._id} />

        {related.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ textAlign: 'center' }}>منتجات مشابهة</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                gap: '15px',
                marginTop: '10px',
              }}
            >
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <WhatsAppButton />
      <NewsletterForm />
    </>
  );
}
