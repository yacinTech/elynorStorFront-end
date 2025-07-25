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
    'منتجات الأطفال',
    'الرياضة والرحلات',
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const extraLinks = [
    { name: 'الرئيسية', href: '/' }, // تمت إضافته
    { name: 'من نحن', href: '/about' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <>
      {/* القسم العلوي */}
      <header className="main-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" legacyBehavior>
            <a
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Image
                src="/og-image.jpg"
                alt="Logo"
                width={60}
                height={60}
                unoptimized
                style={{
                  borderRadius: '50%',
                  border: `2px solid ${hovered ? '#f06595' : '#ddd'}`,
                  boxShadow: hovered
                    ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                    : '0 2px 5px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  marginRight: '12px',
                  transform: hovered ? 'scale(1.1) rotate(2deg)' : 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
              />
              <span className="store-name">ELYNOR</span>
            </a>
          </Link>
        </div>

        {/* روابط القسم العلوي */}
        <nav className="desktop-nav">
          {extraLinks.map((link) => (
            <Link key={link.name} href={link.href} legacyBehavior>
              <a className="nav-link">{link.name}</a>
            </Link>
          ))}
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

      {/* القسم السفلي (للتصنيفات فقط) */}
      <div className="category-bar">
        <nav className="desktop-nav">
          {categories.map((item) => (
            <Link key={item} href={`/category/${encodeURIComponent(item)}`} legacyBehavior>
              <a className="nav-link">{item}</a>
            </Link>
          ))}
        </nav>
      </div>

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

        .category-bar {
          background-color: #fafafa;
          border-bottom: 1px solid #e0e0e0;
          padding: 8px 24px;
        }

        .store-name {
          font-weight: 700;
          font-size: 2rem;
          color: #222;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: linear-gradient(to right, #ff6b6b, #f06595);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
          margin-right: 12px;
        }

        .store-name:hover {
          transform: scale(1.05);
        }

        .desktop-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: #444;
          font-weight: 600;
          font-size: 1.05rem;
          position: relative;
          padding: 6px 0;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background-color: #8e44ad;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #8e44ad;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          font-size: 2rem;
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

          .category-bar {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}
