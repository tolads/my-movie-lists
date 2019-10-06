import { action, computed, flow, observable, reaction } from 'mobx';

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
        const setIsSearchFetching = action(
          'setIsSearchFetching',
          isFetching => {
            this.isSearchFetching = isFetching;
          },
        );
        const trimmedKey = searchValue.trim();
        const result = this.searchKeys[trimmedKey];

        if (trimmedKey.length < 3 || result) {
          setIsSearchFetching(false);
          return;
        }

        setIsSearchFetching(true);

        window.clearTimeout(this.movieSearch);
        this.movieSearch = window.setTimeout(() => {
          api
            .searchMovies(trimmedKey)
            .then(
              action('movieSearchResultReceived', movies => {
                this.searchKeys[trimmedKey] = movies;
              }),
            )
            .catch(console.error)
            .finally(() => {
              setIsSearchFetching(false);
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
   * @param {string} value
   */
  @action.bound setSearchValue(value) {
    this.currentSearchValue = value;
  }

  /**
   * @param {string} id
   */
  fetchMovie = flow(
    function* fetchMovieGenerator(id) {
      this.lists.addMovieToActiveList(id);

      if (this.movies[id]) {
        return;
      }

      try {
        const movie = yield api.getMovie(id);
        this.items[movie.imdbId] = movie;
      } catch (error) {
        console.error(error);
      }
    }.bind(this),
  );
}

export default new MoviesStore(listsStore);
