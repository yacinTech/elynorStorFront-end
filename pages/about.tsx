
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';
// pages/about.tsx
export default function AboutPage() {
  return (
    
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>من نحن</h1>
      <p>
        الينور هو متجر إلكتروني يسعى لتقديم منتجات راقية وجودة عالية تناسب كل الأذواق.
        نحرص على تجربة تسوق سلسة وموثوقة، مع دعم متواصل واهتمام كبير برضا العملاء.
      </p>
      <p>
        فريقنا يعمل بشغف لتوفير أجمل التصاميم وتقديم خدمة ممتازة بكل احترافية. نحن نؤمن أن الأناقة تبدأ بالتفاصيل، وكل منتج نعرضه يعكس هذا التوجه.
      </p>
            <WhatsAppButton />
      <NewsletterForm />

    </div>
    
  );
      

}
