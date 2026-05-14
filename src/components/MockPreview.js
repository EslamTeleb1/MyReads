import { useEffect, useState } from "react";
import mockAPI from "../mock/MockAPI";
import ListBooks from "./list-books";
import SearchBooks from "./search-books";
import { Link } from "react-router-dom";

const MockPreview = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const all = await mockAPI.getAll();
      if (mounted) setBooks(all);
    };
    load();
    return () => (mounted = false);
  }, []);

  const handelChange = async (search = false, ID, shelfName) => {
    const book = await mockAPI.get(ID);
    await mockAPI.update(book, shelfName);
    setBooks((prev) => {
      const exists = prev.some((b) => b.id === ID);
      const updated = { ...book, shelf: shelfName };
      if (exists) return prev.map((b) => (b.id === ID ? { ...b, shelf: shelfName } : b));
      return [...prev, updated];
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Mock Preview</h2>
        <Link to="/">Open real app</Link>
      </div>
      <div style={{ marginBottom: 18 }}>
        <em>This preview uses in-memory mock data and shows the improved UI/UX.</em>
      </div>

      <ListBooks Books={Books} handelChange={handelChange} />

      <div style={{ marginTop: 24 }}>
        <SearchBooks handelChange={handelChange} libraryBooks={Books} api={mockAPI} />
      </div>
    </div>
  );
};

export default MockPreview;
