import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useNavigate } from 'react-router-dom';
import UserIconComponent from './userIcon';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const menuItems = [
      { text: 'Home', path: '/home' },
      { text: 'Customer', path: '/dashboard/customer' },
      { text: 'Room', path: '/dashboard/room' },
      { text: 'Booking', path: '/dashboard/booking' },
      { text: 'Payment', path: '/dashboard/payment' },
      { text: 'Staff', path: '/dashboard/staff' },
      { text: 'Services', path: '/dashboard/service' },
      { text: 'Inventory', path: '/dashboard/inventory' },
      { text: 'Report', path: '/dashboard/report' }
  ];

  const handleForItemClick = (item: any) => {
      navigate(item.path);
  }

  const handleDrawerOpen = () => {
      setOpen(true);
  };

  const handleDrawerClose = () => {
      setOpen(false);
  };

  return (
      <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} sx={{backgroundColor:'#023e8a'}}>
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                      Hotel Management System
                  </Typography>
                  <UserIconComponent />
              </Toolbar>
          </AppBar>
          <Drawer
              sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                  },
              }}
              variant="persistent"
              anchor="left"
              open={open}
          >
              <DrawerHeader>
              <Typography
               sx={{fontWeight:'bold'}}
               variant="h6" noWrap component="div">
                      HMS
                  </Typography>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                  {menuItems.map((item) => (
                      <ListItem key={item.text} disablePadding onClick={() => handleForItemClick(item)}>
                          <ListItemButton>
                              <ListItemText primary={item.text} />
                          </ListItemButton>
                      </ListItem>
                  ))}
              </List>
              <Divider />
          </Drawer>
          <Main open={open}>
              <DrawerHeader />
              <Outlet />
          </Main>
      </Box>
  );
}
