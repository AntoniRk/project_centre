import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Chip, 
  Divider,
  Grid,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Launch as LaunchIcon,
  Code as CodeIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { projects } from '../data/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || '0'));

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Project not found
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Powrót
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Powrót
      </Button>
      
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Card>
          {project.imageUrl && (
            <CardMedia
              component="img"
              height="300"
              image={project.imageUrl}
              alt={project.title}
              sx={{ objectFit: 'cover' }}
            />
          )}
        </Card>
        
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {project.title}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {project.technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Typography variant="body1" paragraph>
            {project.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Szczegóły projektu
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Technologie" 
                    secondary={project.technologies.join(', ')} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Stworzony" 
                    secondary="Marzec 2025" 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Repozytorium chyba prywatne" 
                    secondary="https://github.com/AntoniRk/project_centre" 
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Kluczowe funkcje
              </Typography>
              
              <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography variant="body2">
                    Responsywność na każdym urządzeniu
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography variant="body2">
                    Obsługa stanu z Redux
                  </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Typography variant="body2">
                    Integracja API z cache'owaniem
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          {project.path && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<LaunchIcon />}
                onClick={() => navigate(project.path || '/')}
              >
                Uruchom Projekt
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectDetails;