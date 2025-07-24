import { useState } from 'react';
import { submitOrder } from '../lib/api';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface OrderFormProps {
  productId: string;
}

export default function OrderForm({ productId }: OrderFormProps) {
  const [form, setForm] = useState({
    customerName: '',
    address: '',
    phone: '',
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitOrder({
        ...form,
        productId,
        name: '',
        city: '',
      });

      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: [productId],
          content_type: 'product',
          value: form.quantity,
          currency: 'MAD',
        });
      }

      setSuccess(true);
    } catch {
      alert('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-msg">
        <p
          style={{
            color: 'green',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <i className="fas fa-check-circle"></i>
          تم إرسال الطلب بنجاح! شكرًا لثقتك.
        </p>

        <style jsx>{`
          .success-msg {
            text-align: center;
            color: #2e7d32;
            background: #e8f5e9;
            padding: 20px;
            font-weight: bold;
            border-radius: 12px;
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="order-container">
      {/* باقي الكود كما هو */}
    </div>
  );
}
