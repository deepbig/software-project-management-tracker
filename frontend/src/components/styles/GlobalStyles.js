import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%',
      fontSize: '14px',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    //need to modify this for future.
    '.MuiListItemText-primary': {
      color: 'black'
    },
    '.detail-tab-body': {
      backgroundColor: '#f4f6f8',
    }

    // ul: {
    //   overflow:'hidden',
    //   },
    // li: {
    //   display:'inline-block',
    //   // padding: "10px",
    //   }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
