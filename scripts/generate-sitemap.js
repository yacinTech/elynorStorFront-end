const fs = require('fs');
const fetch = require('node-fetch');

async function generateSitemapPaths() {
  const res = await fetch('https://elynor-store.vercel.app/api/products'); // تأكد أن هذا يرجع جميع المنتجات
  const products = await res.json();

  const paths = products.map((product) => ({
    loc: `/product/${product._id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  }));

  const sitemapConfig = {
    siteUrl: 'https://elynor-store.vercel.app',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    additionalPaths: async () => paths,
  };

  const configString = `module.exports = ${JSON.stringify(sitemapConfig, null, 2)};`;

  fs.writeFileSync('next-sitemap.config.js', configString);
  console.log('✅ next-sitemap.config.js updated with product URLs');
}

generateSitemapPaths();
