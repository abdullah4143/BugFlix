import searchIcon from '../assets/search.svg'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src={searchIcon} />
            <input 
                type="text"
                placeholder='Search through thousands of movies.'
                value={searchTerm}
                onChange={event=>setSearchTerm(event.target.value)}    
            />
                
        </div>
    </div>
  )
}

export default Search