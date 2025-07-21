import Image from 'next/image';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        lineHeight: '1.8',
        color: '#333',
        textAlign: 'center',
      }}
    >
      {/* الصورة التمهيدية */}
      <div style={{ marginBottom: '30px' }}>
        <Image
          src="/Elynor.png" // ضع هنا مسار الصورة داخل public/
          alt="من نحن"
          width={800}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            objectFit: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>من نحن</h1>

      <p>
        الينور هو متجر إلكتروني يسعى لتقديم منتجات راقية وجودة عالية تناسب كل الأذواق.
        نحرص على تجربة تسوق سلسة وموثوقة، مع دعم متواصل واهتمام كبير برضا العملاء.
      </p>
      <p>
        فريقنا يعمل بشغف لتوفير أجمل التصاميم وتقديم خدمة ممتازة بكل احترافية.
        نحن نؤمن أن الأناقة تبدأ بالتفاصيل، وكل منتج نعرضه يعكس هذا التوجه.
      </p>

      <WhatsAppButton />
      <NewsletterForm />
    </div>
  );
}
