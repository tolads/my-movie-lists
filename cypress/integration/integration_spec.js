import selectors from '../fixtures/selectors';

beforeEach(() => {
  cy.visit('/');
});

const getLists = () => cy.get(`${selectors.listsList} li`);
const addList = () => cy.get(selectors.createListBtn).click();
const getSearch = () => cy.get(selectors.searchContainer);
const getTable = () => cy.get(selectors.moviesTable);

it('Creates a list', () => {
  getLists()
    .its('length')
    .should('eq', 2);

  addList();

  getLists()
    .its('length')
    .should('eq', 3);

  getLists()
    .last()
    .find('input')
    .should('have.focus')
    .should('have.value', '');
});

it('Renames lists', () => {
  addList();

  getLists()
    .last()
    .find('input')
    .type('Test List');

  getLists()
    .first()
    .click();

  getLists()
    .last()
    .should('contain', 'Test List');

  getLists()
    .first()
    .find('input')
    .clear()
    .type('Test List 2');

  getLists()
    .last()
    .click();

  getLists()
    .first()
    .should('contain', 'Test List 2');
});

describe('Deletes lists', () => {
  it('Deletes active list, first should become active', () => {
    addList();

    getLists()
      .its('length')
      .should('eq', 3);

    getLists()
      .last()
      .find(selectors.deleteListBtn)
      .click();

    getLists()
      .its('length')
      .should('eq', 2);

    getLists()
      .first()
      .find('input')
      .should('exist');
  });

  it('Deletes inactive list, last should stay active', () => {
    addList();

    getLists()
      .its('length')
      .should('eq', 3);

    getLists()
      .first()
      .find(selectors.deleteListBtn)
      .click();

    getLists()
      .its('length')
      .should('eq', 2);

    getLists()
      .last()
      .find('input')
      .should('exist');
  });

  it('Deletes all the lists', () => {
    getLists()
      .its('length')
      .should('eq', 2);

    getLists()
      .first()
      .find(selectors.deleteListBtn)
      .click();

    getLists()
      .first()
      .find(selectors.deleteListBtn)
      .click();

    getLists().should('not.exist');
    getSearch().should('not.exist');
  });
});

it('Filter returns no result', () => {
  getSearch()
    .click()
    .find('input')
    .type('WONTBERESULT')
    .should('have.value', 'WONTBERESULT');

  getSearch().should('contain', 'Loading');
  getSearch().should('contain', 'No options');

  getSearch()
    .click()
    .find('input')
    .blur()
    .should('have.value', '');
});

const addMovie = () => {
  getSearch()
    .click()
    .find('input')
    .type('Forrest Gump');

  cy.get(selectors.searchFirstOption)
    .contains('Forrest Gump (1994)')
    .click();
};

it('Adds movie to active list', () => {
  getTable()
    .find('tbody tr')
    .its('length')
    .should('eq', 1);

  addMovie();
  getTable()
    .find('tbody tr')
    .its('length')
    .should('eq', 2);

  // it does not add it twice
  addMovie();
  getTable()
    .find('tbody tr')
    .its('length')
    .should('eq', 2);
});

it('Removes movie from active list', () => {
  addMovie();

  getTable()
    .find('tbody tr')
    .its('length')
    .should('eq', 2);

  getTable()
    .find('tbody tr')
    .last()
    .find(selectors.removeMovieBtn)
    .click();

  getTable()
    .find('tbody tr')
    .its('length')
    .should('eq', 1);
});

it('Moves movies in active list', () => {
  addMovie();

  const getFirstRow = () =>
    getTable()
      .find('tbody tr')
      .first();
  const getLastRow = () =>
    getTable()
      .find('tbody tr')
      .last();

  getFirstRow().should('contain', 'The Shawshank Repemption');
  getLastRow().should('contain', 'Forrest Gump');

  getFirstRow()
    .find(selectors.moveMovieDownBtn)
    .click();

  getFirstRow().should('contain', 'Forrest Gump');
  getLastRow().should('contain', 'The Shawshank Repemption');

  getLastRow()
    .find(selectors.moveMovieDownBtn)
    .click();

  getFirstRow().should('contain', 'The Shawshank Repemption');
  getLastRow().should('contain', 'Forrest Gump');

  getFirstRow()
    .find(selectors.moveMovieUpBtn)
    .click();

  getFirstRow().should('contain', 'Forrest Gump');
  getLastRow().should('contain', 'The Shawshank Repemption');

  getLastRow()
    .find(selectors.moveMovieUpBtn)
    .click();

  getFirstRow().should('contain', 'The Shawshank Repemption');
  getLastRow().should('contain', 'Forrest Gump');
});
