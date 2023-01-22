import "./App.css";
import  ListBooks from "./components/list-books";
import SearchBooks from "./components/search-books";
import { Route, Routes} from "react-router-dom";
import *  as BookAPi from "./BooksAPI"  ;
import { useState ,useEffect } from "react";

function App() {
  const [Books,setBooks]= useState([]);
  
  useEffect(() => {
    
    const setAllBooks = async ()=> {
     const allBooks =  await BookAPi.getAll();
      console.log(allBooks);
     setBooks(allBooks);
    }
      
   setAllBooks();
   

  },[]);

   const handelChange=(ID,shelfName)=>{

      let updateBook =async ()=>{

      const book = await BookAPi.get(ID);
       setBooks(Books.map((book)=>
         {
          if(book.id===ID)
             book.shelf=shelfName;
            return book;   
         }));
         await BookAPi.update(book,shelfName);  

      } 
      
      updateBook();
        
   }

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
        <SearchBooks handelChange={handelChange}></SearchBooks>
        }
      />
       <Route
        path="/"
        element={
        <h1> 404 Page Not Found</h1>
        }
      />
      </Routes>
     )

  }
export default App;
