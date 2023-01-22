
import BookChanger from "./book-shelf-changer";
// import { PropTypes } from "react";

const BookShelf =({shelfBooks,shelfTitle,handelChange})=>{


    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title" value={shelfTitle}>{shelfTitle}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      shelfBooks.map((book)=>{

                        const imgLink =book.imageLinks.thumbnail;
                        let authors ="";
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
                                <BookChanger shlfName={book.shelf} ID={book.id} handelChange={handelChange}/>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{authors}</div>
                            </div>
                          </li>
                          )
                      })
                    }
              
                  </ol>
                </div>
              </div>

    
    )
}

// BookShelf.propTypes={
 
//   shelfBooks:PropTypes.array.isRequired,
//   shelfTitle:PropTypes.string.isRequired,
//   handelChange:PropTypes.func.isRequired

// }

export default BookShelf;