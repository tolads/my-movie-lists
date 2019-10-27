import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Select from 'react-select';
import Box from '@material-ui/core/Box';

import { Context } from 'state/store';

const Search = () => {
  const {
    lists: { isListSelected },
    movies: {
      fetchMovie,
      isLoading,
      optionsForCurrentSearch: options,
      searchValue: value,
      setSearchValue: setValue,
    },
  } = useContext(Context);
  const handleInputChange = newValue => {
    setValue(newValue);
  };
  const handleChange = selected => {
    fetchMovie(selected.value);
  };

  if (!isListSelected) {
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

export default observer(Search);
