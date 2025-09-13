// components/ProductGrid.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface Product {
  slug: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) return <p>لا توجد منتجات في هذا التصنيف.</p>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <Link key={product._id} href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="product-card">
            <div className="image-wrapper">
              <Image
                src={product.images[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3>{product.name}</h3>
            <div className="price">
              <span className="old-price">{Math.round(product.price * 1.4)} درهم</span>
              <span className="current-price">{product.price} درهم</span>
            </div>
          </div>
        </Link>
      ))}

      <style jsx>{`
        .product-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          padding: 0 12px;
        }

        .product-card {
          width: 48%; /* بطاقتين جنبًا إلى جنب على الهواتف الصغيرة */
          border: 1px solid #eee;
          border-radius: 12px;
          background-color: #fff;
          padding: 8px;
          margin-bottom: 12px;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 120px;
          border-radius: 10px;
          margin-bottom: 6px;
          overflow: hidden;
        }

        h3 {
          margin: 0 0 4px;
          font-size: 0.85rem;
          color: #222;
        }

        .price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .old-price {
          font-size: 0.7rem;
          color: #999;
          text-decoration: line-through;
        }

        .current-price {
          background-color: #f9f3e9;
          color: #c97b00;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 16px;
          font-size: 0.75rem;
          border: 1px solid #f0e0c0;
        }

        /* الشاشات المتوسطة */
        @media (min-width: 641px) and (max-width: 1024px) {
          .product-card {
            width: 32%;
          }
        }

        /* الشاشات الكبيرة */
        @media (min-width: 1025px) {
          .product-card {
            width: 23%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;
