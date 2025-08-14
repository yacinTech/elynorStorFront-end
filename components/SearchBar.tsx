import { useState, useEffect, useRef } from "react";
import { API_BASE } from "../lib/api";
import { FiSearch, FiX } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // منع هبوط الصفحة على الهواتف عند فتح البحث
  useEffect(() => {
    if (open) {
      document.body.classList.add("search-open");
    } else {
      document.body.classList.remove("search-open");
    }
  }, [open]);

  // إغلاق البحث عند الضغط خارج الصندوق
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // جلب النتائج من API
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div ref={containerRef} className="search-wrapper">
      {!open && (
        <button className="search-toggle" onClick={() => setOpen(true)} aria-label="فتح البحث">
          <FiSearch size={20} />
        </button>
      )}

      {open && (
        <div className="search-overlay">
          <div className="search-box">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button className="close-btn" onClick={() => setOpen(false)}>
                <FiX size={24} />
              </button>
            </div>

            {loading && <div className="loading">جارٍ البحث...</div>}

            {results.length > 0 && (
              <ul className="search-results">
                {results.map((product) => (
                  <li key={product._id}>
                    <a href={`/product/${product.slug}`} className="search-item">
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                      />
                      <span>{product.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          z-index: 1001;
        }

        .search-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: #8e44ad;
          padding: 5px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: start; /* ⚡ مهم لمنع الهبوط */
          padding: 16px;
          z-index: 2000;
          overflow-y: auto;
        }

        .search-box {
          width: 100%;
          max-width: 600px;
          position: relative;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 44px 12px 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
        }

        .search-input:focus {
          border-color: #8e44ad;
          box-shadow: 0 0 6px rgba(142, 68, 173, 0.5);
        }

        .close-btn {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .search-results {
          margin-top: 12px;
          max-height: 70vh;
          overflow-y: auto;
          border-radius: 8px;
          background: white;
          list-style: none;
          padding: 0;
          border: 1px solid #ddd;
          position: relative;
          z-index: 0;
        }

        .search-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          text-decoration: none;
          color: #333;
        }

        .search-item:hover {
          background-color: #f5f5f5;
        }

        .search-item img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 5px;
          border: 1px solid #eee;
        }

        .loading {
          margin-top: 8px;
          font-size: 0.95rem;
          color: #555;
        }

        /* منع scroll الجسم عند فتح البحث */
        :global(body.search-open) {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
