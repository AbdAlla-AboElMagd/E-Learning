
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Reset } from "../../Redux/Actions/ChangeFav";
import { login, logout } from "../../Redux/Actions/authAction";


//icons
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PreviewIcon from '@mui/icons-material/Preview';
import { LocalDrinkOutlined } from '@mui/icons-material';

//component
import AdminPanel from './../AdminPanel'
import Login from '../../Pages/Login';
import Unauthorized from './../pages/Unauthorized';



const drawerWidth = 240;  


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


let user = useSelector((state) => state.auth.user);
let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

const dispatch = useDispatch();
const history = useHistory();

const handleLogout = () => {
  dispatch(Reset());
  dispatch(logout()); 
   history.push("/E-Learning/login"); 
};


// const dispatch = useDispatch();
// dispatch(Reset());
// dispatch(logout());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            
            web site
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <DashboardIcon sx={{ mr: 1 , ml: 2}} />
        Profile 
       </Typography>

        <Divider sx={{ mb: 2 }}/>

        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <CastForEducationIcon sx={{ mr: 1 , ml: 2}}/>
        Courses 
       </Typography>

      

    <List>
      <ListItem>
        <ListItemButton component={Link} to="/E-Learning/userProfile">
          <ListItemIcon>
            <AddBoxIcon sx={{ mr: 1, ml: 2 }} />
          </ListItemIcon>
          <ListItemText primary=" Your Profile" />
        </ListItemButton>
      </ListItem>
    </List>
{
  isLoggedIn? (<List>
    <ListItem>
      <ListItemButton  onClick={handleLogout}>
        <ListItemIcon>
          <AddBoxIcon sx={{ mr: 1, ml: 2 }} />
        </ListItemIcon>
        <ListItemText primary="Logout " />
      </ListItemButton>
    </ListItem>
  </List>):(

    <List>
      <ListItem>
        <ListItemButton component={Link} to="/E-Learning/login">
          <ListItemIcon>
            <AddBoxIcon sx={{ mr: 1, ml: 2 }} />
          </ListItemIcon>
          <ListItemText primary="Login " />
        </ListItemButton>
      </ListItem>
    </List>
    )}

    

      </Drawer>
      {isLoggedIn && user.role === "admin" ? <AdminPanel />:null}


      <Main open={open}>
        {/* <DrawerHeader /> */}
      </Main>
    </Box>
  );
}
//post('https://api-generator.retool.com/L5z0NU/courses',