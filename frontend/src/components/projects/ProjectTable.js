import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  CircularProgress,
  Card,
  IconButton
} from '@material-ui/core';
import { ProjectList } from '../../lib/api/project';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ProjectAdd from './ProjectAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';

const headCells = [
  { id: 'PROJECT_NAME', numeric: false, label: 'Project Name' },
  { id: 'PROJECT_MANAGER', numeric: false, label: 'Project Manager' },
  { id: 'LAST_MODIFIED', numeric: false, label: 'Last Modified' }
];

const ProjectTable = React.memo(() => {
  const dispatch = useDispatch();

  const { projectList } = useSelector(({ project }) => ({
    projectList: project.projectList,
  }))

  useEffect(() => {
    ProjectList(dispatch);
  }, []);


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
                Project List
              </Typography>
            </Paper>
          </Grid>
          <Box>
            <ProjectAdd />
          </Box>

        </Box>

        <Box display="fixed" flexDirection="column">
          <TableContainer>
            <Table size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align='center'
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                  <TableCell key="SHOW_ALL" align='center' />
                </TableRow>
              </TableHead>

              <TableBody>
                {projectList.list !== undefined && projectList.list !== null && projectList.list.length > 0 ?
                  projectList.list.map((list, index) => {
                    const labelId = `project-table-${index}`;
                    return (
                      <TableRow
                        hover
                        key={labelId}
                      >
                        <TableCell key={labelId + '1'} align="center">{list.name}</TableCell>
                        <TableCell key={labelId + '2'} align="center">{list.project_manager}</TableCell>
                        <TableCell key={labelId + '3'} align="center">{list.last_modified}</TableCell>
                        <TableCell key={labelId + '4'} align="center" padding="checkbox">
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <RouterLink to={`/app/project/${list.id}/dashboard`}>
                              <IconButton color="primary">
                                <DashboardIcon />
                              </IconButton>
                            </RouterLink>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  }) :
                  projectList.list !== undefined && (projectList.list == null || projectList.list.length == 0) ?
                    <TableRow
                      hover
                    >
                      <TableCell colSpan={4} key={'project-table-initial'} align="center">
                        <Typography
                          color="textSecondary"
                          component="div"
                        >
                          <Box fontStyle="italic" m={1}>
                            There is no project to display.
                      </Box>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    : null}
              </TableBody>
            </Table>
          </TableContainer>
          {projectList === undefined ? <Box display="flex" justifyContent="center" m={1} p={1}><CircularProgress color="inherit" /></Box> : null}

        </Box>

      </Box>

    </Card>
  );
});

export default ProjectTable;