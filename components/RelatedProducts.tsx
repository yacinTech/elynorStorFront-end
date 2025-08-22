"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getProductBySlug } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  _id: string;
  slug: string;
  name: string;
  images: string[];
}

interface RelatedProductsProps {
  slugs: string[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ slugs }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slugs.length) return;
      const fetched: Product[] = [];
      for (const slug of slugs) {
        const product = await getProductBySlug(slug);
        if (product) fetched.push(product);
      }
      setProducts(fetched.slice(0, 5));
    };
    fetchProducts();
  }, [slugs]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 180; // أقل عرض لتسهيل التمرير السريع
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <section style={{ marginTop: "40px" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
        منتجات ذات صلة
      </h3>

      <div style={{ position: "relative" }}>
        {/* زر التمرير لليسار */}
        <button
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          <ChevronLeft color="#fff" size={20} />
        </button>

        {/* زر التمرير لليمين */}
        <button
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          <ChevronRight color="#fff" size={20} />
        </button>

        {/* سطر المنتجات */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "10px 50px",
            scrollbarWidth: "none",
          }}
        >
          {products.map((p) => {
            const firstImage = p.images?.[0] || "/placeholder.jpg";

            return (
              <Link
  key={p._id}
  href={`/product/${p.slug}`}
  style={{
    display: "block",
    position: "relative",   // مهم ليظهر النص فوق الصورة
    minWidth: "140px",
    height: "140px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    textAlign: "center",
    textDecoration: "none",
    color: "#111",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    flexShrink: 0,
    backgroundColor: "#fff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
>
  <img
    src={firstImage}
    alt={p.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
  <h4
    style={{
      fontSize: "0.85rem",
      fontWeight: 600,
      margin: 0,
      lineHeight: 1.2,
      backgroundColor: "rgba(255,255,255,0.85)",
      position: "absolute",
      bottom: 0,
      width: "100%",
      textAlign: "center",
      padding: "4px 0",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    {p.name}
  </h4>
</Link>

            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
