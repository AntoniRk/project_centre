import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography, 
  Chip, 
  Box,
  useTheme
} from '@mui/material';
import { Launch as LaunchIcon, Info as InfoIcon } from '@mui/icons-material';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        // Dodajemy specjalne style dla trybu ciemnego
        boxShadow: isDarkMode 
          ? '0 4px 12px rgba(255, 255, 255, 0.1)' 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: isDarkMode 
            ? '0 8px 24px rgba(255, 255, 255, 0.15)' 
            : '0 8px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      {project.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={project.imageUrl}
          alt={project.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {project.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          startIcon={<InfoIcon />}
          onClick={() => navigate(`/project/${project.id}`)}
        >
          Details
        </Button>
        {project.path && (
          <Button 
            size="small" 
            color="secondary" 
            startIcon={<LaunchIcon />}
            onClick={() => navigate(project.path || '/')}
          >
            Launch
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;