import Image from 'next/image';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';
import Head from 'next/head';
import SEO from '../components/SEO';
import Testimonials from '../components/Testimonials';

export default function AboutPage() {
  return (
    <div>
      <Head>
        <title>من نحن - متجر ELYNOR</title>
        <SEO />
        <meta name="description" content="تعرف على متجر ELYNOR، حيث نقدم أفضل المنتجات المختارة بعناية وجودة عالية." />
        <meta name="keywords" content="من نحن, متجر ELYNOR, منتجات مختارة, جودة عالية" />
        <link rel="canonical" href="https://elynor-store.vercel.app/about" />
      </Head>
      <div
        style={{
          maxWidth: '800px',
          margin: '40px auto',
          padding: '20px',
        lineHeight: '1.8',
        color: '#333',
        textAlign: 'center',
      }}
    >
      {/* الصورة التمهيدية */}
      <div style={{ marginBottom: '30px' }}>
        <Image
          src="/Elynor.png" // ضع هنا مسار الصورة داخل public/
          alt="من نحن"
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <div style={{
  maxWidth: '700px',
  margin: '40px auto',
  padding: '30px 25px',
  backgroundColor: '#fafafa',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#2c2c2c',
  lineHeight: '1.7',
  textAlign: 'right',
}}>
  <h1 style={{
    fontSize: '2.4rem',
    fontWeight: '800',
    marginBottom: '24px',
    color: '#4a148c',
    borderBottom: '3px solid #4a148c',
    paddingBottom: '8px',
  }}>
    من نحن
  </h1>

  <p style={{ marginBottom: '20px', fontSize: '1.15rem' }}>
    متجر <strong>الينور</strong> الإلكتروني يهدف لتقديم منتجات راقية بجودة ممتازة تناسب كافة الأذواق.
    نسعى لتوفير تجربة تسوق سهلة وموثوقة، مع دعم متواصل واهتمام كامل برضا عملائنا.
  </p>

  <p style={{ fontSize: '1.15rem' }}>
    فريقنا يعمل بشغف لتوفير أجمل التصاميم وخدمة عملاء متميزة بكل احترافية.
    نؤمن أن الأناقة تبدأ من التفاصيل، وكل منتج نقدمه يعكس هذه الرؤية.
  </p>
</div>


      <Testimonials />
      <WhatsAppButton />
      <NewsletterForm />
    </div>
    </div>
  );
}
