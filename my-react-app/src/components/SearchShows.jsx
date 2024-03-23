const SearchShows = (props) => {
    const handleChange = (e) => {
      props.searchValue(e.target.value);
    };
    return (
      <form
        method='POST '
        onSubmit={(e) => {
          e.preventDefault();
        }}
        name='formName'
        className='center'
      >
        <label>
          <div>Search Shows: </div>
          <input
            autoComplete='off'
            type='text'
            name='searchTerm'
            onChange={handleChange}
          />
        </label>
      </form>
    );
  };
  
  export default SearchShows;
  