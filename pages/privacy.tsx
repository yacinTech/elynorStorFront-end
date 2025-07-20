import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterForm from '../components/NewsletterForm';


// pages/privacy.tsx
export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>سياسة الخصوصية</h1>
      <p>
        نحن نحترم خصوصيتك ونلتزم بحماية بياناتك. عند استخدامك لمتجرنا، فإننا نجمع فقط المعلومات الضرورية لمعالجة الطلبات وتحسين تجربتك.
      </p>
      <p>
        لن نشارك معلوماتك مع أي جهة خارجية إلا في حالات ضرورية كتوصيل الطلبات أو تطبيق القانون. يمكنك التواصل معنا في أي وقت لطلب حذف بياناتك أو تعديلها.
      </p>
       <WhatsAppButton />
      <NewsletterForm />
    </div>
  );
}
