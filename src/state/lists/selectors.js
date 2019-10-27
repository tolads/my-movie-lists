export const getLists = lists => lists.items;

export const getActiveList = lists => lists.active;

export const isListSelected = state => getActiveList(state) !== undefined;
