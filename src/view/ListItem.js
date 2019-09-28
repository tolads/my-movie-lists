import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Item from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  item: {
    height: 48,
    '&:hover $deleteButton': {
      opacity: 1,
    },
  },
  button: {
    height: 48,
  },
  activeItem: {
    backgroundColor: '#EDEDED',
  },
  edit: {
    width: '100%',
  },
  textField: {
    margin: 0,
    width: '100%',
  },
  input: {
    '&::before': {
      borderBottomColor: 'transparent',
    },
  },
  deleteButton: {
    opacity: 0,
    '&:focus': {
      opacity: 1,
    },
  },
}));

const ListItem = ({
  active,
  deleteList,
  isNewItem,
  label,
  renameList,
  setActiveList,
}) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const placeholder = '(new list)';

  useEffect(() => {
    if (inputEl && inputEl.current && isNewItem) {
      inputEl.current.focus();
    }
  });

  const handleChange = event => renameList(event.target.value);

  return (
    <Item
      button={!active}
      ContainerProps={{
        className: `${classes.item} ${active ? classes.activeItem : ''}`,
      }}
      classes={{ button: classes.button }}
      onClick={active ? undefined : setActiveList}
    >
      {active ? (
        <Box className={classes.edit}>
          <TextField
            className={classes.textField}
            InputProps={{ className: classes.input }}
            inputRef={inputEl}
            onChange={handleChange}
            placeholder={placeholder}
            value={label}
          />
        </Box>
      ) : (
        <ListItemText primary={label || placeholder} />
      )}
      <ListItemSecondaryAction>
        <IconButton
          aria-label="delete"
          className={classes.deleteButton}
          data-test-id="delete-btn"
          edge="end"
          onClick={deleteList}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </Item>
  );
};

ListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  deleteList: PropTypes.func.isRequired,
  isNewItem: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  renameList: PropTypes.func.isRequired,
  setActiveList: PropTypes.func.isRequired,
};

export default observer(ListItem);
