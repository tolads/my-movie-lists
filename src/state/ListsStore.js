import { types } from 'mobx-state-tree';
import { toJS } from 'mobx';

const ListsEntry = types.model('ListsEntry', {
  id: types.number,
  label: types.string,
  movies: types.array(types.string),
});

const ListsStore = types
  .model('ListsStore', {
    items: types.array(ListsEntry),
    active: types.maybe(types.number),
  })
  .views(self => ({
    /**
     * @returns {Object[]}
     */
    get lists() {
      return self.items;
    },

    /**
     * @returns {Object[]}
     */
    get listsJS() {
      return toJS(this.lists);
    },

    /**
     * @returns {?number}
     */
    get activeList() {
      return self.active;
    },

    /**
     * @returns {?Object}
     */
    get activeItem() {
      return self.lists.find(item => item.id === self.activeList);
    },
  }))
  .actions(self => ({
    /* eslint-disable no-param-reassign */
    addList() {
      const id = Date.now();
      self.active = id;
      self.items.push({ id, label: '', movies: [] });
    },

    /**
     * @param {number} id
     * @param {string} label
     */
    renameList(id, label) {
      self.items.find(item => item.id === id).label = label;
    },

    /**
     * @param {number} id
     */
    deleteList(id) {
      self.items = self.items.filter(item => item.id !== id);
      if (self.active === id) {
        self.active = self.items.length ? self.items[0].id : undefined;
      }
    },

    /**
     * @param {number} id
     */
    setActiveList(id) {
      self.active = id;
    },

    /**
     * @param {number} movieId
     */
    addMovieToActiveList(movieId) {
      if (self.activeItem.movies.every(item => item !== movieId)) {
        self.activeItem.movies.push(movieId);
      }
    },

    /**
     * @param {number} movieId
     */
    removeMovieFromActiveList(movieId) {
      self.activeItem.movies = self.activeItem.movies.filter(
        item => item !== movieId,
      );
    },

    /**
     * @param {number} movieId
     */
    moveMovieUpInActiveList(movieId) {
      const { movies } = self.activeItem;
      const index = movies.indexOf(movieId);
      if (index === 0) {
        self.activeItem.movies = [...movies.slice(1), movies[0]];
      } else {
        self.activeItem.movies = [
          ...movies.slice(0, index - 1),
          movies[index],
          movies[index - 1],
          ...movies.slice(index + 1),
        ];
      }
    },

    /**
     * @param {number} movieId
     */
    moveMovieDownInActiveList(movieId) {
      const { movies } = self.activeItem;
      const index = movies.indexOf(movieId);
      if (index === movies.length - 1) {
        self.activeItem.movies = [
          movies[movies.length - 1],
          ...movies.slice(0, -1),
        ];
      } else {
        self.activeItem.movies = [
          ...movies.slice(0, index),
          movies[index + 1],
          movies[index],
          ...movies.slice(index + 2),
        ];
      }
    },
    /* eslint-enable no-param-reassign */
  }));

export default ListsStore;
