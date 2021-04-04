import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
} from '@material-ui/core';
import { TotalPersonHoursList } from '../../lib/api/requirement';
import TotalHourChart from '../charts/TotalHourChart';

const TeamTable = ({ project_id }) => {
  const dispatch = useDispatch();

  const { totalHourChart } = useSelector(({ requirement }) => ({
    totalHourChart: requirement.totalPersonHoursList,
  }))

  useEffect(() => {
    TotalPersonHoursList(dispatch, project_id);
  }, [dispatch, project_id]);

  return (
    <Card>
      <Box p={2}>
        <Box display="flex" justifyContent="flex-end">
          <Grid container justify="flex-start" alignItems="center">
            <Paper elevation={0}>
              <Typography
                align="center"
                color="textPrimary"
                variant="h4">
                Total Elapsed Person Hours
              </Typography>
            </Paper>
          </Grid>
        </Box>
        <Paper elevation={0} style={{ height: totalHourChart !== undefined && totalHourChart !== null && Object.keys(totalHourChart).length > 0 && totalHourChart.hour_total !== 0 ? 250 : 30 }}>
          {totalHourChart !== undefined && totalHourChart !== null && Object.keys(totalHourChart).length > 0 && totalHourChart.hour_total !== 0 ?
            <TotalHourChart chartData={totalHourChart} />
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
      </Box>
    </Card>
  );
};

export default TeamTable;