import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
} from '@material-ui/core';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../components/styles/Logo';
// import { logout } from '../../modules/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: '100%',
    margin: 0,
  },
  list_item_icon: {
    minWidth: '36px'
  },
  topBar: {
    height: 52
  }
}));

const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // const handleLogout = () => {
  //   navigate('/login');
  //   dispatch(logout());
  // }

  // const toggleDrawer = (open) => (e) => {
  //   if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
  //     return;
  //   }
  //   setMenu(open);
  // };


  // const list_menu = () => (
  //   <div
  //     className={clsx(classes.list, {
  //       [classes.fullList]: true,
  //     })}
  //     role="presentation"
  //     onClick={toggleDrawer(false)}
  //     onKeyDown={toggleDrawer(false)}
  //   >
  //     <List>
  //       {['DASHBOARD', 'ACTIVITY', 'RESULT'].map((text) => (
  //         <RouterLink to={{ pathname: `/app/${text.toLowerCase()}` }} key={text} style={{ textDecoration: 'none' }}>
  //           <ListItem button key={text}>
  //             <ListItemText primary={text} color="primary" />
  //           </ListItem>
  //         </RouterLink>
  //       ))}
  //     </List>
  //   </div>
  // )

  return (
    <AppBar
      className={classes.root}
    >
      <Toolbar classNAme={classes.topBar}>
        {/* {!matches ?
          <>
            <React.Fragment key="menu_button">
              <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor='top' open={menu} onClose={toggleDrawer(false)}>
                {list_menu()}
              </Drawer>
            </React.Fragment>

            <Typography variant="h5" className={classes.title}>
              {location.pathname.includes("dashboard") ? "Dashboard" :
                location.pathname.includes("activity") ? "Activity" : 
                location.pathname.includes("result") ? "Result" : ""}
            </Typography>
          </>
          :
          <> */}
            <RouterLink to="/" >
              <Logo className={classes.menuButton} />
            </RouterLink>
            {/* <RouterLink to="/app/dashboard">
              <Button variant="contained" size="large" color="primary">
                Dashboard
            </Button>
            </RouterLink>
            <RouterLink to="/app/activity">
              <Button variant="contained" size="large" color="primary">
                Activity
            </Button>
            </RouterLink>
            <RouterLink to="/app/result">
              <Button variant="contained" size="large" color="primary">
                Result
            </Button>
            </RouterLink>
          </>
        } */}

        {/* <Typography variant="h5" className={classes.title}>
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
