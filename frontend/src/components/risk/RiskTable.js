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
  IconButton
} from '@material-ui/core';
import { DeleteRisk, RiskList } from '../../lib/api/risk';
import RiskAdd from './RiskAdd';
import { changeFieldWoForm } from '../../modules/risk';
import DeleteIcon from '@material-ui/icons/Delete';

const headCells = [
  { id: 'USERNAME', numeric: false, label: 'Username' },
  { id: 'ROLENAME', numeric: false, label: 'Role' },
];

const TeamTable = ({ project_id }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { riskList, selected } = useSelector(({ risk }) => ({
    riskList: risk.riskList,
    selected: risk.selected,
  }))

  useEffect(() => {
    RiskList(dispatch, project_id);
  }, [dispatch, project_id]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    dispatch(changeFieldWoForm({
      key: 'selected',
      value: riskList.list[index]
    }))
  };

  const handleClickDelete = (e) => {
    //need to create api call for this function;
    e.preventDefault()
    DeleteRisk(dispatch, project_id, selected);
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
                Risks
              </Typography>
            </Paper>
          </Grid>
          <Box>
            <RiskAdd project_id={project_id} />
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
                {riskList.list !== undefined && riskList.list !== null && riskList.list.length > 0 ?
                  riskList.list.map((list, index) => {
                    const labelId = `project-table-${index}`;
                    return (
                      <TableRow
                        hover
                        selected={selectedIndex === riskList.list.indexOf(list)}
                        onClick={() => handleListItemClick(riskList.list.indexOf(list))}
                        key={labelId}
                      >
                        <TableCell key={labelId + '1'} align="center">{list.name}</TableCell>
                        <TableCell key={labelId + '2'} align="center">{list.priority}</TableCell>
                        <TableCell key={labelId + '3'} align="center" padding="checkbox">
                          {selected.id === list.id ?
                            <IconButton onClick={handleClickDelete}>
                              <DeleteIcon />
                            </IconButton>
                            : null
                          }
                        </TableCell>
                      </TableRow>
                    )
                  }) :
                  riskList.list !== undefined && (riskList.list === null || riskList.list.length === 0) ?
                    <TableRow
                      hover
                    >
                      <TableCell colSpan={4} key={'risk-table-initial'} align="center">
                        <Typography
                          color="textSecondary"
                        >
                          There is no risk to display.
                        </Typography>
                      </TableCell>
                    </TableRow>
                    : null}
              </TableBody>
            </Table>
          </TableContainer>
          {riskList === undefined ? <Box display="flex" justifyContent="center" m={1} p={1}><CircularProgress color="inherit" /></Box> : null}

        </Box>

      </Box>

    </Card>
  );
};

export default TeamTable;