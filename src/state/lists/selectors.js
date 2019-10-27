export const getLists = state => state.lists.items;

export const getActiveList = state => state.lists.active;

export const isListSelected = state => getActiveList(state) !== undefined;
