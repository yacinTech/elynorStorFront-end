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
      setSuccess('🎉 رائع! أنت الآن مشترك في نشرتنا البريدية، استعد لتلقي أحدث العروض والمحتوى المفيد.');

      // الرسالة تختفي بعد 5 ثوانٍ
      setTimeout(() => setSuccess(''), 5000);

      setEmail('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('⚠️ حدث خطأ غير متوقع، حاول مرة أخرى.');
      }

      // اختفاء رسالة الخطأ بعد 5 ثوانٍ
      setTimeout(() => setError(''), 5000);
    }
    setLoading(false);
  };

  return (
    <>
      <div id="newsletter" className="newsletter-wrapper">
        <h3>اشترك الآن</h3>
        <p>لا تفوت أحدث العروض والمستجدات الحصرية مباشرة في بريدك!</p>
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="البريد الإلكتروني"
          />
          <button type="submit" disabled={loading}>
            {loading ? '... جاري الاشتراك' : 'اشترك'}
          </button>
        </form>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>

      <style jsx>{`
        .newsletter-wrapper {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border-radius: 12px;
          max-width: 380px;
          margin: 20px auto;
          padding: 22px 18px;
          text-align: center;
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h3 {
          margin-bottom: 8px;
          font-size: 1.3rem;
          font-weight: 700;
        }

        p {
          font-size: 0.9rem;
          margin-bottom: 16px;
          color: #e0e7ff;
        }

        .newsletter-form {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        input[type='email'] {
          flex: 1 1 200px;
          height: 36px;
          padding: 0 12px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          transition: box-shadow 0.25s ease, background 0.25s ease;
          background-color: #f3f4f6;
          color: #111827;
        }

        input[type='email']:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
          background-color: #ffffff;
        }

        button {
          background-color: #facc15;
          border: none;
          color: #1f2937;
          height: 36px;
          padding: 0 18px;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
        }

        button:hover:not(:disabled) {
          background-color: #eab308;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(234, 179, 8, 0.5);
        }

        button:disabled {
          background-color: #fcd34d;
          cursor: not-allowed;
          box-shadow: none;
        }

        .success-msg,
        .error-msg {
          margin-top: 14px;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .success-msg {
          color: #065f46;
          background-color: #d1fae5;
        }

        .error-msg {
          color: #991b1b;
          background-color: #fee2e2;
        }

        @media (max-width: 480px) {
          .newsletter-wrapper {
            max-width: 92vw;
            padding: 18px 12px;
          }

          h3 {
            font-size: 1.1rem;
          }

          p {
            font-size: 0.85rem;
          }

          .newsletter-form {
            flex-direction: row;
            gap: 6px;
          }

          input[type='email'],
          button {
            height: 34px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}
