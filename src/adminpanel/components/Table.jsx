import * as React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Snackbar, Alert } from "@mui/material";
import UpdateCourse from "../api/UpdateCourse";
import axios from "axios";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import ListCourses from "../api/ListCourses";

const headCells = [
  { id: "id", label: "ID" },
  { id: "course_name", label: "Title" },
  { id: "course_image", label: "Image" },
  { id: "price", label: "Price" },
  { id: "instructor", label: "Instructor" },
  { id: "course_description", label: "Description" },
  { id: "action", label: "Action" },
];

export default function Tablee() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    axios
      .get("https://retoolapi.dev/L5z0NU/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => setErrors(error.message));
  }, [refresh]);

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`https://api-generator.retool.com/L5z0NU/courses/${selectedId}`)
        .then(() => {
          console.log(`Course ${selectedId} deleted successfully`);
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== selectedId)
          );
          setSnackbarOpen(true);
        })
        .catch((error) => console.error("Error deleting course:", error))
        .finally(() => {
          setOpen(false);
          setSelectedId(null);
        });

      <ListCourses />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h3"
            id="tableTitle"
            component="div"
            color="info"
          >
            Courses
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    sx={{
                      ...(headCell.id === "course_image" && {
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "table-cell",
                          lg: "table-cell",
                        },
                      }),
                      ...(headCell.id === "course_description" && {
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "table-cell",
                        },
                      }),
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.length > 0 ? (
                courses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => (
                    <TableRow key={course.id}>
                      <TableCell align="left">{course.id}</TableCell>
                      <TableCell>{course.course_name}</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "table-cell",
                          },
                        }}
                      >
                        <img
                          src={course.course_image}
                          alt={course.course_name}
                          width="50"
                        />
                      </TableCell>
                      <TableCell align="left">{course.price}</TableCell>
                      <TableCell align="left">{course.Insttrctor}</TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "table-cell",
                          },
                        }}
                      >
                        {course.course_description}
                      </TableCell>

                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleOpen(course.id)}
                          sx={{ m: 1 }}
                        >
                          Delete
                        </Button>

                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<UpdateIcon />}
                          sx={{ m: 1 }}
                          component={Link}
                          to={`/E-Learning/admin/updatecourses/${course.id}`}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Course deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
