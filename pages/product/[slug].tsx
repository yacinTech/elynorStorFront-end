import { useState, useEffect, useRef } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import OrderForm from '../../components/order';
import ProductSlider from '../../components/ProductSlider';
import { getProductBySlug, getProductsByCategory } from '../../lib/api';
import TopBanner from '../../components/TopBanner';
import ProductReviews from '../../components/productsReviews/ProductReviews';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeatureSlider from '../../components/Delivery';
import FloatingOrderButton from '../../components/FloatingOrderButtonProps'


// دالة لتحويل رابط الصورة تلقائياً إلى WebP/ضغط ذكي إذا كانت على Cloudinary
function optimizeImage(url: string) {
  // إذا كان الرابط يحتوي على /upload/ في Cloudinary
  return url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;
}


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
  id: string;
  colors: string[] | undefined;
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


function parseSimpleMarkup(text: string) {
  // خريطة الألوان الموسعة
  const colorMap: Record<string, string> = {
    p: '#800080', // بنفسجي
    r: '#e60023', // أحمر
    g: '#008000', // أخضر
    b: '#007BFF', // أزرق
    o: '#FF6600', // برتقالي
    y: '#FFD700', // أصفر
    c: '#00CED1', // سماوي
    m: '#FF00FF', // ماجنتا
    k: '#000000', // أسود
    w: '#FFFFFF', // أبيض
    // أضف المزيد حسب الحاجة
  };

  // خلفيات بألوان
  const bgColorMap: Record<string, string> = {
    p: '#E6E6FA', // بنفسجي فاتح
    r: '#FFC1C1', // أحمر فاتح
    g: '#C1FFC1', // أخضر فاتح
    b: '#C1DFFF', // أزرق فاتح
    o: '#FFE6CC', // برتقالي فاتح
    y: '#FFFFCC', // أصفر فاتح
    c: '#CCF0F0', // سماوي فاتح
    m: '#FFCCFF', // ماجنتا فاتح
    k: '#CCCCCC', // رمادي فاتح
    w: '#FFFFFF', // أبيض
  };

  return text
    // خط مشطوب
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // تحته خط
    .replace(/__(.+?)__/g, '<u>$1</u>')
    // عريض
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // مائل
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // ألوان نص مع تأثير عريض (مثل السابق)
    .replace(/@@(.+?)#([prgboycmkw])@@/g, (_, word, colorCode) => {
      const color = colorMap[colorCode] || '#000';
      return `<span style="color:${color}; font-weight:bold;">${word}</span>`;
    })
    // خلفية ملونة
    .replace(/##([prgboycmkw])::(.+?)##/g, (_, bgCode, text) => {
      const bgColor = bgColorMap[bgCode] || '#fff';
      return `<span style="background-color:${bgColor}; padding:2px 4px; border-radius:3px;">${text}</span>`;
    })
    // تأثير ظل للنص
    .replace(/%%(.+?)::(.+?)%%/g, (_, effect, text) => {
      if (effect === 'shadow') {
        return `<span style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${text}</span>`;
      }
      // إضافة تأثيرات أخرى مستقبلاً هنا
      return text;
    });
}



export default function ProductDetails({ product, related }: Props) {
  // تعريف الهامش الأعلى ديناميكياً حسب حجم الشاشة
  const [spacerHeight, setSpacerHeight] = useState(74);
    const scrollRef = useRef<HTMLDivElement>(null);


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
      const fullImageUrlOptimized = optimizeImage(fullImageUrl);



  const productUrl = `https://elynor-store.vercel.app/product/${product.slug}`;


   const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amt = 220;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
    }
  };

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
        <meta property="og:image" content={fullImageUrlOptimized} />

        <meta property="og:url" content={productUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={fullImageUrlOptimized} />


        <link rel="canonical" href={productUrl} />

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name || '',
      image: product.images && product.images.length > 0 ? product.images : [],
      description: product.description || '',
      sku: product._id || '',
      category: product.category || '',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'MAD',
        price: product.price != null ? product.price : '0',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        url: productUrl || '',
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
      // حقل aggregateRating يظهر فقط إذا توجد تقييمات
      ...(product.reviews && product.reviews.length > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (
            product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
          ).toFixed(1),
          reviewCount: product.reviews.length.toString()
        }
      }),
      // حقل review يظهر فقط إذا توجد تقييمات
      ...(product.reviews && product.reviews.length > 0 && {
        review: product.reviews.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.author || 'مستخدم'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating != null ? r.rating.toString() : '5',
            bestRating: '5'
          },
          reviewBody: r.comment || ''
        }))
      })
    })
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
              textAlign: 'right',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{ __html: parseSimpleMarkup(product.description) }}
          />

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

        <OrderForm
          productId={product._id}
          productName={product.name}
          colors={product.colors}
        />


        <ProductReviews
  reviews={product.reviews ?? []}
  reviewFormUrl="#contact"
/>

<FeatureSlider />
<FloatingOrderButton
  product={{
    _id: product._id,
    name: product.name,
    image: product.images?.[0]
      ? (product.images[0].startsWith('http')
          ? product.images[0]
          : `https://elynor-store.vercel.app${product.images[0]}`)
      : '/logo.png',
    price: product.price.toString(),
    category: product.category,
    colors: product.colors,
  }}
/>




{related.length > 0 && (
  <section style={{ marginTop: "40px", position: "relative" }}>
    <h3 style={{ textAlign: "center", marginBottom: "15px" }}>منتجات مشابهة</h3>

    {/* زر يسار */}
    <button
      onClick={() => scroll("left")}
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "rgba(0,0,0,0.6)",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,0.8)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
      }
    >
      <ChevronLeft size={20} />
    </button>

    {/* المنتجات */}
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "15px",
        overflowX: "auto",
        padding: "10px 40px",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
      }}
    >
      {related.map((p) => (
        <div
          key={p._id}
          style={{
            flex: "0 0 180px",
            maxWidth: "180px",
          }}
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>

    {/* زر يمين */}
    <button
      onClick={() => scroll("right")}
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "rgba(0,0,0,0.6)",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,0.8)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
      }
    >
      <ChevronRight size={20} />
    </button>
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
