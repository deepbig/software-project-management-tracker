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
import { changeField, initializeForm } from '../../modules/risk';
import { CreateRisk } from '../../lib/api/risk';

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

const RiskAdd = ({ project_id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { addForm } = useSelector(({ risk }) => ({
    addForm: risk.addForm,
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
    CreateRisk(dispatch, addForm, project_id, handleClose);
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
          Craete New Risk
        </Typography>

        <DialogContent>
          <form name='risk_add' onSubmit={handleSave} autoComplete="off">
            <TextField autoFocus margin="dense" name="name" label="Name" type="text" value={addForm.name} onChange={handleChange} inputProps={{ maxLength: 32 }} required fullWidth />

              <Box display="flex" alignItems="center">
            <FormControl className={classes.formControl}>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  name="priority"
                  value={addForm.priority}
                  onChange={handleChange}
                  required
                >
                  <MenuItem key={1} value="LOW">LOW</MenuItem>
                  <MenuItem key={2} value="NORMAL">NORMAL</MenuItem>
                  <MenuItem key={3} value="HIGH">HIGH</MenuItem>
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

    </React.Fragment>
  );
};

export default RiskAdd;
