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

   const handelChange=(search=false,ID,shelfName)=>{

      let updateBook =async ()=>{

      const book = await BookAPi.get(ID);

      if(!search)
       setBooks(Books.map((b)=>
         {
          if(b.id===ID)
             {
              b.shelf=shelfName;
              console.log(b);
            }

             
            return b;   
         }));
         
        if(search)
        {
          book.shelf=shelfName;
          setBooks([...Books,book])
        }
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
