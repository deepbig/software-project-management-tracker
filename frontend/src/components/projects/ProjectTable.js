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
  CircularProgress,
  Card,
  IconButton
} from '@material-ui/core';
import { ProjectList, DeleteProject } from '../../lib/api/project';
import ProjectAdd from './ProjectAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { changeFieldWoForm } from '../../modules/project';
import { initializeState as initializeStateTeam } from '../../modules/team';
import { initializeState as initializeStateRisk } from '../../modules/risk';
import { initializeState as initializeStateRequirement } from '../../modules/requirement';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '../../lib/alert';

const headCells = [
  { id: 'PROJECT_NAME', numeric: false, label: 'Project Name' },
  { id: 'PROJECT_MANAGER', numeric: false, label: 'Project Manager' },
  { id: 'LAST_MODIFIED', numeric: false, label: 'Last Modified' }
];

const ProjectTable = React.memo(() => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { projectList, selected } = useSelector(({ project }) => ({
    projectList: project.projectList,
    selected: project.selected,
  }))

  useEffect(() => {
    ProjectList(dispatch);

    dispatch(initializeStateTeam());
    dispatch(initializeStateRisk());
    dispatch(initializeStateRequirement());

  }, [dispatch]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    dispatch(changeFieldWoForm({
      key: 'selected',
      value: projectList.list[index]
    }))
  };


  const handleClickDelete = () => {
    Alert(1, `Are you sure to delete this project?`, 'Cancel', "Yes", () => { handleDelete() });
    document.getElementById("alert-button-1").focus();
  }
  const handleDelete = () => {
    DeleteProject(dispatch, selected);
  }


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
                  <TableCell style={{ width: 10 }} />
                </TableRow>
              </TableHead>

              <TableBody>
                {projectList.list !== undefined && projectList.list !== null && projectList.list.length > 0 ?
                  projectList.list.map((list, index) => {
                    const labelId = `project-table-${index}`;
                    return (
                      <TableRow
                        hover
                        selected={selectedIndex === projectList.list.indexOf(list)}
                        onClick={() => handleListItemClick(projectList.list.indexOf(list))}
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
                            {selected.id === list.id ?
                              <IconButton color="primary" onClick={handleClickDelete}>
                                <DeleteIcon />
                              </IconButton>
                              : null}
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
                  projectList.list !== undefined && (projectList.list === null || projectList.list.length === 0) ?
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