
const BookShelfChanger =({search,shlfName,ID,handelChange})=>{

   const shelves = [
                    {id:"0", shelfName:"none", shelfDisplayName:"None"}, 

                    {id:"1", shelfName:"currentlyReading", shelfDisplayName:"Currently Reading"}, 

                    {id:"2", shelfName:"wantToRead", shelfDisplayName:"Want to Read"},

                    {id:"3", shelfName:"read", shelfDisplayName:"Read"},    

                   ]

    let timeout;

    const doSearch =(e)=>{

    const shelfValue =e.target.value;

      if(timeout) clearTimeout(timeout);

       timeout = setTimeout(() => {
           handelChange(search,ID,shelfValue);
      },3000);

     }
  
    return (
        <div className="book-shelf-changer">
        <select  
        onChange={(e)=>{console.log(e.target.value);doSearch(e);}}
        defaultValue={shlfName}
        >
          <option value="move to" disabled>
            Move to...
          </option>
           {
            shelves.map((shelf)=>{
              return <option key={shelf.id} value={shelf.shelfName}>{shelf.shelfDisplayName}</option>
            })
           }
          
        </select>
      </div>
    )
}

export default BookShelfChanger;