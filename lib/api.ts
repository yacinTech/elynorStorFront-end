// lib/api.ts

const API_BASE = 'https://mynewstore-back-end.onrender.com/api/products'; // عدّل هذا حسب API الخاص بك

export async function getAllProducts() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error('فشل في جلب المنتجات');
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE}/category/${encodeURIComponent(category)}`);
  if (!res.ok) return [];
  return res.json();
}

// lib/api.tsx
// lib/api.tsx
export async function submitOrder(orderData: {
  productId: string;
  name: string;
  city: string;
  phone: string;
  quantity: number;
}) {
  const res = await fetch('https://mynewstore-back-end.onrender.com/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8', // تأكد من هذا السطر
    },
    body: JSON.stringify(orderData), // حوّل الكائن JSON إلى نص
  });

  if (!res.ok) {
    throw new Error('Failed to submit order');
  }
  return res.json();
}


export const subscribeToNewsletter = async (email: string): Promise<unknown> => {
  const res = await fetch('https://mynewstore-back-end.onrender.com/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'فشل الاشتراك');
  }

  return await res.json();
};


