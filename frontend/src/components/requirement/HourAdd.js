import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper,
  Box
} from '@material-ui/core';
import { changeField, initializeForm } from '../../modules/requirement';
import { UpdateHours } from '../../lib/api/requirement';
import EditIcon from '@material-ui/icons/Edit';
import TotalHourChart from '../charts/TotalHourChart';

const RequirementAdd = ({ project_id, list }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { updateForm } = useSelector(({ requirement }) => ({
    updateForm: requirement.updateForm,
  }))

  const handleClickOpen = (event) => {
    setOpen(true);
    event.target.blur();
  }

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeForm('updateForm'));
    document.activeElement.blur();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      changeField({
        form: `updateForm`,
        key: name,
        value: isNaN(parseInt(value)) ? 0 : parseInt(value),
      })
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    UpdateHours(dispatch, updateForm, project_id, list.id, handleClose);
  }

  return (
    <React.Fragment>
      <IconButton style={{ padding: 0 }} onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
          style={{ padding: 16 }}
        >
          Add Requirement Hours
        </Typography>

        <DialogContent>
          <form name='hour_add' onSubmit={handleSave} autoComplete="off">
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6} sm={4}>
                <TextField margin="dense" name="hour_analysis" label="Analysis" type="number" value={updateForm.hour_analysis} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField margin="dense" name="hour_designing" label="Designing" type="number" value={updateForm.hour_designing} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField margin="dense" name="hour_coding" label="Coding" type="number" value={updateForm.hour_coding} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField margin="dense" name="hour_testing" label="Testing" type="number" value={updateForm.hour_testing} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={7} sm={4}>
                <TextField margin="dense" name="hour_proj_mgt" label="Proj. Management" type="number" value={updateForm.hour_proj_mgt} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={12}>
                {/* <TotalHourChart chartData={list} /> */}


                <Box>
                    <Grid container justify="center" alignItems="center">
                      <Paper elevation={0}>
                        <Typography
                          align="center"
                          color="textPrimary"
                          variant="h4">
                          Current Requirement Hours
                        </Typography>
                      </Paper>
                    </Grid>
                  </Box>
                  <Paper elevation={0} style={{ height: list !== undefined && list !== null && Object.keys(list).length > 0 && list.hour_total !== 0 ? 250 : 30 }}>
                    {list !== undefined && list !== null && Object.keys(list).length > 0 && list.hour_total !== 0 ?
                      <TotalHourChart chartData={list} />
                      :
                      <Box p={1}>
                        <Typography
                          align="center"
                          color="textSecondary"
                        >
                          There is no data to display.
                      </Typography>
                      </Box>
                    }
                  </Paper>
              </Grid>

            </Grid>


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

export default RequirementAdd;
