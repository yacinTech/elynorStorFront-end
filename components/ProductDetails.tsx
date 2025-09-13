import React from "react";
import ProductSlider from "./ProductSlider";


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  colors?: string[];
  reviews?: { user: string; comment: string; rating: number }[];
}

interface ProductDetailsProps {
  product: Product;
}

const parseSimpleMarkup = (text: string) => {
  return text.replace(/\n/g, "<br/>");
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <main className="product-main">
      {/* غلاف الصور + الوصف */}
      <div className="product-layout">
        <div className="product-slider">
          <ProductSlider images={product.images || []} />
        </div>

        <section className="product-info">
          <h2>{product.name}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: parseSimpleMarkup(product.description),
            }}
          />
          <p className="price">
            <span className="old">{Math.round(product.price * 1.4)} درهم</span>
            <span>{product.price} درهم</span>
          </p>
          <p className="category">التصنيف: {product.category}</p>
        </section>
      </div>

     
      {/* ✅ CSS مدمج */}
      <style jsx>{`
        .product-main {
          max-width: 1100px;
          margin: 20px auto 60px;
          padding: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 0;
        }

        .product-layout {
          display: block; /* الوضع العادي على الموبايل */
        }

        .product-slider {
          margin-bottom: 20px;
        }

        .product-info {
          background: #f9f9f9;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          font-family: "Segoe UI", sans-serif;
          text-align: right;
        }

        .product-info h2 {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 12px;
          color: #333;
          text-align: center;
        }

        .product-info p {
          font-size: 1rem;
          color: #444;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #e60023;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: center;
        }

        .price .old {
          text-decoration: line-through;
          color: #999;
          font-weight: normal;
          font-size: 1rem;
        }

        .category {
          color: #007bff;
          text-align: center;
        }

        /* ✅ على الشاشات الكبيرة فقط */
        @media (min-width: 992px) {
          .product-layout {
            display: flex;
            gap: 30px;
            align-items: flex-start;
          }

          .product-slider {
            flex: 0 0 45%; /* السلايدر أصغر قليلاً */
          }

          .product-info {
            flex: 1; /* الوصف يأخذ المساحة المتبقية */
          }
        }
      `}</style>
    </main>
  );
};

export default ProductDetails;
