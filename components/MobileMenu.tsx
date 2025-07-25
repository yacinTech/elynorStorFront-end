import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  categories: string[];
  extraLinks: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenu({ categories, extraLinks, onClose }: MobileMenuProps) {
  const [isVisible, setIsVisible] = useState(false);

  // لتفعيل الانزلاق السلس عند الظهور
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // لإخفاء القائمة بسلاسة قبل اغلاقها
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // مدة الانزلاق متطابقة مع CSS transition
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
          {/* القسم الأول: الرئيسية */}
          <li className="section-title">الرئيسية</li>
          <li key="الرئيسية">
            <Link href="/" legacyBehavior>
              <a onClick={handleClose}>الرئيسية</a>
            </Link>
          </li>

          {/* القسم الثاني: روابط إضافية */}
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

          {/* القسم الثالث: التصنيفات */}
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
          padding: 24px 20px;
          box-shadow: -4px 0 12px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
        }

        .slide-in {
          transform: translateX(0);
        }

        .slide-out {
          transform: translateX(100%);
        }

        .close-btn {
          font-size: 2.5rem;
          background: none;
          border: none;
          align-self: flex-end;
          cursor: pointer;
          margin-bottom: 30px;
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
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .section-title {
          font-weight: 700;
          font-size: 1.2rem;
          color: #8e44ad;
          border-bottom: 2px solid #f06595;
          padding-bottom: 6px;
          margin-bottom: 10px;
          user-select: none;
        }

        li a {
          color: #333;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          padding: 8px 4px;
          display: block;
          border-radius: 6px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        li a:hover {
          background-color: #fce4ec;
          color: #f06595;
        }

        /* Scrollbar for nice UX */
        .mobile-menu::-webkit-scrollbar {
          width: 8px;
        }
        .mobile-menu::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .mobile-menu::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
        .mobile-menu::-webkit-scrollbar-thumb:hover {
          background: #b39ddb;
        }
      `}</style>
    </div>
  );
}
