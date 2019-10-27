import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import { isListSelected } from 'state/lists/selectors';
import * as movieActions from 'state/movies/actions';
import {
  getOptionsForCurrentSearch,
  getSearchValue,
  isSearchFetching,
} from 'state/movies/selectors';

const Search = ({
  fetchMovie,
  showSearch,
  isLoading,
  options,
  setValue,
  value,
}) => {
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

Search.propTypes = {
  fetchMovie: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  showSearch: isListSelected(state),
  isLoading: isSearchFetching(state),
  options: getOptionsForCurrentSearch(state),
  value: getSearchValue(state),
});

const mapDispatchToProps = {
  fetchMovie: movieActions.fetchMovie,
  setValue: movieActions.setSearchValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
