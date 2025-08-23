// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
}

// دالة لتحويل رابط الصورة تلقائياً إلى WebP/ضغط ذكي إذا كانت على Cloudinary
function optimizeImage(url: string) {
  return url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;
}

export default function ProductCard({ product }: { product: Product }) {
  const oldPrice = Math.round(product.price * 1.4); // السعر قبل الخصم

  return (
    <div className="product-card">
      <Link
        href={`/product/${product.slug}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {product.images?.length ? (
          <div className="image-container">
            <Image
              src={optimizeImage(product.images[0])}
              alt={product.name}
              width={300}
              height={300}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ) : (
          <div className="image-placeholder">لا توجد صورة</div>
        )}

        <h3>{product.name}</h3>

        <div className="price-wrapper">
          <span className="old-price">{oldPrice} درهم</span>
          <span className="new-price">{product.price} درهم</span>
        </div>
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

        .image-container {
          width: 100%;
          height: 200px;
          background: #f9f9f9;
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .image-placeholder {
          width: 100%;
          height: 200px;
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

        .price-wrapper {
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }

        .old-price {
          font-size: 0.85rem;
          color: #888;
          text-decoration: line-through;
        }

        .new-price {
          background: linear-gradient(135deg, #4ade80, #22d3ee);
          color: #fff;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 0.85rem;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .new-price:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* شاشات صغيرة */
        @media (max-width: 640px) {
          .product-card {
            max-width: 95%;
            margin: 8px auto;
          }

          h3 {
            font-size: 0.75rem;
          }

          .price-wrapper {
            gap: 8px;
          }

          .new-price {
            font-size: 0.75rem;
            padding: 3px 8px;
            border-radius: 6px;
          }

          .old-price {
            font-size: 0.65rem;
          }

          .image-container,
          .image-placeholder {
            height: 160px; /* أصغر قليلاً على الهاتف */
          }
        }
      `}</style>
    </div>
  );
}
