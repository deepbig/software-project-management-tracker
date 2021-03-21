import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from '../../components/styles/Logo';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 52
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
