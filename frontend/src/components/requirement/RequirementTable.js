import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@material-ui/core';
import { DeleteRequirement, RequirementList } from '../../lib/api/requirement';
import RequirementAdd from './RequirementAdd';
import HourAdd from './HourAdd';
import { changeFieldWoForm } from '../../modules/requirement';
import DeleteIcon from '@material-ui/icons/Delete';

const headCells = [
  { id: 'TITLE', numeric: false, label: 'Name' },
  { id: 'REQUIREMENT_TYPE', numeric: false, label: 'Requirement Type' },
  { id: 'HOUR_TOTAL', numeric: false, label: 'Total Person Hours' },
  { id: 'LAST_MODIFIED', numeric: false, label: 'Last Modified' },
];

const RequirementTable = ({ project_id }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { requirementList, selected } = useSelector(({ requirement }) => ({
    requirementList: requirement.requirementList,
    selected: requirement.selected,
  }))

  useEffect(() => {
    RequirementList(dispatch, project_id);
  }, [dispatch, project_id]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    dispatch(changeFieldWoForm({
      key: 'selected',
      value: requirementList.list[index]
    }))
  };

  const handleClickDelete = (e) => {
    //need to create api call for this function;
    e.preventDefault()
    DeleteRequirement(dispatch, project_id, selected);
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
                Requirements
              </Typography>
            </Paper>
          </Grid>
          <Box>
            <RequirementAdd project_id={project_id} />
          </Box>

        </Box>

        <Box display="fixed" flexDirection="column">
          <TableContainer style={{ maxHeight: 239 }}>
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
                {requirementList.list !== undefined && requirementList.list !== null && requirementList.list.length > 0 ?
                  requirementList.list.map((list, index) => {
                    const labelId = `requirement-table-${index}`;
                    return (
                      <TableRow
                        hover
                        selected={selectedIndex === requirementList.list.indexOf(list)}
                        onClick={() => handleListItemClick(requirementList.list.indexOf(list))}
                        key={labelId}
                      >
                        <TableCell key={labelId + '1'} align="center">{list.title}</TableCell>
                        <TableCell key={labelId + '2'} align="center">{list.requirement_type}</TableCell>
                        <TableCell key={labelId + '3'} align="center">{list.hour_total}</TableCell>
                        <TableCell key={labelId + '4'} align="center">{list.last_modified}</TableCell>
                        <TableCell key={labelId + '5'} align="center" padding="checkbox">
                          {selected.id === list.id ?
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              textOverflow="ellipsis" overflow="hidden"
                            >
                              <HourAdd project_id={project_id} list={list} />
                              <IconButton style={{ padding: 0 }} onClick={handleClickDelete}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            : null
                          }
                        </TableCell>
                      </TableRow>
                    )
                  }) :
                  requirementList.list !== undefined && (requirementList.list === null || requirementList.list.length === 0) ?
                    <TableRow
                      hover
                    >
                      <TableCell colSpan={5} key={'requirement-table-initial'} align="center">
                        <Typography
                          color="textSecondary"
                        >
                          There is no requirement to display.
                        </Typography>
                      </TableCell>
                    </TableRow>
                    : null}
              </TableBody>
            </Table>
          </TableContainer>
          {requirementList === undefined ? <Box display="flex" justifyContent="center" m={1} p={1}><CircularProgress color="inherit" /></Box> : null}

        </Box>

      </Box>

    </Card>
  );
};

export default RequirementTable;