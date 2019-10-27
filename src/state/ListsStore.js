import { action, observable, computed, toJS } from 'mobx';

class ListsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;

    const id = Date.now();

    this.items = [
      { id, label: 'Favourites', movies: ['tt0111161'] },
      { id: 2, label: 'Watchlist', movies: [] },
    ];
    this.active = id;
  }

  @observable items = [];

  @observable active;

  /**
   * @returns {Object[]}
   */
  @computed get lists() {
    return this.items;
  }

  /**
   * @returns {Object[]}
   */
  @computed get listsJS() {
    return toJS(this.lists);
  }

  /**
   * @returns {?number}
   */
  @computed get activeList() {
    return this.active;
  }

  /**
   * @returns {boolean}
   */
  @computed get isListSelected() {
    return this.active !== undefined;
  }

  /**
   * @returns {?Object}
   */
  @computed get activeItem() {
    return this.lists.find(item => item.id === this.activeList);
  }

  @action.bound addList() {
    const id = Date.now();
    this.active = id;
    this.items.push({ id, label: '', movies: [] });
  }

  /**
   * @param {number} id
   * @param {string} label
   */
  @action.bound renameList(id, label) {
    this.items.find(item => item.id === id).label = label;
  }

  /**
   * @param {number} id
   */
  @action.bound deleteList(id) {
    this.items = this.items.filter(item => item.id !== id);
    if (this.active === id) {
      this.active = this.items.length ? this.items[0].id : undefined;
    }
  }

  /**
   * @param {number} id
   */
  @action.bound setActiveList(id) {
    this.active = id;
  }

  /**
   * @param {number} movieId
   */
  @action.bound addMovieToActiveList(movieId) {
    if (this.activeItem.movies.every(item => item !== movieId)) {
      this.activeItem.movies.push(movieId);
    }
  }

  /**
   * @param {number} movieId
   */
  @action.bound removeMovieFromActiveList(movieId) {
    this.activeItem.movies = this.activeItem.movies.filter(
      item => item !== movieId,
    );
  }

  /**
   * @param {number} movieId
   */
  @action.bound moveMovieUpInActiveList(movieId) {
    const { movies } = this.activeItem;
    const index = movies.indexOf(movieId);
    if (index === 0) {
      this.activeItem.movies = [...movies.slice(1), movies[0]];
    } else {
      this.activeItem.movies = [
        ...movies.slice(0, index - 1),
        movies[index],
        movies[index - 1],
        ...movies.slice(index + 1),
      ];
    }
  }

  /**
   * @param {number} movieId
   */
  @action.bound moveMovieDownInActiveList(movieId) {
    const { movies } = this.activeItem;
    const index = movies.indexOf(movieId);
    if (index === movies.length - 1) {
      this.activeItem.movies = [
        movies[movies.length - 1],
        ...movies.slice(0, -1),
      ];
    } else {
      this.activeItem.movies = [
        ...movies.slice(0, index),
        movies[index + 1],
        movies[index],
        ...movies.slice(index + 2),
      ];
    }
  }
}

export default ListsStore;
