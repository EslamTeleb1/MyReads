
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookChanger from "./book-shelf-changer";
import * as BookAPi from "../BooksAPI";

const SearchBooks = ({ handelChange, libraryBooks = [], api = BookAPi }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [savedBook, setSavedBook] = useState(null);

  const search = (e) => {
    const value = e.target.value.trim();

    const getBooks = async () => {
      try {
        const allBooks = await api.search(value);

        if (!allBooks.error) {
          const normalized = allBooks.map((b) => ({
            ...b,
            shelf: libraryBooks.find((lb) => lb.id === b.id)?.shelf || "none",
          }));
          setSearchResults(normalized);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Search failed:", err);
        setSearchResults([]);
      }
    };

    if (value !== "") getBooks();
    else setSearchResults([]);
  };

  // keep search results in sync with library shelf changes
  useEffect(() => {
    setSearchResults((prev) =>
      prev.map((b) => ({ ...b, shelf: libraryBooks.find((lb) => lb.id === b.id)?.shelf || "none" }))
    );
  }, [libraryBooks]);

  const handleSaved = (id, shelf) => {
    setSavedBook(id);
    setTimeout(() => setSavedBook(null), 1400);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input onChange={(e) => search(e)} type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => {
            if (!book.id) return null;

            const imgLink = book.imageLinks?.thumbnail;
            const authors = book.authors?.join(" ") || "";
            const displayNames = {
              currentlyReading: "Currently Reading",
              wantToRead: "Want to Read",
              read: "Read",
            };

            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className={`book-cover ${savedBook === book.id ? "saved" : ""}`}
                      style={{ width: 128, height: 193, backgroundImage: `url(${imgLink})` }}
                    ></div>

                    {book.shelf && book.shelf !== "none" && (
                      <div className="shelf-badge">{displayNames[book.shelf] || book.shelf}</div>
                    )}

                    <BookChanger
                      search={true}
                      shlfName={book.shelf ? book.shelf : "none"}
                      ID={book.id}
                      handelChange={handelChange}
                      onSaved={handleSaved}
                    />
                  </div>

                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{authors}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
