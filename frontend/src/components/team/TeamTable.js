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
import { DeleteMember, MemberList } from '../../lib/api/team';
import TeamAdd from './TeamAdd';
import { changeFieldWoForm } from '../../modules/team';
import DeleteIcon from '@material-ui/icons/Delete';

const headCells = [
  { id: 'USERNAME', numeric: false, label: 'Username' },
  { id: 'ROLENAME', numeric: false, label: 'Role' },
];

const TeamTable = ({ project_id }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { memberList, selected } = useSelector(({ team }) => ({
    memberList: team.memberList,
    selected: team.selected,
  }))

  useEffect(() => {
    MemberList(dispatch, project_id);
  }, [dispatch, project_id]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    dispatch(changeFieldWoForm({
      key: 'selected',
      value: memberList.list[index]
    }))
  };

  const handleClickDelete = (e) => {
    //need to create api call for this function;
    e.preventDefault();
    DeleteMember(dispatch, project_id, selected);
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
                Team Members
              </Typography>
            </Paper>
          </Grid>
          <Box>
            <TeamAdd project_id={project_id} />
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
                {memberList.list !== undefined && memberList.list !== null && memberList.list.length > 0 ?
                  memberList.list.map((list, index) => {
                    const labelId = `project-table-${index}`;
                    return (
                      <TableRow
                        hover
                        selected={selectedIndex === memberList.list.indexOf(list)}
                        onClick={() => handleListItemClick(memberList.list.indexOf(list))}
                        key={labelId}
                      >
                        <TableCell key={labelId + '1'} align="center">{list.username}</TableCell>
                        <TableCell key={labelId + '2'} align="center">{list.rolename}</TableCell>
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
                  memberList.list !== undefined && (memberList.list === null || memberList.list.length === 0) ?
                    <TableRow
                      hover
                    >
                      <TableCell colSpan={4} key={'team-table-initial'} align="center">
                        <Typography
                          color="textSecondary"
                        >
                          There is no team member to display.
                        </Typography>
                      </TableCell>
                    </TableRow>
                    : null}
              </TableBody>
            </Table>
          </TableContainer>
          {memberList === undefined ? <Box display="flex" justifyContent="center" m={1} p={1}><CircularProgress color="inherit" /></Box> : null}

        </Box>

      </Box>

    </Card>
  );
};

export default TeamTable;