import mockBooks from "./books";

// In-memory copy so updates persist during a session
let data = mockBooks.map((b) => ({ ...b }));

const wait = (ms = 250) => new Promise((res) => setTimeout(res, ms));

export const getAll = async () => {
  await wait(300);
  return data;
};

export const get = async (id) => {
  await wait(180);
  return data.find((b) => b.id === id);
};

export const update = async (book, shelf) => {
  await wait(180);
  const idx = data.findIndex((b) => b.id === book.id);
  if (idx >= 0) data[idx] = { ...data[idx], shelf };
  else data.push({ ...book, shelf });
  return { success: true };
};

export const search = async (query = "", maxResults = 20) => {
  await wait(200);
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  const results = data
    .filter((b) => {
      return (
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.authors && b.authors.join(" ").toLowerCase().includes(q))
      );
    })
    .slice(0, maxResults);
  return results;
};

export default { getAll, get, update, search };
