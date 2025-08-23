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
      const scrollAmount = 160;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <section style={{ marginTop: "40px" }}>
      <h3 style={{
        fontSize: "1.4rem",
        fontWeight: 700,
        marginBottom: "20px",
        textAlign: "center"
      }}>
        منتجات ذات صلة
      </h3>

      <div style={{ position: "relative" }}>
        {/* أزرار التمرير */}
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
        >
          <ChevronLeft color="#fff" size={18} />
        </button>

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
        >
          <ChevronRight color="#fff" size={18} />
        </button>

        {/* سطر المنتجات */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "10px 40px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
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
                  minWidth: "140px", // حجم أصغر للهواتف
                  maxWidth: "160px", // حدود عليا للعرض
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  overflow: "hidden",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#111",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  flexShrink: 0,
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={firstImage}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "120px", // أصغر للهواتف
                    objectFit: "cover",
                  }}
                />
                <h4 style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  margin: "6px 0",
                  padding: "0 5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
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
