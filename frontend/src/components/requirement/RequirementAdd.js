import React, { useState } from 'react';
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
import { changeField, initializeForm } from '../../modules/requirement';
import { CreateRequirement } from '../../lib/api/requirement';

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

const RequirementAdd = ({ project_id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { addForm } = useSelector(({ requirement }) => ({
    addForm: requirement.addForm,
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
    CreateRequirement(dispatch, addForm, project_id, handleClose);
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
          Create New Requirement
        </Typography>

        <DialogContent>
          <form name='requirement_add' onSubmit={handleSave} autoComplete="off">
            <TextField autoFocus margin="dense" name="title" label="Title" type="text" value={addForm.title} onChange={handleChange} inputProps={{ maxLength: 32 }} required fullWidth />
            <TextField margin="dense" name="description" label="Description" type="text" value={addForm.description} onChange={handleChange} inputProps={{ maxLength: 128 }} fullWidth />

            <Box display="flex" alignItems="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="requirement-type-select-label">Requirement Type</InputLabel>
                <Select
                  labelId="requirement-type-select-label"
                  id="requirement-type-select"
                  name="requirement_type"
                  value={addForm.requirement_type}
                  onChange={handleChange}
                  required
                >
                  <MenuItem key={1} value="FUNCTIONAL">FUNCTIONAL</MenuItem>
                  <MenuItem key={2} value="NON_FUNCTIONAL">NON_FUNCTIONAL</MenuItem>
                </Select>

              </FormControl>
            </Box>

            <DialogActions style={{ paddingRight: 0 }}>
              <Button type="submit" onClick={handleSave} variant="contained" color="primary" >
                Save
              </Button>

            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* {
        backdrop === true ?
          <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop> : null
      } */}

    </React.Fragment>
  );
};

export default RequirementAdd;
