import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { RootStoreContext } from 'state/RootStore';
import ListItem from './ListItem';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Lists = () => {
  const {
    listsStore: {
      activeList,
      addList,
      deleteList,
      listsJS: lists,
      renameList,
      setActiveList,
    },
  } = useContext(RootStoreContext);
  const classes = useStyles();
  const prevLists = useRef();

  useEffect(() => {
    prevLists.current = lists;
  });

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default observer(Lists);
