import React from 'react';
import { FaTruck, FaHeadset, FaPercent, FaStar, FaGift } from 'react-icons/fa';

const phrases = [
  { icon: <FaTruck style={{ marginLeft: 8, color: '#A5D8FF' }} aria-hidden="true" />, text: 'التوصيل مجاني لجميع الطلبات' },
  { icon: <FaHeadset style={{ marginLeft: 8, color: '#A5D8FF' }} aria-hidden="true" />, text: 'خدمة الزبائن متوفرة 24 ساعة' },
  { icon: <FaPercent style={{ marginLeft: 8, color: '#A5D8FF' }} aria-hidden="true" />, text: 'خصومات تصل إلى 50% على المنتجات المختارة' },
  { icon: <FaStar style={{ marginLeft: 8, color: '#A5D8FF' }} aria-hidden="true" />, text: 'جودة عالية وأسعار منافسة' },
  { icon: <FaGift style={{ marginLeft: 8, color: '#A5D8FF' }} aria-hidden="true" />, text: 'اشترك الآن واحصل على عروض حصرية' },
];

export default function TopBanner() {
  return (
    <>
      <div className="top-banner">
        <div className="scrolling-text">
          {phrases.map((item, index) => (
            <span key={index} className="phrase">
              {item.icon}
              {item.text}
              <span className="separator">•</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .top-banner {
          position: relative;
          width: 100%;
          background-color: #6d28d9;
          color: white;
          font-weight: 600;
          padding: 10px 0;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1rem;
          direction: rtl;
          z-index: 1;
          margin-bottom: 10px;
        }

        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
          animation: scrollLeft 20s linear infinite;
        }

        .phrase {
          margin: 0 1.5rem;
          display: inline-flex;
          align-items: center;
        }

        .phrase svg {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .separator {
          margin: 0 1rem;
          color: rgba(255, 255, 255, 0.6);
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @media (max-width: 600px) {
          .top-banner {
            font-size: 0.85rem;
            padding: 8px 0;
          }
          .phrase {
            margin: 0 1rem;
          }
          .separator {
            margin: 0 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
