import { createSelector } from 'reselect';

import { getLists, getActiveList } from '../lists/selectors';

export const getMovies = state => state.movies.items;

export const getMoviesForActiveList = createSelector(
  getLists,
  getActiveList,
  getMovies,
  (lists, activeList, movies) => {
    if (activeList === undefined) {
      return [];
    }
    return lists
      .find(({ id }) => id === activeList)
      .movies.map(movieId => {
        const movieData = movies[movieId];
        return movieData || { imdbId: movieId };
      });
  },
);

export const getResultForMovieSearch = (state, { key }) =>
  state.movies.searchKeys[key];

export const getSearchValue = state => state.movies.currentSearchValue;

export const getOptionsForCurrentSearch = state => {
  const value = getSearchValue(state);
  const options = getResultForMovieSearch(state, { key: value.trim() });

  return options
    ? options.map(({ title, year, imdbId }) => ({
        value: imdbId,
        label: `${title} (${year})`,
      }))
    : [];
};

export const isSearchFetching = state => state.movies.isSearchFetching;
