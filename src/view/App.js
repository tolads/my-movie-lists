import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HideOnScroll from './HideOnScroll';
import Lists from './Lists';
import Movies from './Movies';
import Search from './Search';

const footerHeight = 40;
const useStyles = makeStyles(() => ({
  content: {
    minHeight: `calc(100vh - ${footerHeight}px)`,
  },
  footer: {
    height: footerHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">My movie lists</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.content}>
        <Toolbar />
        <Container>
          <Box my={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Lists />
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Movies />
                <Search />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <div className={classes.footer}>
        <p>
          {`The site uses `}
          <Link href="http://www.omdbapi.com/">OMDb API</Link>
          {'.'}
        </p>
      </div>
    </>
  );
};

export default App;
