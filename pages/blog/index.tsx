import Link from "next/link";
import { fetchBlogPosts } from "../../lib/api";
import styles from "./blog.module.css";
import Head from "next/head";
import TopBanner from '../../components/TopBanner';

// دالة معالجة النصوص (ألوان، خلفيات، ظل) بدون ظهور الرموز
function parseSimpleMarkupWithLineBreaks(text: string) {
  const colorMap: Record<string, string> = {
    p: '#800080', r: '#e60023', g: '#008000', b: '#007BFF',
    o: '#FF6600', y: '#FFD700', c: '#00CED1', m: '#FF00FF',
    k: '#000000', w: '#FFFFFF',
  };

  const bgColorMap: Record<string, string> = {
    p: '#E6E6FA', r: '#FFC1C1', g: '#C1FFC1', b: '#C1DFFF',
    o: '#FFE6CC', y: '#FFFFCC', c: '#CCF0F0', m: '#FFCCFF',
    k: '#CCCCCC', w: '#FFFFFF',
  };

  let parsed = text
    // إزالة أي رموز غير مطلوبة
    .replace(/@@(.+?)#([prgboycmkw])@@/g, (_, word, colorCode) => {
      const color = colorMap[colorCode] || '#000';
      return `<span style="color:${color}; font-weight:bold;">${word}</span>`;
    })
    .replace(/##([prgboycmkw])::(.+?)##/g, (_, bgCode, word) => {
      const bgColor = bgColorMap[bgCode] || '#fff';
      return `<span style="background-color:${bgColor}; padding:2px 4px; border-radius:3px;">${word}</span>`;
    })
    .replace(/%%(.+?)::(.+?)%%/g, (_, effect, word) => {
      if (effect === 'shadow') {
        return `<span style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${word}</span>`;
      }
      return word;
    })
    .replace(/~~(.+?)~~/g, '$1')    // إزالة الشطب
    .replace(/__(.+?)__/g, '$1')    // إزالة الخط السفلي
    .replace(/\*\*(.+?)\*\*/g, '$1')// إزالة الغامق
    .replace(/\*(.+?)\*/g, '$1')    // إزالة المائل
    .replace(/\n/g, '<br>');

  return parsed;
}

export default function BlogPage({ posts }: { posts: any[] }) {
  // توليد الكلمات المفتاحية لجميع المقالات
  const keywordsContent = posts
    .flatMap((post) => [
      post.title,
      ...(Array.isArray(post.keywords) && post.keywords.length > 0
        ? post.keywords
        : post.content
        ? post.content.split(' ').slice(0, 10)
        : [])
    ])
    .join(', ');

  return (
    <>
      <Head>
        <title>مدونة إلينور - أحدث المقالات</title>
        <meta
          name="description"
          content="اكتشف أحدث المقالات في موضة، ديكور، أجهزة المنزل، مطبخ، نصائح حياتية، تربية الأطفال، رحلات وتخييم وأكثر على مدونة إلينور."
        />
        <meta name="keywords" content={keywordsContent} />
      </Head>

      <div className={styles.blogContainer}>
        <h1 className={styles.blogTitle}>مدونة إلينور</h1>

        <div className={styles.blogGrid}>
          {posts.map((post) => (
            <div key={post._id} className={styles.blogCard}>
              <Link href={`/blog/${post.slug}`}>
                <img src={post.imageUrl} alt={post.title} />
                <div className={styles.blogCardContent}>
                  <h2>{post.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: parseSimpleMarkupWithLineBreaks(post.content) }} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await fetchBlogPosts();
  return { props: { posts } };
}
