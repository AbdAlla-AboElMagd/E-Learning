// import * as React from 'react';
// import Test from "./Test";
// import ListCourses from "./api/ListCourses";
// import Card from './components/Card';
// import Table from './components/Table';
// import Form from './components/Form';
// import AddCourse from './api/AddCours';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import { Link } from "react-router-dom";
// import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';
// import CastForEducationIcon from '@mui/icons-material/CastForEducation';
// import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import PreviewIcon from '@mui/icons-material/Preview';


// const NAVIGATION = [
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'courses',
//     title: 'Courses',
//     icon: <CastForEducationIcon />,
//     children: [
//         {
//           segment:"addcourse",
//           title: 'Add Course',
//           icon: <AddBoxIcon />,
//         },
//         {
//           segment: 'listcourses',
//           title: 'Show Courses',
//           icon: <PreviewIcon />,
//         },
//       ],
//   },
//   {
//     segment: 'users',
//     title: 'Users',
//     icon: <PermContactCalendarIcon />,
//   },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//   },
// ];


// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       {pathname}==="courses/listcourses" ? <Typography> <ListCourses/> </Typography>
//       <Typography>Dashboard content for {pathname}</Typography>
//       <Typography> <AddCourse/> </Typography>

//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function Home(props) {
//   const { window } = props;

//   const [session, setSession] = React.useState({
//     user: {
//       name: 'Bharat Kashyap',
//       email: 'bharatkashyap@outlook.com',
//       image: 'https://avatars.githubusercontent.com/u/19550456',
//     },
//   });

//   const authentication = React.useMemo(() => {
//     return {
//       signIn: () => {
//         setSession({
//           user: {
//             name: 'Samira mustafa',
//             email: 'samiramustafa@outlook.com',
//             image: 'https://avatars.githubusercontent.com/u/19550456',
//           },
//         });
//       },
//       signOut: () => {
//         setSession(null);
//       },
//     };
//   }, []);

//   const router = useDemoRouter('/dashboard');


//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     // preview-start
//     <AppProvider
//       session={session}
//       authentication={authentication}
//       navigation={NAVIGATION}
//       //router={router}
//       theme={demoTheme}
//       //window={demoWindow}
//     >
//       <DashboardLayout>
//         <DemoPageContent pathname={router.pathname}  onClick={(e)=> e.preventDefault()} />

//       </DashboardLayout>
//     </AppProvider>
//     // preview-end
//   );
// }

// Home.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func,
// };

// export  default Home 
