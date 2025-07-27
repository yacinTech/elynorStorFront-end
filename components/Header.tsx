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
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <>
      <header className="main-header">
        {/* القسم العلوي */}
        <div className="top-bar">
          <div className="logo-wrapper">
            <Link href="/" legacyBehavior>
              <a
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Image
                  src="/og-image.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
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
                  className="logo-image"
                />
                <span className="store-name">ELYNOR</span>
              </a>
            </Link>
          </div>

          <nav className="desktop-nav">
            {extraLinks.map(link => (
              <Link key={link.name} href={link.href} legacyBehavior>
                <a className="nav-link">{link.name}</a>
              </Link>
            ))}
          </nav>
          

          {/* زر الجوال */}
          <button
            aria-label="فتح القائمة"
            onClick={() => setMobileMenuOpen(true)}
            className="mobile-menu-button"
          >
            ☰
          </button>
        </div>

        {/* القسم السفلي: التصنيفات */}
        <div className="category-bar">
          {categories.map((item) => (
            <Link key={item} href={`/category/${encodeURIComponent(item)}`} legacyBehavior>
              <a className="nav-link">{item}</a>
            </Link>
          ))}
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileMenu
          categories={categories}
          extraLinks={extraLinks}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .main-header {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #fff;
            margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  border-bottom: none !important;
  box-shadow: none !important;
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 16px;
          border-bottom: 1px solid #e0e0e0;
        }

        .category-bar {
  display: flex;
  gap: 16px; /* مسافة بين التصنيفات */
  overflow-x: auto; /* للسماح بالتمرير الأفقي إذا زاد العرض */
  padding:  0 12px; /* تقليل الحشو العمودي ليصبح رقيق */
  background-color: #fff; /* خلفية بيضاء أنيقة */
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  height: 24px; /* ارتفاع أقل (يمكنك تعديل القيمة حسب رغبتك) */
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #444;
  user-select: none;
}

.category-bar::-webkit-scrollbar {
  height: 5px;
}

.category-bar::-webkit-scrollbar-thumb {
  background-color: #8e44ad;
  border-radius: 5px;
}

.category-bar-item {
  padding: 4px 10px;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

.category-bar-item:hover,
.category-bar-item.active {
  background-color: #8e44ad;
  color: white;
}



        .store-name {
          font-weight: 700;
          font-size: 1.4rem;
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

       /* تعديل على top-bar للهاتف */
@media (max-width: 768px) {
  .top-bar {
    padding: 8px 16px; /* تقليل الحشو لجعل الشريط أنحف */
    height: 48px; /* ارتفاع أقل، رقيق */
  }

  .mobile-menu-button {
    display: block;
    font-size: 1.9rem; /* حجم زر مناسب لكن غير ضخم */
    padding: 4px 8px;
    color: #8e44ad;
    border-radius: 6px;
    transition: background-color 0.2s ease;
  }
  .mobile-menu-button:hover,
  .mobile-menu-button:focus {
    background-color: rgba(142, 68, 173, 0.1);
    outline: none;
  }

  .logo-wrapper a {
    display: flex;
    align-items: center;
    gap: 8px; /* مسافة متناسقة بين اللوجو والعنوان */
  }

  .logo-image {
    width: 36px !important; /* حجم أقل للوجو لجعله متناسق */
    height: 36px !important;
    border-radius: 50%;
    border: 2px solid #8e44ad;
    box-shadow: 0 2px 8px rgba(142, 68, 173, 0.3);
    transition: transform 0.3s ease;
  }

  .logo-wrapper a:hover .logo-image {
    transform: scale(1.1) rotate(2deg);
    border-color: #f06595;
    box-shadow: 0 4px 12px rgba(240, 101, 149, 0.6);
  }

  .store-name {
    font-size: 1.3rem !important;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #8e44ad;
    white-space: nowrap;
    user-select: none;
    /* لإظهار العنوان بشكل واضح وجذاب */
  }

  /* إخفاء الروابط في الشريط العلوي للجوال */
  .desktop-nav {
    display: none !important;
  }

  /* إخفاء شريط التصنيفات في الجوال */
  .category-bar {
    display: none !important;
  }
}

/* الهيكل العام للشريط العلوي */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

      `}</style>
    </>
  );
}