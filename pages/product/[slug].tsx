import { useState, useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../../components/order';
import ProductSlider from '../../components/ProductSlider';
import { getProductBySlug, getProductsByCategory } from '../../lib/api';
import TopBanner from '../../components/TopBanner';
import ProductReviews from '../../components/productsReviews/ProductReviews';

export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Review = {
  author: string;
  rating: number;  
  comment: string;
};

type Product = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  seoKeywords?: string[];
  reviews?: Review[];
};

type Props = {
  product: Product | null;
  related: Product[];
};

export default function ProductDetails({ product, related }: Props) {
  // تعريف الهامش الأعلى ديناميكياً حسب حجم الشاشة
  const [spacerHeight, setSpacerHeight] = useState(74);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 400) setSpacerHeight(40);
      else if (width <= 640) setSpacerHeight(50);
      else setSpacerHeight(74);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FB Pixel Tracking عند تغيير المنتج
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

  return (
    <>
      <Head>
        <title>{product.name} - ELYNOR</title>
        <meta
          name="description"
          content={product.description?.slice(0, 160) || 'تفاصيل المنتج من متجر Elynor'}
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/og-image.jpg"  type="image/jpg" />

              <meta
        name="keywords"
        content={
          [
            product.name,
            ...(Array.isArray(product.seoKeywords) && product.seoKeywords.length > 0
              ? product.seoKeywords
              : product.description
              ? product.description.split(' ').slice(0, 10)
              : ['منتجات', 'تسوق', 'متجر', 'elynor'])
          ].join(', ')
        }
      />


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
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        url: productUrl,
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'MA',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'MA'
          },
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '30',
            currency: 'MAD'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'd'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'd'
            }
          }
        }
      },
      aggregateRating: product.reviews && product.reviews.length > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: (
              product.reviews.reduce((sum, r) => sum + r.rating, 0) /
              product.reviews.length
            ).toFixed(1),
            reviewCount: product.reviews.length.toString()
          }
        : {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            reviewCount: '24'
          },
      review: product.reviews && product.reviews.length > 0
        ? product.reviews.map((r) => ({
            '@type': 'Review',
            author: r.author,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating.toString(),
              bestRating: '5'
            },
            reviewBody: r.comment
          }))
        : [
            {
              '@type': 'Review',
              author: 'Fatima',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5'
              },
              reviewBody: 'منتج رائع وسهل الاستخدام!'
            }
          ]
    }),
  }}
/>

      </Head>

      <div style={{ height: `${spacerHeight}px` }} />
      <TopBanner />

      <main
        style={{
          maxWidth: '900px',
          margin: '20px auto 60px',
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
        <ProductReviews
  reviews={product.reviews ?? []}
  reviewFormUrl="#contact"
/>




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

    // ✅ إذا لم يوجد المنتج، نُرجع 404 حقيقية
    if (!product) {
      return {
        notFound: true,
      };
    }

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
    return {
      notFound: true, 
    };
  }
};
