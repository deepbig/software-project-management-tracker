import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectDetail } from '../../lib/api/project';
import TeamTable from '../team/TeamTable';
import RiskTable from '../risk/RiskTable';
import RequirementTable from '../requirement/RequirementTable';
import TotalHour from '../totalHours/TotalHour';
import { initializeState as initializeStateProject } from '../../modules/project';

const DashboardForm = ({ project_id }) => {
  const dispatch = useDispatch();

  const { projectDetail } = useSelector(({ project }) => ({
    projectDetail: project.projectDetail,
  }))

  useEffect(() => {
    ProjectDetail(dispatch, project_id);

    dispatch(initializeStateProject());
  }, [dispatch, project_id]);

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Typography
          align="left"
          color="textPrimary"
          variant="h4">
          {projectDetail.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align="left"
          color="textPrimary"
          variant="subtitle1">
          {projectDetail.description}
        </Typography>
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <TeamTable project_id={project_id} />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <RiskTable project_id={project_id} />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <TotalHour project_id={project_id} />
      </Grid>
      <Grid item xs={12}>
        <RequirementTable project_id={project_id} />
      </Grid>
    </Grid>
  );
};

export default DashboardForm;
