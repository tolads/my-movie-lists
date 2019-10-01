const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY || 'de26953c';

const request = url =>
  window.fetch(url).then(res => (res.ok ? res.json() : Promise.reject(res)));

const transformMovie = movie => ({
  genre: movie.Genre,
  imdbId: movie.imdbID,
  poster: movie.Poster,
  rating: movie.imdbRating,
  title: movie.Title,
  year: movie.Year,
});

/**
 * @param {string} key
 */
export const searchMovies = key =>
  request(
    `https://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&s=${key}`,
  ).then(({ Search }) => (Search ? Search.map(transformMovie) : []));

/**
 * @param {string} id
 */
export const getMovie = id =>
  request(
    `https://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&i=${id}`,
  ).then(transformMovie);
