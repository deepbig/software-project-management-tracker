import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@material-ui/core';
import { changeField, initializeForm } from '../../modules/project';
import { UserList } from '../../lib/api/team';
import UserAdd from '../user/UserAdd';
import { CreateProject } from '../../lib/api/project';

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

const ProjectAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { addForm, userList } = useSelector(({ project, team }) => ({
    addForm: project.addForm,
    userList: team.userList,
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

    CreateProject(dispatch, addForm, handleClose);
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
          Create New Project
        </Typography>

        <DialogContent>
          <form name='project_add' onSubmit={handleSave} autoComplete="off">
            <TextField autoFocus margin="dense" name="name" label="Name" type="text" value={addForm.name} onChange={handleChange} inputProps={{ maxLength: 32 }} required fullWidth />
            <TextField margin="dense" name="description" label="Description" type="text" value={addForm.description} onChange={handleChange} inputProps={{ maxLength: 128 }} fullWidth />

              <Box display="flex" alignItems="center">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Project Manager</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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

export default ProjectAdd;
