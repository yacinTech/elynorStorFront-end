import { fetchBlogPosts } from "../../lib/api";
import Link from "next/link";
import Head from "next/head";
import styles from "./blog.module.css";
import { FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { GetServerSideProps } from 'next';


interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  keywords?: string[];
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

// دالة تحويل النصوص مع ألوان وخلفيات وتأثيرات
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
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/__(.+?)__/g, '<u>$1</u>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/@@(.+?)#([prgboycmkw])@@/g, (_, word, colorCode) => {
      const color = colorMap[colorCode] || '#000';
      return `<span style="color:${color}; font-weight:bold;">${word}</span>`;
    })
    .replace(/##([prgboycmkw])::(.+?)##/g, (_, bgCode, text) => {
      const bgColor = bgColorMap[bgCode] || '#fff';
      return `<span style="background-color:${bgColor}; padding:2px 4px; border-radius:3px;">${text}</span>`;
    })
    .replace(/%%(.+?)::(.+?)%%/g, (_, effect, text) => {
      if (effect === 'shadow') {
        return `<span style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">${text}</span>`;
      }
      return text;
    });

  parsed = parsed.replace(/\n/g, '<br>');
  return parsed;
}

// دالة للحصول على مقتطف من النص لأغراض SEO
function getSnippet(text: string, length = 160) {
  return text.replace(/<[^>]+>/g, '').substring(0, length) + '...';
}

export default function BlogPostPage({ post, relatedPosts = [] }: Props) {
  if (!post) return <p>المقال غير موجود.</p>;

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(post.title);

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const whatsappShare = `https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(pageUrl)}`;


  const keywordsContent = [
    post.title,
    ...(Array.isArray(post.keywords) && post.keywords.length > 0
      ? post.keywords
      : post.content
      ? post.content.split(' ').slice(0, 15) // أول 15 كلمة من المحتوى
      : ['مقال', 'مدونة', 'أخبار', 'معلومات'])
  ].join(', ');

  const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "ELYNOR",
      "url": "https://elynor-store.vercel.app",
      "logo": "https://elynor-store.vercel.app/og-image.jpg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+212625902672",
        "contactType": "customer service",
        "areaServed": "MA",
        "availableLanguage": "Arabic"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61571124188604",
        "https://www.instagram.com/elynorofficiel/"
      ]
    },
    {
      "@type": "WebSite",
      "url": "https://elynor-store.vercel.app/",
      "name": "ELYNOR"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://elynor-store.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": post.title,
          "item": `https://elynor-store.vercel.app/blog/${post.slug}`
        }
      ]
    },
    {
      "@type": "BlogPosting",
      "headline": post.title,
      "image": [post.imageUrl],
      "author": {
        "@type": "Person",
        "name": "ELYNOR"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ELYNOR",
        "logo": {
          "@type": "ImageObject",
          "url": "https://elynor-store.vercel.app/og-image.jpg"
        }
      },
      "datePublished": (post as any).createdAt || new Date().toISOString(),
      "dateModified": (post as any).updatedAt || (post as any).createdAt || new Date().toISOString(),

      "description": post.content.slice(0, 150)
    }
  ]
};


  return (
    <>
      <Head>
        <title>{post.title} | مدونة الينور</title>
        <meta name="description" content={getSnippet(post.content)} />
        <meta name="keywords" content={keywordsContent} />

        <link rel="canonical" href={pageUrl} />

         <script
          type="application/ld+json"
          // تحويل الكائن إلى نص JSON صالح
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={getSnippet(post.content)} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="مدونتنا" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={getSnippet(post.content)} />
        <meta name="twitter:image" content={post.imageUrl} />

        <meta name="robots" content="index, follow" />
      </Head>

      <div className={styles.blogPost}>
        <img src={post.imageUrl} alt={post.title} />
        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: parseSimpleMarkupWithLineBreaks(post.content) }} />

        <div className={styles.shareTitle}>شارك هذا المقال:</div>
        <div className={styles.shareButtons}>
          <a href={facebookShare} target="_blank" rel="noopener noreferrer" className={`${styles.shareButton} ${styles.shareFacebook}`}>
            <FaFacebookF />
          </a>
          <a href={whatsappShare} target="_blank" rel="noopener noreferrer" className={`${styles.shareButton} ${styles.shareWhatsapp}`}>
            <FaWhatsapp />
          </a>
          <a href={twitterShare} target="_blank" rel="noopener noreferrer" className={`${styles.shareButton} ${styles.shareTwitter}`}>
            <FaTwitter />
          </a>
        </div>

        <Link href="/blog" className={styles.backButton}>
          ← العودة للمدونة
        </Link>

        {relatedPosts.length > 0 && (
          <div className={styles.relatedPosts}>
            <h2>مقالات ذات صلة</h2>
            <div className={styles.relatedPostsGrid}>
              {relatedPosts.map((rp) => (
                <Link key={rp._id} href={`/blog/${rp.slug}`} className={styles.relatedPostCard}>
                  <img src={rp.imageUrl} alt={rp.title} />
                  <h3>{rp.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// جلب المقال والمقالات العشوائية
export const getServerSideProps: GetServerSideProps<{ post: Post; relatedPosts: Post[] }> = async (context) => {
  const { slug } = context.params as { slug: string };
  const posts: Post[] = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return { notFound: true };

  const relatedPosts = (posts.filter((p) => p.slug !== slug) || [])
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return { props: { post, relatedPosts } };
};
