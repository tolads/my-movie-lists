import { getLists, getActiveList } from '../lists/selectors';

export const getMovies = current => current.context.items;

export const getMoviesForActiveList = ({
  lists: listsState,
  movies: moviesState,
}) => {
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

export const getResultForMovieSearch = (current, { key }) =>
  current.context.searchKeys[key];

export const getSearchValue = current => current.context.currentSearchValue;

export const getOptionsForCurrentSearch = current => {
  const value = getSearchValue(current);
  const options = getResultForMovieSearch(current, { key: value.trim() });

  return options
    ? options.map(({ title, year, imdbId }) => ({
        value: imdbId,
        label: `${title} (${year})`,
      }))
    : [];
};

export const isSearchFetching = current => current.value.search === 'fetching';
