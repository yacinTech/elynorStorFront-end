import WhatsAppButton from '../components/WhatsAppButton';
import Head from 'next/head';



// pages/privacy.tsx
export default function PrivacyPage() {
  return (
   
    <>
      <Head>
        <title>سياسة الخصوصية | متجر ELYNOR</title>
        <meta name="description" content="تعرف على كيفية حماية خصوصيتك وبياناتك عند استخدامك لمتجر ELYNOR." />
      </Head>

<main style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 20px 40px 20px' }}>

        <h1 className="policy-title">
          🛡️ سياسة الخصوصية - متجر ELYNOR
        </h1>


        <p style={{ lineHeight: '2', fontSize: '1.1rem', marginBottom: '24px' }}>
          في متجر <strong>ELYNOR</strong>، نولي أهمية قصوى لخصوصيتك وثقتك بنا. تهدف هذه السياسة إلى توضيح كيفية جمع واستخدام وحماية بياناتك الشخصية أثناء استخدامك لموقعنا وخدماتنا.
        </p>

        <h2 style={headingStyle}>1. المعلومات التي نقوم بجمعها</h2>
        <ul style={listStyle}>
          <li>معلومات الهوية: مثل الاسم، رقم الهاتف، البريد الإلكتروني، والعنوان.</li>
          <li>تفاصيل الطلبات وسجل الشراء.</li>
          <li>بيانات الدفع (لا نقوم بتخزين معلومات البطاقة البنكية).</li>
          <li>بيانات الاستخدام لتحسين تجربتك.</li>
          <li>ملفات تعريف الارتباط (Cookies) لأغراض تحليلية.</li>
        </ul>

        <h2 style={headingStyle}>2. كيفية استخدام معلوماتك</h2>
        <ul style={listStyle}>
          <li>لتنفيذ الطلبات والتوصيل.</li>
          <li>لتحسين تجربتك وتخصيص المحتوى والعروض.</li>
          <li>لإرسال التحديثات والعروض بعد موافقتك.</li>
          <li>لدعمك والرد على استفساراتك.</li>
        </ul>

        <h2 style={headingStyle}>3. حماية معلوماتك</h2>
        <p style={paragraphStyle}>
          نستخدم تقنيات حماية متقدمة مثل SSL، وجدران الحماية (Firewall)، وتقييد الوصول الداخلي لضمان حماية بياناتك.

        </p>

        <h2 style={headingStyle}>4. مشاركة المعلومات</h2>
        <p style={paragraphStyle}>
          لا نشارك بياناتك مع أي طرف ثالث إلا عند الضرورة، مثل:
        </p>
        <ul style={listStyle}>
          <li>شركات التوصيل.</li>
          <li>مزودي خدمات الدفع.</li>
          <li>أدوات التحليل والإعلانات (بدون الكشف عن هويتك).</li>
        </ul>

        <h2 style={headingStyle}>5. حقوقك كمستخدم</h2>
        <ul style={listStyle}>
          <li>الوصول إلى بياناتك.</li>
          <li>تعديل أو حذف بياناتك.</li>
          <li>سحب موافقتك على الرسائل الترويجية.</li>
        </ul>
        <p style={paragraphStyle}>
          للتواصل بخصوص هذه الحقوق، يُرجى مراسلتنا عبر الوسائل أدناه.

        </p>

        <h2 style={headingStyle}>6. روابط خارجية</h2>
        <p style={paragraphStyle}>
          قد يحتوي الموقع على روابط لمواقع خارجية لا نتحمل مسؤولية سياساتها. يرجى الاطلاع عليها بشكل مستقل.

        </p>

        <h2 style={headingStyle}>7. التعديلات على سياسة الخصوصية</h2>
        <p style={paragraphStyle}>
          نحتفظ بالحق في تعديل هذه السياسة. سيتم تحديث هذه الصفحة عند إجراء أي تغييرات.

        </p>

        <h2 style={headingStyle}>8. معلومات التواصل</h2>
        <p style={paragraphStyle}>
          لأي استفسار أو طلب متعلق بالخصوصية، يمكنكم التواصل معنا عبر:
        </p>
        <ul style={listStyle}>
          <li
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // نجعل المحتوى يبدأ من اليسار داخل الـ flex container
              gap: '8px', // مسافة بين الأيقونة والكلام والرقم
              direction: 'rtl', // اتجاه النص العربي
              alignItems: 'center',
            }}
          >
            <span>📞 الهاتف:</span>
            <span style={{ direction: 'ltr', fontFamily: 'monospace, monospace' }}>+212 625 902 672</span>
          </li>


          <li>💬 واتساب: <a href="http://wa.me/212646342598" target="_blank" rel="noopener noreferrer">اضغط هنا</a></li>
          <li>📧 البريد الإلكتروني: <strong>elynor.contact@gmail.com</strong></li>
        </ul>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#555' }}>
          🗓️ <em>تاريخ آخر تحديث: 4 غشت 2025</em>
        </p>
      </main>
      <WhatsAppButton/>
      <style jsx>{`
  .policy-title {
    font-size: 2.4rem;
    color: #4B0082;
    margin-bottom: 30px;
    text-align: center;
  }

  @media (max-width: 640px) {
    .policy-title {
      font-size: 1.6rem;
    }
  }
`}</style>

    </>
  );
}

const headingStyle = {
  fontSize: '1.5rem',
  marginTop: '30px',
  marginBottom: '12px',
  color: '#6b21a8',
  fontWeight: 700,
};

const listStyle = {
  paddingLeft: '20px',
  lineHeight: '2',
  fontSize: '1.05rem',
  color: '#333',
};

const paragraphStyle = {
  lineHeight: '2',
  fontSize: '1.1rem',
  color: '#444',
};

