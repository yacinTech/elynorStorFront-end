// components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  _id: string;
  slug: string;  // أضفت هذا الحقل
  name: string;
  price: number;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <Link href={`/product/${product.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        {product.images?.length ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={180}
            style={{
              objectFit: 'cover',
              borderRadius: '6px',
              width: '100%',
              height: 'auto',
            }}
          />
        ) : (
          <div className="image-placeholder">لا توجد صورة</div>
        )}
        <h3>{product.name}</h3>
        <div className="price-badge">{product.price} درهم</div>
      </Link>

      <style jsx>{`
        .product-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: box-shadow 0.3s;
          width: 100%;
          max-width: 400px;
          margin: 8px auto;
          background-color: #fff;
        }

        .product-card:hover {
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
        }

        .image-placeholder {
          width: 100%;
          height: 180px;
          background-color: #eee;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #888;
        }

        h3 {
          margin-top: 10px;
          font-size: 1.1rem;
          color: #333;
        }

        .price-badge {
          display: inline-block;
          margin-top: 8px;
          background-color: #f9f3e9;
          color: #c97b00;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.95rem;
          border: 1px solid #f0e0c0;
        }

        @media (max-width: 640px) {
          .product-card {
            max-width: 95%;
            margin: 8px auto;
          }
        }
      `}</style>
    </div>
  );
}
