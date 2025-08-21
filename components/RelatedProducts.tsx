"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProductBySlug } from "../lib/api";

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

  useEffect(() => {
    const fetchProducts = async () => {
      if (slugs.length === 0) return;

      const fetched: Product[] = [];
      for (const slug of slugs) {
        const product = await getProductBySlug(slug);
        if (product) fetched.push(product);
      }

      setProducts(fetched.slice(0, 3)); // جلب أول 3 منتجات فقط
    };

    fetchProducts();
  }, [slugs]);

  if (products.length === 0) return null;

  return (
    <section style={{ marginTop: "40px" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
        منتجات ذات صلة
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
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
                width: "220px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                textAlign: "center",
                textDecoration: "none",
                color: "#111",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <img
                src={firstImage}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                }}
              />
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "10px 0" }}>
                {p.name}
              </h4>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
