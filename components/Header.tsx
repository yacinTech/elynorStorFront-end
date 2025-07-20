import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import Image from 'next/image';


export default function Header() {
  const [categories] = useState<string[]>([
    'الإلكترونيات',
    'المنزل والمطبخ',
    'الملابس والأزياء',
    'عناية شخصية',
    
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // الروابط الإضافية
  const extraLinks = [
    { name: 'من نحن', href: '/about' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'تواصل معنا', href: "#newsletter" },
  ];

  return (
    <>
      <header className="main-header">
        {/* الشعار */}
        <div className="logo-container">
          <Link href="/" legacyBehavior>
            <a className="logo-link">
              <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  unoptimized // فقط إذا أردت إلغاء تحسينات Next.js مؤقتًا
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #ddd',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    marginRight: '12px',
                  }}
                />



              <span className="store-name">ELYNOR</span>
            </a>
          </Link>
        </div>

        {/* قائمة سطح المكتب */}
        <nav className="desktop-nav">
          {[...categories, ...extraLinks.map(link => link.name)].map((item) => {
            // تحقق إذا العنصر من التصنيفات أو من الروابط الإضافية
            const linkObj = extraLinks.find(link => link.name === item);
            const href = linkObj ? linkObj.href : `/category/${encodeURIComponent(item)}`;

            return (
              <Link key={item} href={href} legacyBehavior>
                <a className="nav-link">{item}</a>
              </Link>
            );
          })}
        </nav>

        {/* زر القائمة للجوال */}
        <button
          aria-label="فتح القائمة"
          onClick={() => setMobileMenuOpen(true)}
          className="mobile-menu-button"
        >
          ☰
        </button>
      </header>

      {/* القائمة الجانبية للجوال */}
      {mobileMenuOpen && (
        <MobileMenu
          categories={categories}
          extraLinks={extraLinks}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .main-header {
          padding: 12px 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid #ddd;
          object-fit: cover;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-right: 12px;
        }

        .store-name {
          font-weight: bold;
          font-size: 1.5rem;
          color: #222;
        }

        .desktop-nav {
          display: flex;
        }

        .nav-link {
          margin-left: 20px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.3s, border-bottom 0.3s;
          padding-bottom: 4px;
        }

        .nav-link:hover {
          color: #0070f3;
          border-bottom: 2px solid #0070f3;
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #333;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
