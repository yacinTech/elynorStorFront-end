// pages/product/[id].tsx

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../order';
import WhatsAppButton from '../../components/WhatsAppButton';
import NewsletterForm from '../../components/NewsletterForm';
import ProductSlider from '../../components/ProductSlider';
import { getProductById, getProductsByCategory } from '../../lib/api';

type Product = {
  _id: string;
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
  if (!product) return <p>المنتج غير موجود.</p>;

  const fullImageUrl =
    product.images?.[0]?.startsWith('http')
      ? product.images[0]
      : `https://elynor-store.vercel.app${product.images?.[0] || '/logo.png'}`;

  return (
    <>
      <Head>
        <title>{product.name} - ELYNOR</title>
        <link rel="icon" href="/og-image.jpg" />
        <meta name="description" content={product.description || 'تفاصيل المنتج'} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || 'تفاصيل المنتج'} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={`https://elynor-store.vercel.app/product/${product._id}`} />
        <link rel="canonical" href={`https://elynor-store.vercel.app/product/${product._id}`} />
      </Head>

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
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
    }}
  >
    السعر: {product.price} درهم
  </p>
  <p
    style={{
      fontSize: '1rem',
      color: '#007BFF',
      textAlign: 'center',
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
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

      <WhatsAppButton />
      <NewsletterForm />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const product = await getProductById(id);
    if (!product) return { props: { product: null, related: [] } };

    const others = await getProductsByCategory(product.category);
    const related = others.filter((p: Product) => p._id !== product._id);

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
