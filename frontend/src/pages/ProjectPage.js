import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../components/styles/Page';
import ProjectTable from '../components/projects/ProjectTable';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: 'calc(100% +256px)',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProjectPage = () => {
  const classes = useStyles();
  
  return (
    <Page
      className={classes.root}
      title="Projects"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
        {/* <Container maxWidth={false}> */}
          <ProjectTable />
        </Container>
      </Box>
    </Page>
  );
};

export default ProjectPage;
