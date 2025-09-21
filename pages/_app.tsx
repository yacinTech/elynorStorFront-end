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
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const category = decodeURIComponent(
    typeof router.query.category === 'string'
      ? router.query.category
      : router.query.category?.[0] || ''
  );

  const slug = decodeURIComponent(
    typeof router.query.slug === 'string'
      ? router.query.slug
      : router.query.slug?.[0] || ''
  );

  // 🟣 الشروط
  const isKidsCategory =
    router.pathname === '/category/[category]' && category === 'منتجات الأطفال';

  const isProductsForPixel2 = [
    'ensemble-de-sacs-5-en-1',
    'ensemble-de-sacs-scolaires',
  ].includes(slug);

  const shouldFireSecondPixel = isKidsCategory || isProductsForPixel2;

  const isSportsCategory =
    router.pathname === '/category/[category]' && category === 'الرياضة والرحلات';

  const isProductsForPixel1 = [
    'chaise-de-camping-avec-parasol',
    'chaise-de-plage-et-sorties',
    'camping-tent-mltr',
    'chaise-de-plage',
    'table-pliante-portable',
  ].includes(slug);

  const shouldFireFirstPixel = isSportsCategory || isProductsForPixel1;

  const isProductsForPixel3 = [
    'ventilateur-vertical',
    'mkyf-hwaey-mhmwl-brwdh-mtnqlh-aynma-knt!',
  ].includes(slug);
  const shouldFireThirdPixel = isProductsForPixel3;

  const isProductsForPixel5 = [
    'organisateur-des-chaussures',
    'etagere-rotative',
    'organisateur-de-chaussures',
    'organisateur-de-cuisine',
    'etagere-dangle-extensible',
    'rf-alahthyh-mtadd-alastkhdamat',
    'alaqh-alfwtat-mn-alanwks-alsafy-walghyr-qabl-llsda',
    'etagere-extensible-en-metal',
    'etagere',
  ].includes(slug);

  const shouldFireFifthPixel = isProductsForPixel5;
  const isShoeOrganizerPage = slug === 'organisateur-des-chaussures';
  const isEtagerPage = slug === 'etagere';

  // 🟢 IDs للبيكسلات
  const pixels: { [key: string]: string } = {
    first: '2833863817001070',
    second: '610812365430824',
    third: '1089901202646915',
    fifth: '738455789097119',
    etager: '662892656149516',
    custom: '753759500831707',
    last: '632899916325860',
    shoe: '1169655271681082',
  };

  // 🟡 لائحة البيكسلات التي ستشتغل حسب الشرط
  const activePixels: string[] = [];
  if (shouldFireFirstPixel) activePixels.push(pixels.first);
  if (shouldFireSecondPixel) activePixels.push(pixels.second);
  if (shouldFireThirdPixel) activePixels.push(pixels.third);
  if (shouldFireFifthPixel) activePixels.push(pixels.fifth);
  if (isEtagerPage) activePixels.push(pixels.etager);
  if (isProductsForPixel5) activePixels.push(pixels.custom, pixels.last);
  if (isShoeOrganizerPage) activePixels.push(pixels.shoe);

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

        {/* noscript لجميع البيكسلات النشيطة */}
        {activePixels.map((id) => (
          <noscript key={id}>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
              alt={`fb pixel ${id}`}
            />
          </noscript>
        ))}

        <link
          rel="icon"
          href="https://elynor-store.vercel.app/og-image.jpg"
          type="image/jpeg"
        />
      </Head>

      {/* ✅ تحميل مكتبة البيكسل مرة وحدة */}
      {activePixels.length > 0 && (
        <Script
          id="facebook-pixel-loader"
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
              }(window, document,'script');
              
              ${activePixels
                .map((id) => `fbq('init', '${id}'); fbq('track', 'PageView');`)
                .join('\n')}
            `,
          }}
        />
      )}

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
