// pages/server-sitemap.xml.ts

import { GetServerSideProps } from 'next';
// Update the import path to the correct relative path
import { API_BASE } from '../lib/api';

const BASE_URL = 'https://elynor-store.vercel.app';

function generateSiteMap(products: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${products
      .map((product) => {
        return `
          <url>
            <loc>${BASE_URL}/product/${product._id}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>
        `;
      })
      .join('')}
  </urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();

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
