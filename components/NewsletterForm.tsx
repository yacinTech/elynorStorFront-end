import { useState } from 'react';
import { subscribeToNewsletter } from '../lib/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await subscribeToNewsletter(email);
      setSuccess('🎉 تم الاشتراك بنجاح! شكرًا لك.');
      setEmail('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('حدث خطأ، حاول مرة أخرى.');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div id='newsletter' className="newsletter-wrapper">
        <h3>اشترك في نشرتنا البريدية</h3>
        <p>لا تفوت أحدث العروض والمنتجات الجديدة!</p>
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-label="البريد الإلكتروني"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'جاري الاشتراك...' : 'اشترك الآن'}
          </button>
        </form>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>

      <style jsx>{`
        .newsletter-wrapper {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          max-width: 420px;
          margin: 40px auto;
          padding: 30px 25px;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h3 {
          margin-bottom: 10px;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        p {
          font-size: 1rem;
          margin-bottom: 20px;
          color: #e0d7f5;
        }

        .newsletter-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        input[type='email'] {
          flex: 1 1 240px;
          padding: 10px 14px; /* تقليل البادينغ ليصبح أقل طولًا */
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: box-shadow 0.3s ease, background 0.3s ease;
          background: #f1f1fa;
          color: #333;
         
        }

        input[type='email']:focus {
          box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.5);
          background-color: #5a54a4;
          color: #fff;
        }

        button {
          background-color: #f9a825;
          border: none;
          color: #2e2e2e;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(249, 168, 37, 0.6);
          transition: background-color 0.3s ease, transform 0.2s ease;
          flex-shrink: 0;
          min-width: 130px;
          height: 38px; /* توحيد الارتفاع مع الحقل */
        }

        button:hover:not(:disabled) {
          background-color: #ffc107;
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(255, 193, 7, 0.8);
        }

        button:disabled {
          background-color: #cbbf6b;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .success-msg {
          margin-top: 20px;
          color: #d4edda;
          background-color: #155724;
          padding: 10px 15px;
          border-radius: 8px;
          font-weight: 600;
          animation: fadeIn 0.6s ease forwards;
        }

        .error-msg {
          margin-top: 20px;
          color: #f8d7da;
          background-color: #721c24;
          padding: 10px 15px;
          border-radius: 8px;
          font-weight: 600;
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }

        /* Responsive */
       @media (max-width: 480px) {
  .newsletter-wrapper {
    max-width: 92vw;
    padding: 20px 12px;
    max-height: auto;
  }

  .newsletter-form {
    flex-direction: column;
    gap: 10px;
    height: auto;
  }

  input[type='email'] {
    width: 100%;
    max-width: 100%;
    font-size: 0.9rem;
    padding: 8px 10px;     /* تصغير الحشوة لتقليل الارتفاع */
    height: 30px;          /* تقليص الارتفاع */
    box-sizing: border-box;
    border-radius: 6px;
  }

  button {
    width: 100%;
    padding: 8px 0;
    height: 36px;
    font-size: 0.9rem;
  }
}

        }
      `}</style>
    </>
  );
}
