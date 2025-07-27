import { useState, useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../../components/order';
import ProductSlider from '../../components/ProductSlider';
import { getProductBySlug, getProductsByCategory } from '../../lib/api';
import TopBanner from '../../components/TopBanner';

export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Product = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

type Props = {
  product: Product | null;
  related: Product[];
};

export default function ProductDetails({ product, related }: Props) {
  useEffect(() => {
    if (
      product &&
      typeof window !== 'undefined' &&
      typeof window.fbq === 'function'
    ) {
      window.fbq('track', 'ViewContent', {
        content_ids: [product._id],
        content_name: product.name,
        content_type: 'product',
        value: product.price,
        currency: 'MAD',
      });
    }
  }, [product]);

  if (!product) return <p>المنتج غير موجود.</p>;

  const fullImageUrl =
    product.images?.[0]?.startsWith('http')
      ? product.images[0]
      : `https://elynor-store.vercel.app${product.images?.[0] || '/logo.png'}`;

  const productUrl = `https://elynor-store.vercel.app/product/${product.slug}`;

  // Define the header height (adjust as needed or make dynamic if required)
  const headerHeight = 74;



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
        <title>{product.name} - ELYNOR</title>
        <meta
          name="description"
          content={product.description?.slice(0, 160) || 'تفاصيل المنتج من متجر Elynor'}
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/og-image.jpg" />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || 'تفاصيل المنتج'} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={productUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={fullImageUrl} />

        <link rel="canonical" href={productUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.name,
              image: product.images,
              description: product.description,
              sku: product._id,
              category: product.category,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'MAD',
                price: product.price,
                availability: 'https://schema.org/InStock',
                url: productUrl,
              },
            }),
          }}
        />
      </Head>
 <div style={{ height: `${spacerHeight}px` }} />
      <TopBanner />

      {/* المحتوى الرئيسي */}
      <main
        style={{
          maxWidth: '900px',
          margin: '20px auto 60px', // مسافة من الأعلى للفراغ أسفل البنر والهيدر الطبيعي (غير مثبت)
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <ProductSlider images={product.images || []} />

        <section
          style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            maxWidth: '600px',
            margin: '30px auto',
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
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {product.name}
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#444',
              lineHeight: 1.5,
              marginBottom: '20px',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            {product.description}
          </p>

          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#e60023',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                textDecoration: 'line-through',
                color: '#999',
                fontWeight: 'normal',
                fontSize: '1rem',
              }}
            >
              {Math.round(product.price * 1.4)} درهم
            </span>
            <span>{product.price} درهم</span>
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: '#007BFF',
              textAlign: 'center',
            }}
          >
            التصنيف: {product.category}
          </p>
        </section>

        <OrderForm productId={product._id} />

        {related.length > 0 && (
          <section style={{ marginTop: '40px' }}>
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
          </section>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.params as { slug: string };

  try {
    const product = await getProductBySlug(slug);
    if (!product) return { props: { product: null, related: [] } };

    const others = await getProductsByCategory(product.category);
    const filtered = others.filter((p: Product) => p._id !== product._id);

    function getRandomItems<T>(arr: T[], n: number): T[] {
      const shuffled = arr.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, n);
    }

    const related = getRandomItems<Product>(filtered, 4);

    return {
      props: {
        product,
        related,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { product: null, related: [] } };
  }
};
