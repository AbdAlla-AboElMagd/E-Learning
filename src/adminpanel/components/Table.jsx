import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://retoolapi.dev/3apaeZ/data";

const headCells = [
  { id: "id", label: "ID" },
  { id: "course_name", label: "Course Name" },
  { id: "instrc_name", label: "Instructor" },
  { id: "instrc_title", label: "Instructor Title" },
  { id: "instrc_img", label: "Instructor Image" },
  { id: "price", label: "Price ($)" },
  { id: "rating", label: "Rating" },
  { id: "course_description", label: "Course Description" },
  { id: "action", label: "Actions" },
];

export default function Tablee() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => setDense(event.target.checked);
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Fetch courses from new API
  React.useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setCourses(response.data))
      .catch((error) => setErrors(error.message));
  }, [refresh]);

  const handleDelete = () => {
    if (selectedId) {
      axios
        .delete(`${API_URL}/${selectedId}`)
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
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h3" id="tableTitle" sx={{ flex: "1 1 100%" }}>
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
                      ...(headCell.id === "instrc_img" && {
                        display: { xs: "none", sm: "none", md: "table-cell" },
                      }),
                      ...(headCell.id === "course_description" && {
                        display: { xs: "none", sm: "none", md: "none", lg: "table-cell" },
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
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.course_name}</TableCell>
                      <TableCell>{course.instrc_name}</TableCell>
                      <TableCell>{course.instrc_title}</TableCell>

                      {/* Instructor Image (Hidden on small screens) */}
                      <TableCell
                        sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                      >
                        <img
                          src={course.instrc_img}
                          alt={course.instrc_name}
                          width="50"
                        />
                      </TableCell>

                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.rating} ⭐</TableCell>

                      {/* Course Description (Hidden on small screens) */}
                      <TableCell
                        sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell" } }}
                      >
                        {course.course_description}
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
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
                  <TableCell colSpan={9} align="center">
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
            Are you sure you want to delete this course? This action cannot be undone.
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

      {/* Success Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Course deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
