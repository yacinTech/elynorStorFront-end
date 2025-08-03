import { useState } from 'react';
import { submitOrder } from '../lib/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface OrderFormProps {
  productId: string;
  productName: string;
  colors?: string[];
}

export default function OrderForm({ productId, productName, colors = [] }: OrderFormProps) {
  const [form, setForm] = useState({
    customerName: '',
    address: '',
    phone: '',
    quantity: 1,
  });

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await submitOrder({
  productId,
  customerName: form.customerName, // ✅ صحيح الآن
  address: form.address,           // ✅ صحيح الآن
  phone: form.phone,
  quantity: form.quantity,
  color: selectedColor || undefined,
});


    const emailTemplateParams = {
      customer_name: form.customerName,
      phone_number: form.phone,
      full_address: form.address,
      quantity: form.quantity,
      product_id: productId,
      product_name: productName,
      color: selectedColor || '',
    };

    await emailjs.send(
      'service_7fzns2a',
      'template_8sgqo9m',
      emailTemplateParams,
      'V1oAGzX88dkxDIcvH'
    );

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

    setForm({
      customerName: '',
      address: '',
      phone: '',
      quantity: 1,
    });
    setSelectedColor('');
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

        {colors.length > 0 && (
          <select
            value={selectedColor}
            onChange={handleColorChange}
            className="color-select"
            required
          >
            <option value="">اختر اللون</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </form>

      <style jsx>{`
        .order-container {
          max-width: 600px;
          margin: 2rem auto;
          background: #fff;
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
          font-weight: 700;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .order-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        input,
        textarea,
        select.color-select {
          width: 100%;
          padding: 14px 16px;
          font-size: 1rem;
          border: 1.8px solid #ccc;
          border-radius: 10px;
          background-color: #f9f9f9;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          resize: vertical;
        }

        input:focus,
        textarea:focus,
        select.color-select:focus {
          border-color: #3182ce;
          box-shadow: 0 0 8px rgba(49, 130, 206, 0.5);
          outline: none;
          background-color: #e8f0fe;
        }

        button {
          background-color: #3182ce;
          color: white;
          padding: 16px;
          font-size: 1.15rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        button:hover:not(:disabled) {
          background-color: #2c6cc1;
          box-shadow: 0 4px 12px rgba(44, 108, 193, 0.5);
        }

        button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Responsive for smaller screens */
        @media (max-width: 600px) {
          .order-container {
            padding-left: 8px;
            padding-right: 8px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          input,
          textarea,
          select.color-select {
            border-radius: 0;
            border-left: 1.8px solid #ccc;
            border-right: 1.8px solid #ccc;
            margin: 0 4px;
          }

          button {
            width: 100%;
            border-radius: 0 0 12px 12px;
          }
        }
      `}</style>
    </div>
  );
}
