import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  Chip,
  Avatar,
  Link,
  useTheme
} from '@mui/material';
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Lightbulb as SkillIcon
} from '@mui/icons-material';

const About: React.FC = () => {
  const theme = useTheme();

  const developerInfo = {
    name: "Antoni Roskosz",
    title: "Programista",
    avatar: "/path/to/your/avatar.jpg", // Dodaj ścieżkę do zdjęcia
    bio: "tak o",
    email: "amroskosz@gmail.com",
    github: "https://github.com/twojusername",
    skills: [
      "C++", "PHP", "C#", "MySQL", "Python", "React", "TypeScript", "JavaScript", "HTML5", "CSS3",
      "Material UI", "Redux", "Next.js", "GraphQL", "Node.js",
      "Git", "Webpack", "Jest", "Cypress", "Responsive Design"
    ],
    projects: [
      {
        name: "Centrum Projektów",
        description: "Centrum z różnymi projektami.",
        technologies: ["React", "TypeScript", "Material UI", "React Router", "LocalStorage", "..."],
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3}>
            <Avatar
              src={developerInfo.avatar}
              alt={developerInfo.name}
              sx={{
                width: 150,
                height: 150,
                border: '4px solid white',
                boxShadow: theme.shadows[3]
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" component="h1" gutterBottom>
              {developerInfo.name}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {developerInfo.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {developerInfo.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link href={`mailto:${developerInfo.email}`} color="inherit" underline="none">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon />
                  <Typography variant="body2">Email</Typography>
                </Box>
              </Link>
              <Link href={developerInfo.github} target="_blank" rel="noopener noreferrer" color="inherit" underline="none">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon />
                  <Typography variant="body2">GitHub</Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          {/* Skills Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SkillIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Umiejętności
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {developerInfo.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "default"}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* Projects Section */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Projekty
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {developerInfo.projects.map((project, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      mb: 2
                    }}
                  >
                    <Typography variant="h6" component="h3" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;