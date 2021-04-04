import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { CreateRole } from '../../lib/api/team';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const RoleAdd = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleClickOpen = (event) => {
    event.target.blur();
    setOpen(true);
  }

  const handleClose = () => {
    setValue('');
    setError(false);
    setOpen(false);
    document.activeElement.blur();
  }
  const handleChange = (event) => {
    if (error === true && event.target.value !== '') {
      setError(false);
    }
    setValue(event.target.value);
  }

  const handleSave = (event) => {
    if (value !== '' && value !== null) {
      CreateRole(dispatch, value, handleClose);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <IconButton id="add-circle-icon" onClick={handleClickOpen} style={{ padding: 5 }}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography variant="h3" align="center">New Role</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type the role name you want to create.
          </DialogContentText>
          <TextField
            autoFocus
            error={error}
            required
            helperText={error === true ? "Role name cannot be empty." : null}
            margin="dense"
            id="Rolename"
            label="Rolename"
            value={value}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" >
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleAdd;