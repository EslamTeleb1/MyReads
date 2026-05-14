
import { useRef, useEffect, useState } from "react";

const BookShelfChanger = ({ search, shlfName, ID, handelChange, onSaved = () => {} }) => {
  const shelves = [
    { id: "0", shelfName: "none", shelfDisplayName: "None" },
    { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
    { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" },
  ];

  const timerRef = useRef(null);
  const savedTimerRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const shelfValue = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current);
    // shorter debounce for snappier UI
    timerRef.current = setTimeout(() => {
      handelChange(search, ID, shelfValue);
      const shelfObj = shelves.find((s) => s.shelfName === shelfValue);
      const display = shelfValue === "none" ? "Removed" : `Added to ${shelfObj?.shelfDisplayName || shelfValue}`;
      setToastText(display);
      setShowToast(true);
      onSaved(ID, shelfValue);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setShowToast(false), 1600);
    }, 300);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} value={shlfName}>
        <option value="move to" disabled>
          Move to...
        </option>
        {shelves.map((shelf) => {
          return (
            <option key={shelf.id} value={shelf.shelfName}>
              {shelf.shelfDisplayName}
            </option>
          );
        })}
      </select>
      <div className={`change-toast ${showToast ? "show" : ""}`} aria-hidden={!showToast}>
        <span className="check">✓</span>
        <span className="text">{toastText}</span>
      </div>
    </div>
  );
};

export default BookShelfChanger;