import ReactDOM from 'react-dom';
import Image from 'next/image';

interface Props {
  image: string;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: Props) {
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        cursor: 'zoom-out',
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'fixed',
          top: 'clamp(8px, 2vw, 24px)', // مرن حسب الشاشة
          right: 'clamp(8px, 2vw, 24px)',
          background: 'transparent',
          color: '#fff',
          border: 'none',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // حجم مرن
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 1000000,
          lineHeight: 1,
          padding: 4,
          transition: 'transform 0.2s ease',
        }}
        aria-label="Close"
      >
        ✖
      </button>

      <Image
        src={image}
        alt="صورة مكبرة"
        width={1000}
        height={800}
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          userSelect: 'none',
          borderRadius: 8,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
        }}
      />
    </div>,
    document.body
  );
}
