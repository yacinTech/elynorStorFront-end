// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';
import ContactSection from '../components/ContactSection';
import { ToastContainer } from 'react-toastify';

export default function MyApp({ Component, pageProps }: AppProps) {
  // ✅ جميع معرفات البيكسلات التي تريد تتبع الموقع كاملاً
  const allPixels = [
    '2833863817001070', // Pixel 1
    '610812365430824',  // Pixel 2
    '1089901202646915', // Pixel 3
    '738455789097119',  // Pixel 5 group
    '753759500831707',
    '632899916325860',
    '662892656149516',
    '1169655271681082'
  ];

  return (
    <div style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-p0dAipIpZ+vEB5A1uJ0q+uCSlQGKs8lwRl3z2RZdz1T1QHnWb3YfNUdW1TGh84GYG8Ew2Lr9G2rhNq0u9Sd1Pg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="icon"
          href="https://elynor-store.vercel.app/og-image.jpg"
          type="image/jpeg"
        />

        {/* ✅ noscript fallback لكل بيكسل */}
        {allPixels.map((id) => (
          <noscript key={id}>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
              alt={`facebook pixel ${id}`}
            />
          </noscript>
        ))}
      </Head>

      {/* ✅ سكربت موحد لتفعيل جميع البيكسلات على كل صفحات الموقع */}
      <Script
        id="fb-pixels-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            ${allPixels
              .map((id) => `fbq('init', '${id}'); fbq('track', 'PageView');`)
              .join('\n')}
          `,
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
        }}
      >
        <Header />
      </div>

      <Component {...pageProps} />

      <ToastContainer
        position="top-center"
        autoClose={4000}
        style={{ zIndex: 99999, marginTop: '80px' }}
      />

      <ContactSection />
      <WhatsAppButton />
      <NewsletterForm />
      <Footer />
    </div>
  );
}
