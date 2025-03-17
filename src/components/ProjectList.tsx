import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {projects.map(project => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
        
        {projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              Brak projektów
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectList;