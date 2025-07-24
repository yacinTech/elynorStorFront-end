import { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE } from '../../lib/api';

const BASE_URL = 'https://elynor-store.vercel.app';

type Product = {
  _id: string;
  slug: string;
};

function generateSiteMap(products: Product[]) {
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
      <loc>${BASE_URL}/${product.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticXml}
    ${productsXml}
  </urlset>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${API_BASE}`);
    const products: Product[] = await response.json();

    const sitemap = generateSiteMap(products);
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).end();
  }
}
