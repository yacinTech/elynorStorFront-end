// pages/category/[category].tsx
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getProductsByCategory } from '../../lib/api';
import Image from 'next/image';
import SEO from '../../components/SEO';
import TopBanner from '../../components/TopBanner';

interface Product {
  slug: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

interface CategoryPageProps {
  category: string;
  products: Product[];
}

const STATIC_CATEGORIES = [
  'الإلكترونيات',
  'المنزل والمطبخ',
  'الملابس والأزياء',
  'عناية شخصية',
  'منتجات الأطفال',
  // أضف التصنيفات الأخرى هنا
];

export default function CategoryPage({ category, products }: CategoryPageProps) {
  const description = `تصفح أفضل المنتجات في تصنيف ${category} بأفضل الأسعار والتفاصيل. اكتشف مجموعة واسعة من المنتجات المتنوعة.`;
  const keywords = `${category}, منتجات, شراء, تسوق, متجر إلكتروني`;

  return (
    <>
      <Head>
        <title>منتجات {category} - متجرنا</title>
        <SEO />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={`منتجات ${category} - متجرنا`} />
        <meta property="og:description" content={description} />
        {/* يمكنك إضافة صورة عامة هنا إن أردت */}
        <link rel="canonical" href={`https://yourdomain.com/category/${encodeURIComponent(category)}`} />
      </Head>
      <TopBanner />

      <div
        style={{
          padding: '40px 20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            marginBottom: '25px',
            fontSize: '2rem',
            color: '#222',
            fontWeight: '700',
            letterSpacing: '0.5px',
            borderBottom: '2px solid #8e44ad',
            display: 'inline-block',
            paddingBottom: '8px',
          }}
        >
          المنتجات في تصنيف: {category}
        </h1>

        {products.length === 0 ? (
          <p>لا توجد منتجات في هذا التصنيف.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {products.map(product => (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '16px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'none';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '220px',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3
                    style={{
                      margin: '0 0 8px',
                      fontSize: '1.2rem',
                      color: '#222',
                    }}
                  >
                    {product.name}
                  </h3>
                  {/* السعر قبل وبعد الخصم */}
                  <div
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: '#999',
                        textDecoration: 'line-through',
                      }}
                    >
                      {Math.round(product.price * 1.4)} درهم
                    </span>
                    <span
                      style={{
                        backgroundColor: '#f9f3e9',
                        color: '#c97b00',
                        fontWeight: 'bold',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        border: '1px solid #f0e0c0',
                      }}
                    >
                      {product.price} درهم
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// توليد مسارات ثابتة لجميع التصنيفات
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = STATIC_CATEGORIES.map(cat => ({
    params: { category: cat },
  }));

  return {
    paths,
    fallback: 'blocking', // يمكنك تغييرها حسب احتياجك
  };
};



// جلب المنتجات في وقت البناء (Build time)
export const getStaticProps: GetStaticProps<CategoryPageProps> = async context => {
  const category = context.params?.category;

  if (typeof category !== 'string') {
    return { notFound: true };
  }

  // جلب المنتجات حسب التصنيف
  let products = await getProductsByCategory(category);

  // ترتيب المنتجات من الأحدث إلى الأقدم حسب ObjectId (MongoDB)
  products = products.sort((a: { _id: { toString: () => string; }; }, b: { _id: { toString: () => string; }; }) => {
    const aTime = new Date(parseInt(a._id.toString().substring(0, 8), 16) * 1000);
    const bTime = new Date(parseInt(b._id.toString().substring(0, 8), 16) * 1000);
    return bTime.getTime() - aTime.getTime();
  });

  return {
    props: {
      category,
      products,
    },
    revalidate: 60, // يعيد البناء كل 60 ثانية
  };
};
