import "./App.css";
import  ListBooks from "./components/list-books";
import SearchBooks from "./components/search-books";
import MockPreview from "./components/MockPreview";
import { Route, Routes} from "react-router-dom";
import *  as BookAPi from "./BooksAPI"  ;
import { useState ,useEffect } from "react";

function App() {
  const [Books, setBooks] = useState([]);
  
  useEffect(() => {
    
    const setAllBooks = async ()=> {
     const allBooks =  await BookAPi.getAll();
      console.log(allBooks);
     setBooks(allBooks);
    }
      
   setAllBooks();
   

  },[]);

  const handelChange = (search = false, ID, shelfName) => {
    const updateBook = async () => {
      try {
        const book = await BookAPi.get(ID);
        const updatedBook = { ...book, shelf: shelfName };

        setBooks((prev) => {
          const exists = prev.some((b) => b.id === ID);
          if (exists) {
            return prev.map((b) => (b.id === ID ? { ...b, shelf: shelfName } : b));
          }
          return [...prev, updatedBook];
        });

        await BookAPi.update(book, shelfName);
      } catch (err) {
        console.error("Failed to update book shelf:", err);
      }
    };

    updateBook();
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          
          <ListBooks Books={Books} handelChange={handelChange} />
        }
      />
      <Route
        exact
        path="/search"
        element={
          <SearchBooks handelChange={handelChange} libraryBooks={Books} />
        }
      />
      <Route exact path="/mock" element={<MockPreview />} />
       <Route
        path="*"
        element={<h1>404 Page Not Found</h1>}
      />
      </Routes>
     )

  }
export default App;
