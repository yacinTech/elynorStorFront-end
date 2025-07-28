import { GetServerSideProps } from 'next';

const BASE_URL = 'https://elynor-store.vercel.app';
const API_BASE = 'https://elynor-store-020eb5c3d7a2.herokuapp.com/api/products';

type Product = {
  _id: string;
  slug: string;
};

const generateSitemap = (products: Product[]) => {
  const staticPages = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/category/الملابس والأزياء`,
    `${BASE_URL}/category/عناية شخصية`,
    `${BASE_URL}/category/الإلكترونيات`,
    `${BASE_URL}/category/منتجات%20الأطفال`,
    `${BASE_URL}/privacy`,
  ];

  const staticXml = staticPages.map(url => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('');

  const productsXml = products.map(product => `
    <url>
      <loc>${BASE_URL}/product/${product.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticXml}
    ${productsXml}
  </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await fetch(API_BASE);
    const products: Product[] = await response.json();

    const sitemap = generateSitemap(products);

    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Sitemap error:', error);
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
