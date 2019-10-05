import { action, computed, observable, reaction } from 'mobx';

import * as api from 'api/api';
import listsStore from '../lists/ListsStore';

export class MoviesStore {
  constructor(lists) {
    this.lists = lists;
    this.items = {
      tt0111161: {
        poster:
          'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        title: 'The Shawshank Repemption',
        year: '1994',
        genre: 'Drama',
        imdbId: 'tt0111161',
        rating: '9.3',
      },
    };

    // Handle the change of the `searchValue` field
    reaction(
      () => this.searchValue,
      searchValue => {
        const trimmedKey = searchValue.trim();
        const result = this.searchKeys[trimmedKey];

        if (trimmedKey.length < 3 || result) {
          this.setIsSearchFetching(false);
          return;
        }

        this.setIsSearchFetching(true);

        window.clearTimeout(this.movieSearch);
        this.movieSearch = window.setTimeout(() => {
          api
            .searchMovies(trimmedKey)
            .then(movies => {
              this.movieSearchResultReceived(trimmedKey, movies);
            })
            .catch(console.error)
            .finally(() => {
              this.setIsSearchFetching(false);
            });
        }, 400);
      },
    );
  }

  @observable items = {};

  @observable searchKeys = {};

  @observable currentSearchValue = '';

  @observable isSearchFetching = false;

  /**
   * @returns {Object}
   */
  @computed get movies() {
    return this.items;
  }

  /**
   * @returns {Object[]}
   */
  @computed get moviesForActiveList() {
    if (this.lists.activeList === undefined) {
      return [];
    }
    return this.lists.lists
      .find(({ id }) => id === this.lists.activeList)
      .movies.map(movieId => {
        const movieData = this.movies[movieId];
        return movieData || { imdbId: movieId };
      });
  }

  /**
   * @returns {string}
   */
  @computed get searchValue() {
    return this.currentSearchValue;
  }

  /**
   * @returns {Object[]}
   */
  @computed get optionsForCurrentSearch() {
    const value = this.searchValue;
    const options = this.searchKeys[value.trim()];

    return options
      ? options.map(({ title, year, imdbId }) => ({
          value: imdbId,
          label: `${title} (${year})`,
        }))
      : [];
  }

  /**
   * @returns {boolean}
   */
  @computed get isLoading() {
    return this.isSearchFetching;
  }

  /**
   * @param {boolean} isFetching
   */
  @action.bound setIsSearchFetching(isFetching) {
    this.isSearchFetching = isFetching;
  }

  /**
   * @param {string} key
   * @param {Object[]} movies
   */
  @action.bound movieSearchResultReceived(key, movies) {
    this.searchKeys[key] = movies;
  }

  /**
   * @param {Object} movie
   */
  @action.bound movieReceived(movie) {
    this.items[movie.imdbId] = movie;
  }

  /**
   * @param {string} value
   */
  @action.bound setSearchValue(value) {
    this.currentSearchValue = value;
  }

  /**
   * @param {string} id
   */
  @action.bound fetchMovie(id) {
    this.lists.addMovieToActiveList(id);

    if (this.movies[id]) {
      return;
    }

    api
      .getMovie(id)
      .then(movie => {
        this.movieReceived(movie);
      })
      .catch(console.error);
  }
}

export default new MoviesStore(listsStore);
