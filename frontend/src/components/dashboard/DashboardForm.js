import React, { useEffect } from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { CategoryList } from '../../lib/api/category';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const DashboardForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   CategoryList(dispatch);
  // }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {/* <Grid item xl={6} lg={6} sm={6} xs={12}>
        <RecentActivity />
      </Grid>
      <Grid item xl={6} lg={6} sm={6} xs={12}>
        <RecentResult />
      </Grid>
      <Grid item xl={3} lg={3} sm={3} xs={12}>
        <BestPosting type="Activity" count="Hours" />
      </Grid>
      <Grid item xl={3} lg={3} sm={3} xs={12}>
        <BestPosting type="Activity" count="Counts" />
      </Grid>
      <Grid item xl={3} lg={3} sm={3} xs={12}>
        <BestPosting type="Result" count="Hours" />
      </Grid>
      <Grid item xl={3} lg={3} sm={3} xs={12}>
        <BestPosting type="Result" count="Counts" />
      </Grid>
      <Grid item md={6} sm={12}>
        <WeeklyTrend type="Activity" count="Counts" />
      </Grid>
      <Grid item md={6} sm={12}>
        <WeeklyTrend type="Activity" count="Hours" />
      </Grid>
      <Grid item md={6} sm={12}>
        <WeeklyTrend type="Result" count="Counts" />
      </Grid>
      <Grid item md={6} sm={12}>
        <WeeklyTrend type="Result" count="Hours" />
      </Grid> */}
    </Grid>
  );
};

export default DashboardForm;
