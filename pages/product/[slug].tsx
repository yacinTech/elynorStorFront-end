import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../order';
import WhatsAppButton from '../../components/WhatsAppButton';
import NewsletterForm from '../../components/NewsletterForm';
import ProductSlider from '../../components/ProductSlider';
import { getProductBySlug, getProductsByCategory } from '../../lib/api';
import TopBanner from '../../components/TopBanner';

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
      // @ts-ignore
      typeof window.fbq === 'function'
    ) {
      // إرسال حدث ViewContent مع بيانات المنتج
      // @ts-ignore
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

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || 'تفاصيل المنتج'} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={productUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={fullImageUrl} />

        {/* Canonical */}
        <link rel="canonical" href={productUrl} />

        {/* Structured Data */}
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
      <TopBanner />

      <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
        <ProductSlider images={product.images || []} />

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
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {product.name}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#444',
              lineHeight: '1.5',
              marginBottom: '20px',
              textAlign: 'center',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
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
            }}
          >
            السعر: {product.price} درهم
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const product = await getProductBySlug(slug);
    if (!product) return { props: { product: null, related: [] } };

    const others = await getProductsByCategory(product.category);
    // استبعد المنتج الحالي
    const filtered = others.filter((p: Product) => p._id !== product._id);

    // اختار 4 منتجات عشوائية من filtered
    function getRandomItems<T>(arr: T[], n: number): T[] {
      const shuffled = arr.slice(); // نسخة من المصفوفة
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, n);
    }

    const related = getRandomItems(filtered, 4);

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
