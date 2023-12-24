const BASE_URL = "http://localhost:5000/api/v1";

interface CustomOptions {
  next: {
    tags: string[];
  };
}

export async function getAllCategories() {
  const customOptions: CustomOptions = {
    next: { tags: ['categories'] },
  };

  const res = await fetch(`${BASE_URL}/categories`, customOptions as RequestInit);

  if (!res.ok) throw new Error("Failed To Fetch Data");
  return res.json();
}
