import { getLists, getActiveList } from '../lists/selectors';

export const getMovies = movies => movies.items;

export const getMoviesForActiveList = ({ listsState, moviesState }) => {
  const lists = getLists(listsState);
  const activeList = getActiveList(listsState);
  const movies = getMovies(moviesState);

  if (activeList === undefined) {
    return [];
  }
  return lists
    .find(({ id }) => id === activeList)
    .movies.map(movieId => {
      const movieData = movies[movieId];
      return movieData || { imdbId: movieId };
    });
};

export const getResultForMovieSearch = (movies, { key }) =>
  movies.searchKeys[key];

export const getSearchValue = movies => movies.currentSearchValue;

export const getOptionsForCurrentSearch = movies => {
  const value = getSearchValue(movies);
  const options = getResultForMovieSearch(movies, { key: value.trim() });

  return options
    ? options.map(({ title, year, imdbId }) => ({
        value: imdbId,
        label: `${title} (${year})`,
      }))
    : [];
};

export const isSearchFetching = movies => movies.isSearchFetching;
