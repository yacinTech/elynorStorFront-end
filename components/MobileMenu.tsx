import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  categories: string[];
  extraLinks: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenu({ categories, extraLinks, onClose }: MobileMenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // منع تمرير الصفحة عند فتح القائمة
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="mobile-menu-overlay" onClick={handleClose}>
      <nav
        className={`mobile-menu ${isVisible ? 'slide-in' : 'slide-out'}`}
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleClose} aria-label="إغلاق القائمة">
          ×
        </button>
        <ul>
          <li className="section-title">الرئيسية</li>
          <li key="الرئيسية">
            <Link href="/" legacyBehavior>
              <a onClick={handleClose}>الرئيسية</a>
            </Link>
          </li>

          <li className="section-title">معلومات</li>
          {extraLinks
            .filter(link => link.name !== 'الرئيسية')
            .map(link => (
              <li key={link.name}>
                <Link href={link.href} legacyBehavior>
                  <a onClick={handleClose}>{link.name}</a>
                </Link>
              </li>
            ))}

          <li className="section-title">التصنيفات</li>
          {categories.map(cat => (
            <li key={cat}>
              <Link href={`/category/${encodeURIComponent(cat)}`} legacyBehavior>
                <a onClick={handleClose}>{cat}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 1500;
          display: flex;
          justify-content: flex-end;
          backdrop-filter: blur(4px);
          transition: background 0.3s ease;
        }

        .mobile-menu {
          background: #fff;
          width: 80%;
          max-width: 320px;
          height: 100vh;
          padding: 16px 16px; /* تصغير الحشو */
          box-shadow: -4px 0 12px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch; /* سلاسة التمرير في iOS */
            overscroll-behavior: contain; /* يمنع التأثير على الصفحة الرئيسية */
  touch-action: pan-y; /* يسمح بالسحب العمودي */
  position: fixed; /* تأكد من ثباتها */
        }

        .slide-in {
          transform: translateX(0);
        }

        .slide-out {
          transform: translateX(100%);
        }

        .close-btn {
          font-size: 2rem; /* تصغير حجم الزر */
          background: none;
          border: none;
          align-self: flex-end;
          cursor: pointer;
          margin-bottom: 20px; /* تقليل المسافة */
          color: #444;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #f06595;
        }

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px; /* تم تقليله */
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

ul li {
  font-size: 0.95rem; /* بدل 1rem */
  padding: 8px 12px;  /* بدل 12px أو أكثر */
  font-weight: 500;   /* أو 400 حسب الشكل */
}

        .section-title {
          font-weight: 700;
          font-size: 1rem; /* تصغير الخط */
          color: #8e44ad;
          border-bottom: 2px solid #f06595;
          padding-bottom: 4px; /* تقليل الحشو */
          margin-bottom: 6px; /* تقليل المسافة */
          user-select: none;
        }

        li a {
          color: #333;
          font-weight: 600;
          font-size: 0.95rem; /* تصغير الخط */
          text-decoration: none;
          padding: 6px 6px; /* تقليل الحشو */
          display: block;
          border-radius: 6px;
          transition: background-color 0.2s ease, color 0.2s ease;
          white-space: nowrap; /* اجعل النص في سطر واحد لمنع كسر النص */
          overflow: hidden;
          text-overflow: ellipsis;
        }

        li a:hover {
          background-color: #fce4ec;
          color: #f06595;
        }

        /* Scrollbar for nice UX */
        .mobile-menu::-webkit-scrollbar {
          width: 6px; /* تصغير عرض scrollbar */
        }
        .mobile-menu::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .mobile-menu::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }
        .mobile-menu::-webkit-scrollbar-thumb:hover {
          background: #b39ddb;
        }
      `}</style>
    </div>
  );
}
