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

const studentsData = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "87287",
    year: "2024",
    branch: "CSE",
    section: "A",
    entrytime: "8.30",
    exittime: "5.30",
  },
  {
    id: 2,
    name: "Jane Doe",
    rollNumber: "87887",
    year: "2024",
    branch: "MECH",
    section: "B",
    entrytime: "8.45",
    exittime: "5.30",
  },
  {
    id: 3,
    name: "Alice Smith",
    rollNumber: "88512",
    year: "2023",
    branch: "ECE",
    section: "A",
    entrytime: "9.00",
    exittime: "6.00",
  },
  {
    id: 4,
    name: "Bob Johnson",
    rollNumber: "89523",
    year: "2023",
    branch: "CIVIL",
    section: "B",
    entrytime: "9.15",
    exittime: "6.15",
  },
  {
    id: 5,
    name: "Emily Wilson",
    rollNumber: "90145",
    year: "2022",
    branch: "CSE",
    section: "C",
    entrytime: "9.30",
    exittime: "6.30",
  },
  {
    id: 6,
    name: "Michael Brown",
    rollNumber: "91234",
    year: "2022",
    branch: "MECH",
    section: "A",
    entrytime: "9.45",
    exittime: "6.45",
  },
  {
    id: 7,
    name: "Sophia Miller",
    rollNumber: "92345",
    year: "2023",
    branch: "ECE",
    section: "B",
    entrytime: "10.00",
    exittime: "7.00",
  },
  {
    id: 8,
    name: "David Davis",
    rollNumber: "93456",
    year: "2024",
    branch: "CIVIL",
    section: "A",
    entrytime: "10.15",
    exittime: "7.15",
  },
  {
    id: 9,
    name: "Olivia Smith",
    rollNumber: "94567",
    year: "2022",
    branch: "CSE",
    section: "B",
    entrytime: "10.30",
    exittime: "7.30",
  },
  {
    id: 10,
    name: "William Johnson",
    rollNumber: "95678",
    year: "2023",
    branch: "MECH",
    section: "C",
    entrytime: "10.45",
    exittime: "7.45",
  },
  {
    id: 11,
    name: "Emma Wilson",
    rollNumber: "96789",
    year: "2024",
    branch: "ECE",
    section: "A",
    entrytime: "11.00",
    exittime: "8.00",
  },
  {
    id: 12,
    name: "James Brown",
    rollNumber: "97890",
    year: "2022",
    branch: "CIVIL",
    section: "B",
    entrytime: "11.15",
    exittime: "8.15",
  },
  {
    id: 13,
    name: "Isabella Miller",
    rollNumber: "98901",
    year: "2023",
    branch: "CSE",
    section: "A",
    entrytime: "11.30",
    exittime: "8.30",
  },
  {
    id: 14,
    name: "Benjamin Davis",
    rollNumber: "99012",
    year: "2024",
    branch: "MECH",
    section: "B",
    entrytime: "11.45",
    exittime: "8.45",
  },
  {
    id: 15,
    name: "Ava Smith",
    rollNumber: "99123",
    year: "2022",
    branch: "ECE",
    section: "C",
    entrytime: "12.00",
    exittime: "9.00",
  },
];

const Students = () => {
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
    fetch("http://localhost:3000/api/students/getAllStudents")
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
    setModalTitle("Edit Student");
    setFormData(student);
    setOpenModal(true);
    handleMenuClose();
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleUpdate = () => {
    const updatedStudents = students.map((student) =>
      student.id === formData.id ? formData : student
    );
    setStudents(updatedStudents);
    handleCloseModal();
  };

  const handleAdd = () => {
    setModalTitle("Add Student");
    setFormData(initialStudentData);
    setOpenModal(true);
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
      title="Students"
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
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Year</TableCell>
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
                      <TableCell>{student.rollNum}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.year}</TableCell>
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

export default Students;
