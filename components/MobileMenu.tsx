import Link from 'next/link';

interface MobileMenuProps {
  categories: string[];
  extraLinks: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenu({ categories, extraLinks, onClose }: MobileMenuProps) {
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <nav className="mobile-menu" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <Link href={`/category/${encodeURIComponent(cat)}`} legacyBehavior>
                <a onClick={onClose}>{cat}</a>
              </Link>
            </li>
          ))}
          {extraLinks.map(link => (
            <li key={link.name}>
              <Link href={link.href} legacyBehavior>
                <a onClick={onClose}>{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1500;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-menu {
          background: white;
          width: 75%;
          max-width: 300px;
          padding: 20px;
          box-shadow: -4px 0 8px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .close-btn {
          font-size: 2rem;
          background: none;
          border: none;
          align-self: flex-end;
          cursor: pointer;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        a {
          color: #333;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
        }

        a:hover {
          color: #0070f3;
        }
      `}</style>
    </div>
  );
}
