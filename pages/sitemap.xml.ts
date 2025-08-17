import { GetServerSideProps } from 'next';

const BASE_URL = 'https://elynor-store.vercel.app';
const API_PRODUCTS = 'https://elynor-store-020eb5c3d7a2.herokuapp.com/api/products';
const API_BLOG = 'https://elynor-store-020eb5c3d7a2.herokuapp.com/api/blog';

type Product = {
  _id: string;
  slug: string;
  updatedAt?: string;
  createdAt?: string;
};

type BlogPost = {
  _id: string;
  slug: string;
  updatedAt?: string;
  createdAt?: string;
};

const generateSitemap = (products: Product[], posts: BlogPost[]) => {
  const staticPages = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/category/الملابس والأزياء`,
    `${BASE_URL}/category/عناية شخصية`,
    `${BASE_URL}/category/الإلكترونيات`,
    `${BASE_URL}/category/منتجات%20الأطفال`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/blog`,
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
      <lastmod>${(product.updatedAt || product.createdAt || new Date()).toString()}</lastmod>
    </url>
  `).join('');

  const blogXml = posts.map(post => `
    <url>
      <loc>${BASE_URL}/blog/${post.slug}</loc>
      <lastmod>${(post.updatedAt || post.createdAt || new Date()).toString()}</lastmod>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticXml}
    ${productsXml}
    ${blogXml}
  </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // جلب المنتجات
    const responseProducts = await fetch(API_PRODUCTS);
    const products: Product[] = await responseProducts.json();

    // جلب المقالات
    const responsePosts = await fetch(API_BLOG);
    const posts: BlogPost[] = await responsePosts.json();

    const sitemap = generateSitemap(products, posts);

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
