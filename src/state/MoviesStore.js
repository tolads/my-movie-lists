import { flow, getEnv, getParent, types } from 'mobx-state-tree';

const MoviesEntry = types.model('MoviesEntry', {
  genre: types.maybe(types.string),
  imdbId: types.string,
  poster: types.maybe(types.string),
  rating: types.maybe(types.string),
  title: types.maybe(types.string),
  year: types.maybe(types.string),
});

const MoviesStore = types
  .model('MoviesStore', {
    items: types.map(MoviesEntry),
    searchKeys: types.map(types.array(MoviesEntry)),
    currentSearchValue: '',
    isSearchFetching: false,
  })
  .views(self => ({
    /**
     * @returns {Object}
     */
    get movies() {
      return self.items;
    },

    /**
     * @returns {Object[]}
     */
    get moviesForActiveList() {
      const { lists } = getParent(self);

      if (lists.activeList === undefined) {
        return [];
      }
      return lists.activeItem.movies.map(movieId => {
        const movieData = self.movies.get(movieId);
        return movieData || { imdbId: movieId };
      });
    },

    /**
     * @returns {string}
     */
    get searchValue() {
      return self.currentSearchValue;
    },

    /**
     * @returns {Object[]}
     */
    get optionsForCurrentSearch() {
      const value = self.searchValue;
      const options = self.searchKeys.get(value.trim());

      return options
        ? options.map(({ title, year, imdbId }) => ({
            value: imdbId,
            label: `${title} (${year})`,
          }))
        : [];
    },

    /**
     * @returns {boolean}
     */
    get isLoading() {
      return self.isSearchFetching;
    },
  }))
  .actions(self => {
    let movieSearch;

    return {
      /* eslint-disable no-param-reassign */
      /**
       * @param {boolean} isFetching
       */
      setIsSearchFetching(isFetching) {
        self.isSearchFetching = isFetching;
      },

      /**
       * @param {string} key
       * @param {Object[]} movies
       */
      movieSearchResultReceived(key, movies) {
        self.searchKeys.set(key, movies);
      },

      /**
       * @param {string} key
       */
      searchMovies(key) {
        const trimmedKey = key.trim();
        const result = self.searchKeys.get(trimmedKey);

        if (trimmedKey.length < 3 || result) {
          self.setIsSearchFetching(false);
          return;
        }

        self.setIsSearchFetching(true);

        window.clearTimeout(movieSearch);
        movieSearch = window.setTimeout(() => {
          getEnv(self)
            .api.searchMovies(trimmedKey)
            .then(movies => {
              self.movieSearchResultReceived(trimmedKey, movies);
            })
            .catch(console.error)
            .finally(() => {
              self.setIsSearchFetching(false);
            });
        }, 400);
      },

      /**
       * @param {string} value
       */
      setSearchValue(value) {
        self.currentSearchValue = value;
        self.searchMovies(value);
      },

      /**
       * @param {string} id
       */
      fetchMovie: flow(function* fetchMovie(id) {
        getParent(self).lists.addMovieToActiveList(id);

        if (self.movies[id]) {
          return;
        }

        try {
          const movie = yield getEnv(self).api.getMovie(id);
          self.items.set(movie.imdbId, movie);
        } catch (error) {
          console.error(error);
        }
      }),
      /* eslint-enable no-param-reassign */
    };
  });

export default MoviesStore;
