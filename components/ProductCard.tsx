// components/ProductCard.tsx
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
      }}
      className="product-card"
    >
     <Link href={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
  {product.images?.length ? (
    <img
      src={product.images[0]}
      alt={product.name}
      style={{ maxWidth: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '180px',
        backgroundColor: '#eee',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
      }}
    >
      لا توجد صورة
    </div>
  )}
  <h3 style={{ marginTop: '10px', fontSize: '1.1rem' }}>{product.name}</h3>
  <p style={{ color: '#444', fontWeight: 'bold' }}>{product.price} درهم</p>
</Link>

      <style jsx>{`
        .product-card:hover {
          box-shadow: 0 0 8px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}
