import React from 'react';
import { FaTruck, FaHeadset, FaPercent, FaStar, FaGift } from 'react-icons/fa';

const phrases = [
  { icon: <FaTruck style={{ marginLeft: 8, color: '#A5D8FF' }} />, text: 'التوصيل مجاني لجميع الطلبات' },
  { icon: <FaHeadset style={{ marginLeft: 8, color: '#A5D8FF' }} />, text: 'خدمة الزبائن متوفرة 24 ساعة' },
  { icon: <FaPercent style={{ marginLeft: 8, color: '#A5D8FF' }} />, text: 'خصومات تصل إلى 50% على المنتجات المختارة' },
  { icon: <FaStar style={{ marginLeft: 8, color: '#A5D8FF' }} />, text: 'جودة عالية وأسعار منافسة' },
  { icon: <FaGift style={{ marginLeft: 8, color: '#A5D8FF' }} />, text: 'اشترك الآن واحصل على عروض حصرية' },
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
          width: 100%;
          height: 52px;
          background-color: #6d28d9;
          color: white;
          overflow: hidden;
          font-weight: 600;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1rem;
          direction: rtl;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          padding-top: 4px; /* لإنزال النص قليلاً */
        }

        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
          animation: scrollLeft 30s linear infinite; /* ⬅ تقليل السرعة */
        }

        .phrase {
          margin: 0 1.5rem;
          display: inline-flex;
          align-items: center;
        }

        .phrase svg {
          font-size: 1.2rem;
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
            height: 48px;
            font-size: 0.85rem;
            padding-top: 6px;
          }

          .scrolling-text {
            animation: scrollLeft 20s linear infinite; /* ⬅ سرعة أبطأ من السابق */
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
