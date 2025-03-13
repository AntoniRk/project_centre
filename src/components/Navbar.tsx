// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Container, 
  useMediaQuery, 
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Code as CodeIcon, 
  Info as InfoIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleColorMode } = useThemeContext();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isDarkMode = mode === 'dark';

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || 
       (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Projects', icon: <CodeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' }
  ];

  const drawer = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={toggleColorMode}>
          <ListItemIcon>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: 'none',
              color: 'white',
              letterSpacing: '0.5px'
            }}
          >
            Projects Lobby
          </Typography>
          
          {!isMobile && (
            <>
              <div style={{ flexGrow: 1 }}>
                {menuItems.map((item) => (
                  <Button 
                    key={item.text}
                    color="inherit" 
                    component={RouterLink} 
                    to={item.path}
                    startIcon={item.icon}
                    sx={{ ml: 2 }}
                  >
                    {item.text}
                  </Button>
                ))}
              </div>
              
              <ThemeToggle />
            </>
          )}
        </Toolbar>
      </Container>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;