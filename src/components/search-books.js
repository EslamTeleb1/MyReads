
import { Link } from "react-router-dom";
import { useState } from "react";
import BookChanger from "./book-shelf-changer";
import *  as BookAPi from "../BooksAPI"  ;

const SearchBooks=({handelChange})=>{

   
    const [Books,setBooks] = useState([]);
   
    const search =(e)=>{

      const value = e.target.value;
      
      const getBooks =async()=>{

       const allBooks =  await BookAPi.search(value);

         console.log(allBooks)

          if(!allBooks.error)
              {
                setBooks(allBooks);
              }
           

          else 
            {
              setBooks([]);
            }
           

      }
     
      if(value!=="")
          getBooks();   
          
      else if(value==="")
      {
        setBooks([])
      }

      }

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" 
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={(e)=>search(e)}
              type="text"
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
         
                
                    {
                     Books.map((book)=>{
                       if(book.id){
                        const imgLink =book.imageLinks.thumbnail;
                        let authors ="";
                        if(book.authors)
                        book.authors.forEach((a)=>authors+=a+" ")
                          return (
                            <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                      `url(${imgLink})`,
                                  }}
                                ></div>
                                <BookChanger search={true} shlfName={(book.shelf)?book.shelf:"none"} ID={book.id}  handelChange={handelChange}/>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{authors}</div>
                            </div>
                          </li>
                          )
                      }
                   
                       }
                       )
                    }
              
                  </ol>
        </div>
      </div>
    )
}

export default SearchBooks;