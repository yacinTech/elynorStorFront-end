import { useState } from "react";
import OrderForm from "./order";
import { FaShoppingCart } from "react-icons/fa";
import { FiX } from "react-icons/fi";

interface FloatingOrderButtonProps {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: string;
  productCategory: string;
  colors?: string[];
}

export default function FloatingOrderButton({
  productId,
  productName,
  productImage,
  productPrice,
  productCategory,
  colors = []
}: FloatingOrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* الزر العائم */}
      <button onClick={() => setOpen(true)} className="floating-order-btn">
        <FaShoppingCart className="icon" />
        <span>أطلب الآن</span>
      </button>

      {/* النافذة المنبثقة */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setOpen(false)}>
              <FiX />
            </button>

            {/* بطاقة المنتج الاحترافية */}
            <div className="product-card">
              <img src={productImage} alt={productName} />
              <div className="product-info">
                <h3 className="product-name">{productName}</h3>
                <p className="product-price">السعر: <span>{productPrice}</span></p>
                <p className="product-category">التصنيف: <span>{productCategory}</span></p>
              </div>
            </div>

            {/* الفورم */}
            <div className="modal-body">
              <OrderForm
                productId={productId}
                productName={productName}
                colors={colors}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* زر الطلب العائم */
        .floating-order-btn {
          position: fixed;
          bottom: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3182ce, #2c6cc1);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 18px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          animation: bounce 2s infinite;
          z-index: 9999;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .floating-order-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .floating-order-btn .icon {
          font-size: 1.2rem;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* نافذة المودال */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 100px; /* لتفادي الهيدر وTopbanner */
          z-index: 10000;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .modal-content {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 20px;
          width: 90%;
          max-width: 600px;
          max-height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.4s ease;
        }

        .modal-body {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 6px;
        }

        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #555;
          z-index: 10;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #000;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* بطاقة المنتج الاحترافية */
        .product-card {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding: 14px 20px;
          width: 100%;
          border-radius: 16px;
          background: linear-gradient(120deg, #e0f7fa, #ffffff);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #b2ebf2;
        }

        .product-card img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #81d4fa;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0277bd;
          margin-bottom: 4px;
        }

        .product-price span {
          font-weight: 600;
          color: #d32f2f;
        }

        .product-price,
        .product-category {
          font-size: 0.95rem;
          margin: 2px 0;
          color: #555;
        }

        .product-category span {
          font-weight: 500;
          color: #00796b;
        }

        /* تجاوب الشاشة الصغيرة */
        @media (max-width: 480px) {
          .modal-content {
            max-width: 95%;
            padding: 15px;
            border-radius: 12px;
          }

          .floating-order-btn {
            padding: 10px 14px;
            font-size: 0.9rem;
          }

          .close-btn {
            font-size: 1.5rem;
          }

          .product-card {
            flex-direction: row;
            padding: 10px 12px;
          }

          .product-card img {
            width: 60px;
            height: 60px;
          }

          .product-name {
            font-size: 1rem;
          }

          .product-price,
          .product-category {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}
