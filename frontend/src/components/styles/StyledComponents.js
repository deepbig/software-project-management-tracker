import {
  Button,
  withStyles,
  Typography,
  Switch
} from '@material-ui/core';

const status_button_height = 30;
const status_button_radius = 10;

export const WhiteTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

export const InstStatusRedButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#ff3229',
      background: '#ffb1b1',
      borderRadius: "0 7px 7px 0",
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const InstStatusOrangeButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#f99401',
      background: '#ffd0a8',
      borderRadius: 0,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const InstStatusYellowButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#f7d603',
      background: '#fff3aa',
      borderRadius: 0,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const InstStatusGreenButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#65e065',
      background: '#b5ead7',
      borderRadius: "7px 0 0 7px",
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const TopStatusNoneButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#ff3229',
      background: '#fafae1',
      borderRadius: status_button_radius,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const TopStatusGreenButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#65e065',
      background: '#b5ead7',
      borderRadius: status_button_radius,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const TopStatusYellowButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#f7d603',
      background: '#fff3aa',
      borderRadius: status_button_radius,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const TopStatusOrangeButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#f99401',
      background: '#ffd0a8',
      borderRadius: status_button_radius,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const TopStatusRedButton = withStyles((theme) => ({
  root: {
    '&$disabled': {
      // background: '#ff3229',
      background: '#ffb1b1',
      borderRadius: status_button_radius,
      border: 0,
      color: 'black',
      height: status_button_height,
      padding: '0 10px',
    },
  },
  disabled: {},
}))(Button);

export const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
