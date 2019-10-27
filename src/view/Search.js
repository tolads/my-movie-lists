import React, { useContext } from 'react';
import Select from 'react-select';
import Box from '@material-ui/core/Box';

import { MoviesContext } from 'state/movies/MoviesContext';
import {
  getOptionsForCurrentSearch,
  getSearchValue,
  isSearchFetching,
} from 'state/movies/selectors';

const Search = () => {
  const {
    current: moviesState,
    fetchMovie,
    setSearchValue: setValue,
  } = useContext(MoviesContext);
  const isLoading = isSearchFetching(moviesState);
  const options = getOptionsForCurrentSearch(moviesState);
  const value = getSearchValue(moviesState);

  const handleInputChange = newValue => {
    setValue(newValue);
  };
  const handleChange = selected => {
    fetchMovie(selected.value);
  };

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
