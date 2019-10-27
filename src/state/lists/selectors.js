export const getLists = current => current.context.items;

export const getActiveList = current => current.context.active;

export const isListSelected = current => getActiveList(current) !== undefined;
