// components/OrderForm.tsx
import { useState } from 'react';
import { submitOrder } from '../lib/api';

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
        ...form, productId,
        name: '',
        city: ''
      });
      setSuccess(true);
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-msg">
        <p style={{ color: 'green', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
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
      <h2>طلب المنتج</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-grid">
          <input
            name="customerName"
            placeholder="الاسم الكامل"
            required
            value={form.customerName}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="رقم الهاتف"
            required
            value={form.phone}
            onChange={handleChange}
            type="tel"
          />
        </div>
        <textarea
          name="address"
          placeholder="العنوان الكامل"
          required
          value={form.address}
          onChange={handleChange}
          rows={3}
        />
        <input
          name="quantity"
          type="number"
          min={1}
          required
          value={form.quantity}
          onChange={handleChange}
          placeholder="الكمية"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </form>
      

      <style jsx>{`
        .order-container {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          color: #222;
        }

        .order-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          transition: 0.3s;
        }

        input:focus,
        textarea:focus {
          border-color: #0070f3;
          outline: none;
          background: #f0faff;
        }

        button {
          background-color: #0070f3;
          color: white;
          padding: 14px;
          font-size: 1.1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background-color: #005bb5;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        @media (min-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
