// components/Footer.tsx
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';


export default function Footer() {
  return (
    <footer id="footer" style={{
      backgroundColor: '#f1f1f1',
      padding: '40px 20px',
      color: '#333',
      borderTop: '1px solid #ddd'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        
        {/* شعار واسم المتجر */}
        <div style={{ marginBottom: '20px' }}>
         <Image
            src="/logo.png"
            alt="شعار المتجر"
            width={66}
            height={66}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
            }}
          />


          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>الينور</h2>
          <p style={{ color: '#777' }}>منتجات أنيقة بأسعار مناسبة</p>
        </div>

        {/* روابط صفحات */}
        <div style={{
          display: 'flex',
          gap: '25px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <Link href="/" legacyBehavior><a style={linkStyle}>الرئيسية</a></Link>
          <Link href="/about" legacyBehavior><a style={linkStyle}>من نحن</a></Link>
          <Link href="/contact" legacyBehavior><a style={linkStyle}>تواصل معنا</a></Link>
          <Link href="/privacy" legacyBehavior><a style={linkStyle}>سياسة الخصوصية</a></Link>
        </div>

        {/* أيقونات سوشيال ميديا */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
        }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaInstagram />
          </a>
          <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaWhatsapp />
          </a>
        </div>

        {/* الحقوق */}
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          © {new Date().getFullYear()} الينور. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 500
};

const iconStyle: React.CSSProperties = {
  fontSize: '1.3rem',
  color: '#555',
  transition: 'color 0.3s',
};

