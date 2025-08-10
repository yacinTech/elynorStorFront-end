// components/WhatsAppButton.tsx
import React from 'react';
import { useRouter } from 'next/router';

export default function WhatsAppButton() {
  const router = useRouter();
  const whatsappNumber = '212646342598'; // عدل الرقم مع كود دولتك بدون + أو 00

  // تحديد الرسالة بناءً على الصفحة
  let message = 'مرحبا! أريد الاستفسار عن منتجاتكم.';
  if (router.pathname.startsWith('/product/')) {
    const slug = router.asPath.split('/').pop();
    if (slug) {
      const productName = decodeURIComponent(slug.replace(/-/g, ' '));
      message = `مرحبا! أريد الاستفسار عن المنتج: ${productName}`;
    }
  }

  const handleClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <>
      <button className="whatsapp-btn" onClick={handleClick} aria-label="تواصل عبر واتساب">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.63 6.07L0 24l5.99-1.57A11.91 11.91 0 0012 24c6.63 0 12-5.37 12-12 0-3.18-1.25-6.17-3.48-8.52zM12 21.82a9.68 9.68 0 01-4.94-1.44l-.35-.21-3.57.94.95-3.48-.22-.36A9.71 9.71 0 012.18 12c0-5.35 4.37-9.72 9.72-9.72 2.6 0 5.05 1.01 6.88 2.84a9.7 9.7 0 012.84 6.89c0 5.35-4.37 9.72-9.72 9.72zm5.3-7.4c-.29-.15-1.71-.84-1.97-.94-.26-.11-.45-.15-.64.15s-.73.94-.89 1.13c-.16.19-.33.21-.61.07a8.46 8.46 0 01-2.49-1.54 9.43 9.43 0 01-1.74-2.16c-.18-.3 0-.46.13-.61.13-.13.29-.33.44-.5a1.2 1.2 0 00.18-.3.34.34 0 000-.28c-.05-.1-.62-1.5-.85-2.06-.22-.54-.44-.47-.64-.48-.17 0-.37 0-.57 0s-.53.08-.8.39a3.34 3.34 0 00-1.17 2.89 5.47 5.47 0 001.58 2.92 11.9 11.9 0 005.38 4.33c.75.32 1.34.26 1.84.16a4.22 4.22 0 001.51-.92 4.21 4.21 0 001.24-1.53c.13-.24.13-.46.09-.5-.05-.03-.19-.08-.39-.15z" />
        </svg>
      </button>

      <style jsx>{`
        .whatsapp-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: #25d366;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(37, 211, 102, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 1000;
          animation: glow 2.5s infinite ease-in-out;
        }

        .whatsapp-btn:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 6px 15px rgba(37, 211, 102, 0.8);
          animation: none;
        }

        .whatsapp-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.8);
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(37, 211, 102, 0.6), 0 0 20px rgba(37, 211, 102, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(37, 211, 102, 1), 0 0 40px rgba(37, 211, 102, 0.7);
          }
        }
      `}</style>
    </>
  );
}
