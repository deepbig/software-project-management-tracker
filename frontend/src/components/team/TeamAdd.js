import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@material-ui/core';
import { changeField, initializeForm } from '../../modules/team';
import { UserList, RoleList } from '../../lib/api/team';
import UserAdd from '../user/UserAdd';
import RoleAdd from '../role/RoleAdd';
import { CreateMember } from '../../lib/api/team';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "8px 0px 4px",
    minWidth: 260,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  },
}));

const TeamAdd = ({ project_id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { addForm, userList, roleList } = useSelector(({ team }) => ({
    addForm: team.addForm,
    userList: team.userList,
    roleList: team.roleList,
  }))

  const handleClickOpen = (event) => {
    setOpen(true);
    event.target.blur();
  }

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeForm('addForm'));
    document.activeElement.blur();
  }

  useEffect(() => {
    if (open === true) {
      UserList(dispatch);
      RoleList(dispatch);
    }
  }, [dispatch, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      changeField({
        form: `addForm`,
        key: name,
        value: value,
      })
    );
  }

  const handleSave = (e) => {
    e.preventDefault();

    CreateMember(dispatch, addForm, project_id, handleClose);
  }

  return (
    <React.Fragment>
      <Button
        id="new-button"
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}>
        New
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
          style={{ padding: 16 }}
        >
          Craete New Member
        </Typography>

        <DialogContent>
          <form name='team_add' onSubmit={handleSave} autoComplete="off">

            <Box display="flex" alignItems="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="username-select-label">Username</InputLabel>
                <Select
                  labelId="username-select-label"
                  id="username-select"
                  name="username"
                  value={addForm.username}
                  onChange={handleChange}
                  required
                >
                  {userList.list !== undefined && userList.list !== null ?
                    userList.list.map((list, index) => (
                      <MenuItem key={index} value={list.name}>{list.name}</MenuItem>
                    ))
                    : <Typography key="no-option">No Option</Typography>
                  }
                </Select>

              </FormControl>
              <UserAdd />
            </Box>
            <Box display="flex" alignItems="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="rolename-select-label">Role</InputLabel>
                <Select
                  labelId="rolename-select-label"
                  id="rolename-select"
                  name="rolename"
                  value={addForm.rolename}
                  onChange={handleChange}
                  required
                >
                  {roleList.list !== undefined && roleList.list !== null ?
                    roleList.list.map((list, index) => (
                      <MenuItem key={index} value={list.name}>{list.name}</MenuItem>
                    ))
                    : <Typography key="no-option">No Option</Typography>
                  }
                </Select>

              </FormControl>
              <RoleAdd />
            </Box>

            <DialogActions style={{ paddingRight: 0 }}>
              <Button type="submit" onClick={handleSave} variant="contained" color="primary" >
                Save
              </Button>

            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

    </React.Fragment>
  );
};

export default TeamAdd;
