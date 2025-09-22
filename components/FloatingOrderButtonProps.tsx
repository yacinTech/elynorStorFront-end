import { FaShoppingCart } from "react-icons/fa";

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
  // الدالة للتمرير إلى الفورم
  const scrollToForm = () => {
    const formElement = document.getElementById(`order-form-${product._id}`);
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* الزر العائم */}
      <button className="floating-order-btn" onClick={scrollToForm}>
        <FaShoppingCart className="icon" />
        <span>أطلب الآن</span>
      </button>

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

        @media (max-width: 480px) {
          .floating-order-btn {
            padding: 10px 14px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
