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

  const isKidsCategory =
    router.pathname === '/category/[category]' && category === 'منتجات الأطفال';

  const isProductsForPixel2 = [
    'ensemble-de-sacs-5-en-1',
    'ensemble-de-sacs-scolaires',
  ].includes(slug);

  const shouldFireSecondPixel = isKidsCategory || isProductsForPixel2;

  // 🟣 البيكسل الأول فقط لهذه الصفحات:
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

  // 🟢 البيكسل الثالث فقط لهاتين الصفحتين:
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
        {/* noscript لكل من البيكسلين */}
        {shouldFireFirstPixel && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=2833863817001070&ev=PageView&noscript=1"
              alt="fb pixel"
            />
          </noscript>
        )}
        {shouldFireSecondPixel && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=610812365430824&ev=PageView&noscript=1"
              alt="fb pixel 2"
            />
          </noscript>
        )}
        {shouldFireThirdPixel && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1089901202646915&ev=PageView&noscript=1"
              alt="fb pixel 3"
            />
          </noscript>
        )}
        <link
          rel="icon"
          href="https://elynor-store.vercel.app/og-image.jpg"
          type="image/jpeg"
        />
      </Head>

      {/* ✅ البيكسل الأول حسب الصفحات المحددة فقط */}
      {shouldFireFirstPixel && (
        <Script
          id="meta-pixel-main"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script');
              fbq('init', '2833863817001070');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* ✅ البيكسل الثاني حسب الصفحات المحددة فقط */}
      {shouldFireSecondPixel && (
        <Script
          id="meta-pixel-second"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script');
              fbq('init', '610812365430824');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* ✅ البيكسل الثالث حسب الصفحات المحددة فقط */}
      {shouldFireThirdPixel && (
        <Script
          id="meta-pixel-third"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script');
              fbq('init', '1089901202646915');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

    

 {/* ✅ البيكسل الخامس (738455789097119) */} 
{shouldFireFifthPixel && (
  <>
    <Script
      id="meta-pixel-fifth"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src='https://connect.facebook.net/en_US/fbevents.js';
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script');
          fbq('init', '738455789097119');
          fbq('track', 'PageView');
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=738455789097119&ev=PageView&noscript=1"
        alt="fb pixel fifth"
      />
    </noscript>
  </>
)}





{isEtagerPage && (
  <>
    <Script
      id="meta-pixel-etager"
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
          
          fbq('init', '662892656149516'); 
          fbq('track', 'PageView');
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=662892656149516&ev=PageView&noscript=1"
        alt="fb pixel etager"
      />
    </noscript>
  </>
)}

{/* ✅ البيكسل المخصص (753759500831707) */}
{isProductsForPixel5 && (
  <>
    <Script
      id="meta-pixel-custom"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){
              n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)
            };
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  
          fbq('init', '753759500831707'); 
          fbq('track', 'PageView');
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=753759500831707&ev=PageView&noscript=1"
        alt="fb pixel custom"
      />
    </noscript>
  </>
)}



{isProductsForPixel5 && (
  <>
    <Script
      id="meta-pixel-last"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (typeof fbq === 'function') {
            fbq('init', '632899916325860'); 
            fbq('track', 'PageView');
          }
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=632899916325860&ev=PageView&noscript=1"
        alt="fb pixel last"
      />
    </noscript>
  </>
)}


{isShoeOrganizerPage && (
  <>
    <Script
      id="facebook-pixel-5"
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
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
          fbq('init', '1169655271681082');
          fbq('track', 'PageView');
        `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=1169655271681082&ev=PageView&noscript=1"
        alt="facebook pixel"
      />
    </noscript>
  </>
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
