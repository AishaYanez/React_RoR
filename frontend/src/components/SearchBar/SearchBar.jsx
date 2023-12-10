function SearchBar(props) {
  const filterActivities = () => {

  }
  
  return (
    <div className={`search-container ${props.searchState}`}><input className="search-input" type="search"/></div>
  );
}

export default SearchBar;