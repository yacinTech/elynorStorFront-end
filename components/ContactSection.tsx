// components/ContactSection.tsx
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    const { name, email, message } = form;
    const text = `
👤 الاسم: ${name}
📧 الإيميل: ${email}
📝 الرسالة: ${message}`;
    const whatsappNumber = '212646342598'; // رقم واتساب بصيغة دولية بدون "+"
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" style={{ background: '#fdfbff', padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#6d28d9', marginBottom: '30px' }}>
        تواصل معنا
      </h2>

      <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="message"
          placeholder="رسالتك"
          rows={5}
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
          required
        />

        <button onClick={handleSend} style={buttonStyle}>
          إرسال عبر واتساب
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>تابعنا على:</h3>
        <div style={{ fontSize: '2.2rem', display: 'flex', justifyContent: 'center', gap: '25px' }}>
          <a
            href="https://www.facebook.com/share/18tUZLu7Rz/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            style={iconStyle}
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/elynorofficiel?igsh=ejAwbnlkNHUxY2sy&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            style={iconStyle}
          >
            <FaInstagram />
          </a>
          <a
            href="http://wa.me/212646342598"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            style={iconStyle}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  marginTop: '10px',
  backgroundColor: '#6d28d9',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const iconStyle: React.CSSProperties = {
  color: '#6d28d9',
  cursor: 'pointer',
  transition: 'color 0.3s',
  display: 'flex',
  alignItems: 'center',
};
