// components/SEO.tsx
import Head from 'next/head';

export default function SEO() {
       const keywords = 'متجر, تسوق, إلكتروني, ملابس, إلكترونيات, أدوات منزلية';

  return (
     <Head>
        <title>متجر ELYNOR - أفضل المنتجات المختارة</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="اكتشف تشكيلة مميزة من المنتجات في متجر Elynor - ملابس، إلكترونيات، أدوات منزلية وأكثر!" />
        <meta name="keywords" content={keywords} />
        <meta property="og:url" content="https://elynor-store.vercel.app/" />
        <meta property="og:title" content="متجر ELYNOR - أفضل المنتجات المختارة" />
        <meta property="og:description" content="اكتشف تشكيلة مميزة من المنتجات في متجر Elynor - ملابس، إلكترونيات، أدوات منزلية وأكثر!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elynor-store.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J90YN8P50R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J90YN8P50R');
            `,
          }}
        />
      </Head>
  );
}
