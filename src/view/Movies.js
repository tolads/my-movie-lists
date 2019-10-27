import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DataTable from '@material-ui/core/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ListsContext } from 'state/lists/ListsContext';
import { MoviesContext } from 'state/movies/MoviesContext';
import { getMoviesForActiveList } from 'state/movies/selectors';

const highlightBackground = '#EDEDED';
const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
  },
  row: {
    height: 96,
    '&:hover': {
      backgroundColor: highlightBackground,
    },
    '&:focus-within': {
      backgroundColor: highlightBackground,
    },
    '&:hover $icons': {
      opacity: 1,
      backgroundColor: highlightBackground,
    },
    '&:focus-within $icons': {
      opacity: 1,
      backgroundColor: highlightBackground,
    },
  },
  loading: {
    opacity: 0.4,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  cell: {
    padding: '8px 12px',
  },
  button: {
    padding: 6,
  },
  iconCell: {
    position: 'relative',
    overflow: 'hidden',
  },
  icons: {
    position: 'absolute',
    left: 0,
    transform: 'translate(0, calc(-50% - 1em + 4px))',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
  },
}));

const Movies = () => {
  const classes = useStyles();
  const {
    current: listsState,
    moveMovieDownInActiveList: moveDown,
    moveMovieUpInActiveList: moveUp,
    removeMovieFromActiveList: remove,
  } = useContext(ListsContext);
  const { current: moviesState } = useContext(MoviesContext);
  const movies = getMoviesForActiveList({
    lists: listsState,
    movies: moviesState,
  });

  const columns = [
    {
      header: '#',
      className: classes.iconCell,
      content: (movie, index) => (
        <>
          {index + 1}
          <div className={classes.icons}>
            <IconButton
              className={classes.button}
              data-test-id="move-up-btn"
              onClick={() => moveUp(movie.imdbId)}
            >
              <ArrowDropUpIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={classes.button}
              data-test-id="remove-btn"
              onClick={() => remove(movie.imdbId)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={classes.button}
              data-test-id="move-down-btn"
              onClick={() => moveDown(movie.imdbId)}
            >
              <ArrowDropDownIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      header: 'Poster',
      content: movie => <img src={movie.poster} alt="" width="50" />,
    },
    {
      header: 'Title',
      content: movie => movie.title,
    },
    {
      header: 'Year',
      content: movie => movie.year,
    },
    {
      header: 'Genre',
      content: movie => movie.genre,
    },
    {
      header: 'IMDb',
      content: movie => (
        <Link href={`https://www.imdb.com/title/${movie.imdbId}/`}>
          {movie.imdbId}
        </Link>
      ),
    },
    {
      header: 'Rating',
      content: movie => movie.rating,
    },
  ];

  return (
    <Paper className={classes.root}>
      <DataTable data-test-id="movies-table" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(({ header }) => (
              <TableCell key={header} className={classes.cell}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow
              key={movie.imdbId}
              className={`${classes.row} ${
                movie.title === undefined ? classes.loading : ''
              }`}
            >
              {columns.map(({ className, content, header }) => (
                <TableCell
                  key={header}
                  className={`${classes.cell} ${className || ''}`}
                >
                  {content(movie, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
  );
};

export default Movies;
