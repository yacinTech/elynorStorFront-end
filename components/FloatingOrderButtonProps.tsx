import { useState } from "react";
import OrderForm from "./order";
import { FaShoppingCart } from "react-icons/fa";
import { FiX } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  colors?: string[];
}

interface FloatingOrderButtonProps {
  product: Product;
}

export default function FloatingOrderButton({ product }: FloatingOrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* الزر العائم */}
      <button className="floating-order-btn" onClick={() => setOpen(true)}>
        <FaShoppingCart className="icon" />
        <span>أطلب الآن</span>
      </button>

      {/* النافذة المنبثقة */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* زر الإغلاق في أعلى يمين النافذة */}
            <button className="close-btn" onClick={() => setOpen(false)}>
              <FiX />
            </button>

            {/* بطاقة المنتج */}
            <div className="product-card">
              <img src={product.image || "/placeholder.png"} alt={product.name} />
              <div className="product-info">
                <div className="info-row">
                  <span className="label">المنتج:</span>
                  <span className="value">{product.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">السعر:</span>
                  <span className="value">{product.price} درهم</span>
                </div>
                <div className="info-row">
                  <span className="label">التصنيف:</span>
                  <span className="value">{product.category}</span>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div className="info-row">
                    <span className="label">الألوان المتاحة:</span>
                    <span className="value">{product.colors.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* الفورم */}
            <div className="modal-body">
              <OrderForm
                productId={product._id}
                productName={product.name}
                colors={product.colors || []}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 120px;
          z-index: 10000;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .modal-content {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 20px;
          width: 95%;
          max-width: 650px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.4s ease;
        }

        .modal-body {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 6px;
        }

        /* زر الإغلاق في أعلى يمين النافذة */
        .close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f56565;
  color: #fff; /* لون الأيقونة */
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem; /* حجم الأيقونة */
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: background 0.2s ease, transform 0.2s ease;
}

.close-btn:hover {
  background: #e53e3e;
  transform: scale(1.1);
}


        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* بطاقة المنتج */
        .product-card {
          display: flex;
          flex-direction: row-reverse; /* الصورة على اليمين */
          align-items: stretch; /* يجعل الطول متساوي */
          gap: 16px;
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 12px;
          background: linear-gradient(120deg, #f0f4ff, #e0ebff);
          border: 1px solid #c3d0f0;
          width: 100%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .product-card img {
          width: 100px;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #b0c4ff;
        }

        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          min-height: 100%;
        }

        .info-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .label {
          font-weight: 600;
          color: #2b6cb0;
        }

        .value {
          color: #1a202c;
        }

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
            width: 32px;
            height: 32px;
            font-size: 1.3rem;
            top: -16px;
            right: -16px;
          }

          .product-card {
            flex-direction: row-reverse;
            align-items: stretch;
          }

          .product-card img {
            width: 80px;
            height: auto;
          }

          .product-info {
            min-height: auto;
          }

          .info-row {
            flex-wrap: wrap;
          }

          .label {
            font-size: 0.85rem;
          }
          .value {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}
