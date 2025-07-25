import { useState } from 'react';
import { submitOrder } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      // Facebook Pixel event
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          content_ids: [productId],
          content_type: 'product',
          value: form.quantity,
          currency: 'MAD',
        });
      }

      toast.success(' تم إرسال الطلب بنجاح! شكرًا لثقتك.', {
        position: 'top-center',
        autoClose: 4000,
      });

      // تفريغ الحقول بعد النجاح
      setForm({
        customerName: '',
        address: '',
        phone: '',
        quantity: 1,
      });
    } catch {
      toast.error('❌ حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.', {
        position: 'top-center',
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <ToastContainer />

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
          width: 100%;
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        h2 {
          text-align: center;
          font-size: 1.8rem;
          color: #1a202c;
          margin-bottom: 1.5rem;
        }

        .order-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 10px;
          transition: 0.3s ease;
          background-color: #f9f9f9;
        }

        input:focus,
        textarea:focus {
          border-color: #3182ce;
          outline: none;
          background-color: #ebf8ff;
        }

        button {
          background-color: #3182ce;
          color: white;
          padding: 14px;
          font-size: 1.1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #2b6cb0;
        }

        button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .order-container {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
