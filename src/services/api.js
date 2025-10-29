const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export const getPasswords = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch passwords");
  const data = await res.json();
  return data.map(pwd => ({ ...pwd, _id: pwd._id.toString() }));
};

export const savePassword = async (password) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password),
  });
  return res.json();
};

export const deletePassword = async (id) => {
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
