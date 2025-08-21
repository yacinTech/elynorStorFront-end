import Link from "next/link";
import { fetchBlogPosts } from "../../lib/api";
import styles from "./blog.module.css";
import Head from "next/head";

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

  const parsed = text
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
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\n/g, '<br>');

  return parsed;
}

// تعريف نوع المقالة لتجنب any[]
type Post = {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  keywords?: string[];
  createdAt?: string;
};

export default function BlogPage({ posts }: { posts: Post[] }) {
  // توليد الكلمات المفتاحية لجميع المقالات
const keywordsContent = Array.from(
  new Set(
    posts.flatMap((post) => [
      post.title,                 // عنوان المقال
      ...(post.keywords || []),   // كلمات المقالة الخاصة
      ...(post.keywords?.length ? [] : post.content?.split(' ').slice(0, 10) || [])
    ])
  )
).join(', ');


  return (
    <>
      <Head>
        <title>مدونة إلينور - أحدث المقالات</title>
        <meta
          name="description"
          content="اكتشف أحدث المقالات في موضة، ديكور، أجهزة المنزل، مطبخ، نصائح حياتية، تربية الأطفال، رحلات وتخييم وأكثر على مدونة إلينور."
        />
        <meta name="keywords" content={keywordsContent} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="مدونة إلينور - أحدث المقالات" />
        <meta property="og:description" content="اكتشف أحدث المقالات في موضة، ديكور، أجهزة المنزل، مطبخ، نصائح حياتية، تربية الأطفال، رحلات وتخييم وأكثر على مدونة إلينور." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elynor-store.vercel.app/blog" />
        <meta property="og:image" content="/Elynor1.png" />
        <link rel="canonical" href="https://elynor-store.vercel.app/blog" />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "مدونة إلينور",
            "url": "https://elynor-store.vercel.app/blog",
            "description": "اكتشف أحدث المقالات في موضة، ديكور، أجهزة المنزل، مطبخ، نصائح حياتية، تربية الأطفال، رحلات وتخييم وأكثر.",
            "blogPost": ${JSON.stringify(posts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "image": post.imageUrl,
                "url": `https://elynor-store.vercel.app/blog/${post.slug}`,
                "datePublished": post.createdAt || new Date().toISOString()
            })))}
          }
          `}
          </script>




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
