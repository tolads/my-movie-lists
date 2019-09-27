import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as listActions from 'state/lists/actions';
import { getActiveList, getLists } from 'state/lists/selectors';
import ListItem from './ListItem';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Lists = ({
  activeList,
  addList,
  deleteList,
  lists,
  renameList,
  setActiveList,
}) => {
  const classes = useStyles();
  const prevLists = useRef();

  useEffect(() => {
    prevLists.current = lists;
  });

  return (
    <>
      <div className={classes.header}>
        <Typography variant="subtitle1">My lists</Typography>
        <IconButton
          color="primary"
          data-test-id="create-list-btn"
          onClick={addList}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Paper>
        <List component="nav" data-test-id="lists-list">
          {lists.map(({ id, label }) => (
            <ListItem
              key={id}
              active={id === activeList}
              deleteList={() => deleteList(id)}
              id={id}
              isNewItem={Boolean(
                prevLists &&
                  prevLists.current &&
                  prevLists.current.every(list => list.id !== id),
              )}
              label={label}
              renameList={value => renameList(id, value)}
              setActiveList={() => setActiveList(id)}
            />
          ))}
        </List>
      </Paper>
    </>
  );
};

Lists.propTypes = {
  activeList: PropTypes.number,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renameList: PropTypes.func.isRequired,
  setActiveList: PropTypes.func.isRequired,
};

Lists.defaultProps = {
  activeList: undefined,
};

const mapStateToProps = state => ({
  activeList: getActiveList(state),
  lists: getLists(state),
});

const mapDispatchToProps = {
  addList: listActions.addList,
  deleteList: listActions.deleteList,
  renameList: listActions.renameList,
  setActiveList: listActions.setActiveList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lists);
