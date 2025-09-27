import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa"; // أيقونة النار

interface Product {
  price: number;
}

interface PriceBoxProps {
  product: Product;
}

const PriceBox: React.FC<PriceBoxProps> = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60); // 4 ساعات بالثواني

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        border: "2px solid #ff1744",
        borderRadius: "14px",
        padding: "12px 18px",
        maxWidth: "260px",
        margin: "20px auto",
        background: "linear-gradient(135deg, #fff, #ffe6e9)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* العداد التنازلي */}
      <div
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          color: "#d32f2f",
        }}
      >
        <FaFire className="fire-icon" />
        العرض ينتهي خلال {formatTime(timeLeft)}
      </div>

      {/* الثمن */}
      <p
        style={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: "#c2185b",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          margin: "0",
        }}
      >
        <span
          style={{
            textDecoration: "line-through",
            color: "#999",
            fontWeight: "normal",
            fontSize: "0.9rem",
          }}
        >
          {Math.round(product.price * 1.4)} درهم
        </span>
        <span
          className="highlight-price"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#e60023",
          }}
        >
          {product.price} درهم
        </span>
      </p>

      {/* أنيميشن CSS */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          .fire-icon {
            font-size: 1.4rem;
            color: #ff5722;
            animation: bounce 1.5s infinite;
          }

          .highlight-price {
            animation: pulse 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PriceBox;
