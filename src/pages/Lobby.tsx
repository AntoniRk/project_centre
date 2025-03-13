import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  Chip,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ProjectList from '../components/ProjectList';
import { projects } from '../data/projects';

const Lobby: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // Zbieranie wszystkich unikalnych technologii
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();
  
  // Filtrowanie projektów
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech ? project.technologies.includes(selectedTech) : true;
    
    return matchesSearch && matchesTech;
  });
  
  const handleTechFilter = (tech: string) => {
    setSelectedTech(prevTech => prevTech === tech ? null : tech);
  };
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Projects Lobby
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Welcome to my project showcase. Explore the different projects and click on them to learn more.
          </Typography>
        </Box>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Search projects"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Filter by technology:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
              {allTechnologies.map(tech => (
                <Chip
                  key={tech}
                  label={tech}
                  clickable
                  color={selectedTech === tech ? "primary" : "default"}
                  onClick={() => handleTechFilter(tech)}
                  variant={selectedTech === tech ? "filled" : "outlined"}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
        
        <ProjectList projects={filteredProjects} />
      </Container>
    </Box>
  );
};

export default Lobby;