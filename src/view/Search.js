import React, { useContext } from 'react';
import Select from 'react-select';
import Box from '@material-ui/core/Box';

import { isListSelected } from 'state/lists/selectors';
import { ListsContext } from 'state/lists/ListsContext';
import { MoviesContext } from 'state/movies/MoviesContext';
import {
  getOptionsForCurrentSearch,
  getSearchValue,
  isSearchFetching,
} from 'state/movies/selectors';

const Search = () => {
  const { state: listsState } = useContext(ListsContext);
  const {
    state: moviesState,
    fetchMovie,
    setSearchValue: setValue,
  } = useContext(MoviesContext);
  const isLoading = isSearchFetching(moviesState);
  const options = getOptionsForCurrentSearch(moviesState);
  const value = getSearchValue(moviesState);
  const showSearch = isListSelected(listsState);

  const handleInputChange = newValue => {
    setValue(newValue);
  };
  const handleChange = selected => {
    fetchMovie(selected.value);
  };

  if (!showSearch) {
    return null;
  }

  return (
    <Box my={2} data-test-id="search-container">
      <Select
        filterOption={null}
        isLoading={isLoading}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        placeholder="Add a movie"
        value={value}
      />
    </Box>
  );
};

export default Search;
