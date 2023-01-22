
import BookShelf from "./bookshelf";
import AppHeader from "./AppHeader";
// import { PropTypes } from "react";
import { Link } from "react-router-dom";

const ListBooks =({Books,handelChange})=>{

    const curntReadShelf = Books.filter((Book)=>Book.shelf==="currentlyReading");
    const wantReadShelf = Books.filter((Book)=>Book.shelf==="wantToRead");
    const readShelf = Books.filter((Book)=>Book.shelf==="read");
           
    return(
    <div className="list-books">
             <AppHeader/>
             <div className="list-books-content">
                <div>
                    
                    <BookShelf shelfBooks={curntReadShelf} shelfTitle="Currently Reading"  handelChange={handelChange}/>
                    <BookShelf shelfBooks={wantReadShelf} shelfTitle="Want To Read"  handelChange={handelChange}/>
                    <BookShelf shelfBooks={readShelf} shelfTitle="Read"  handelChange={handelChange}/>
                
                </div>

             </div>
             <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
     </div>
           
    )
}

// ListBooks.propTypes={
//     Books:PropTypes.array.isRequired,
//     handelChange:PropTypes.func.isRequired
//     }

export default ListBooks;

