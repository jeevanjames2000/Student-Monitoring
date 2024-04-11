import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TablePagination,
  FormControl,
  InputLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MainCard from "ui-component/cards/MainCard";

import { Select } from "@mui/material";
// Dummy student data
const initialStudentData = {
  id: "",
  name: "",
  rollNumber: "",
  branch: "",
  section: "",
  year: "",
  entrytime: "",
  exittime: "",
};

const Faculty = () => {
  const [students, setStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState(initialStudentData);
  const [student, setStudent] = useState([]);
  console.log("student: ", students);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:3000/api/faculty/getAllFaculty")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error);
      });
  }, []);

  const handleEdit = (student) => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setModalTitle("Edit Faculty");
      setFormData(student);
      setOpenModal(true);
      handleMenuClose();
    } else {
      alert("Required Access To modify");
    }
  };

  const handleDelete = (id) => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setStudents(students.filter((student) => student.id !== id));
    } else {
      alert("Required Access To Delete");
    }
  };

  const handleUpdate = () => {
    const updatedStudents = students.map((student) =>
      student.id === formData.id ? formData : student
    );
    setStudents(updatedStudents);
    handleCloseModal();
  };

  const handleAdd = () => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setModalTitle("Add Faculty");
      setFormData(initialStudentData);
      setOpenModal(true);
    } else {
      alert("Required Access To Delete");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [open, setOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");

  const handleOpen = (data) => {
    setQrCodeData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <MainCard
      title="Faculty"
      secondary={
        <Button variant="outlined" onClick={handleAdd}>
          Add Student
        </Button>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Faculty Name</TableCell>
                  <TableCell>Emplyoee Id</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell align="center">QR-Code</TableCell>
                  <TableCell>Entry Time</TableCell>
                  <TableCell>Exit Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                  .map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.emplyoeeId}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.designation}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleOpen(student.qrCode)}>
                          Show Qr Code
                        </Button>
                      </TableCell>
                      <TableCell>{student.entrytime}</TableCell>
                      <TableCell>{student.exittime}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          aria-controls="student-menu"
                          aria-haspopup="true"
                          onClick={handleMenuOpen}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="student-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => handleEdit(student)}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(student.id)}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <img
            src={qrCodeData}
            alt="QR Code"
            style={{
              width: "100%",
              maxHeight: "1000px",
              objectFit: "contain",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="student-modal-title"
        aria-describedby="student-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            border: "2px solid #fff",
            borderRadius: 5,
            padding: 10,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="student-modal-title" style={{ color: "#000" }}>
            {modalTitle}
          </h2>
          <FormControl fullWidth margin="normal">
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
            >
              <MenuItem value="cse">CSE</MenuItem>
              <MenuItem value="ece">ECE</MenuItem>
              <MenuItem value="mechanical">Mechanical</MenuItem>
              <MenuItem value="civil">Civil</MenuItem>
              {/* Add more branches as needed */}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Section"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Entry Time"
            name="entrytime"
            type="time"
            value={formData.entrytime}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="time"
            label="Exit Time"
            name="exittime"
            value={formData.exittime}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={modalTitle === "Add Student" ? handleAdd : handleUpdate}
              style={{ marginRight: "1rem" }}
            >
              {modalTitle === "Add Student" ? "Add" : "Update"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainCard>
  );
};

export default Faculty;
