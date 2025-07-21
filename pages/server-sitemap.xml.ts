import { GetServerSideProps } from 'next';
import { API_BASE } from '../lib/api';

const BASE_URL = 'https://elynor-store.vercel.app';

type Product = {
  _id: string;
};

function generateSiteMap(products: Product[]) {
  // روابط الصفحات الثابتة التي تريد تضمينها في السايت ماب
  const staticPages = [
    { loc: `${BASE_URL}/` }, // الصفحة الرئيسية
    { loc: `${BASE_URL}/about` }, // صفحة من نحن
    { loc: `${BASE_URL}/category/الملابس والأزياء` }, // مثال صفحة تصنيف ثابتة
    { loc: `${BASE_URL}/category/عناية شخصية` },
     { loc: `${BASE_URL}/category/الإلكترونيات` },
    { loc: `${BASE_URL}/category/منتجات%20الأطفال` },
    { loc: `${BASE_URL}/privacy` },
  ];

  // بناء روابط الصفحات الثابتة بصيغة XML
  const staticPagesXml = staticPages.map(page => `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('');

  // بناء روابط صفحات المنتجات كما هو عندك
  const productsXml = products.map(product => `
    <url>
      <loc>${BASE_URL}/${product._id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('');

  // جمع كل الروابط معاً في ملف السايت ماب
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPagesXml}
    ${productsXml}
  </urlset>`;
}



export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await fetch(`${API_BASE}`);
    const products: Product[] = await response.json();

    const sitemap = generateSiteMap(products);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
  }

  return {
    props: {},
  };
};

export default function SiteMap() {
  return null;
}
