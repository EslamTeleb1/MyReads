
const BookShelfChanger =({shlfName,ID,handelChange})=>{

    return (
        <div className="book-shelf-changer">
        <select  
        onChange={(e)=>{console.log(e.target.value);handelChange(ID,e.target.value)}}
        defaultValue={shlfName}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="none">None</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          
        </select>
      </div>
    )
}

export default BookShelfChanger;