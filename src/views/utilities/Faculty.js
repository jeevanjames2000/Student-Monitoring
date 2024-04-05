import React, { useState } from "react";
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
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MainCard from "ui-component/cards/MainCard";

import { Select } from "@mui/material";
const initialStudentData = {
  id: "",
  name: "",
  facultyId: "",
  branch: "",
  designation: "",
  entrytime: "",
  exittime: "",
};

// Add more students as needed
const Faculty = () => {
  const studentsData = [
    {
      id: 1,
      name: "John Doe",
      facultyId: "87287",
      branch: "CSE",
      designation: "Hod",
      entrytime: "8.30",
      exittime: "5.30",
    },
    {
      id: 2,
      name: "Jane Doe",
      facultyId: "87887",
      branch: "MECH",
      designation: "Asst Professor",
      entrytime: "8.45",
      exittime: "5.30",
    },
    {
      id: 3,
      name: "Alice Smith",
      facultyId: "88432",
      branch: "ECE",
      designation: "Professor",
      entrytime: "9.00",
      exittime: "6.00",
    },
    {
      id: 4,
      name: "Bob Johnson",
      facultyId: "89001",
      branch: "CIVIL",
      designation: "Lecturer",
      entrytime: "9.15",
      exittime: "5.45",
    },
    {
      id: 5,
      name: "Emily Wilson",
      facultyId: "89650",
      branch: "MECH",
      designation: "Dean",
      entrytime: "8.30",
      exittime: "5.30",
    },
    {
      id: 6,
      name: "Michael Brown",
      facultyId: "90234",
      branch: "CSE",
      designation: "Asst Professor",
      entrytime: "9.30",
      exittime: "6.00",
    },
    {
      id: 7,
      name: "Emma Davis",
      facultyId: "90876",
      branch: "ECE",
      designation: "Hod",
      entrytime: "8.45",
      exittime: "5.45",
    },
    {
      id: 8,
      name: "Daniel Miller",
      facultyId: "91456",
      branch: "CIVIL",
      designation: "Professor",
      entrytime: "9.00",
      exittime: "6.00",
    },
    {
      id: 9,
      name: "Sophia Jones",
      facultyId: "92009",
      branch: "MECH",
      designation: "Asst Professor",
      entrytime: "8.30",
      exittime: "5.30",
    },
    {
      id: 10,
      name: "Liam Taylor",
      facultyId: "92670",
      branch: "CSE",
      designation: "Lecturer",
      entrytime: "9.15",
      exittime: "5.45",
    },
    {
      id: 11,
      name: "Olivia Anderson",
      facultyId: "93248",
      branch: "ECE",
      designation: "Dean",
      entrytime: "8.30",
      exittime: "5.30",
    },
    {
      id: 12,
      name: "Lucas Wilson",
      facultyId: "93850",
      branch: "CIVIL",
      designation: "Asst Professor",
      entrytime: "9.00",
      exittime: "6.00",
    },
    {
      id: 13,
      name: "Ava Johnson",
      facultyId: "94421",
      branch: "MECH",
      designation: "Professor",
      entrytime: "9.30",
      exittime: "6.00",
    },
    {
      id: 14,
      name: "Mia Smith",
      facultyId: "95003",
      branch: "CSE",
      designation: "Lecturer",
      entrytime: "8.45",
      exittime: "5.45",
    },
    {
      id: 15,
      name: "Ethan Davis",
      facultyId: "95678",
      branch: "ECE",
      designation: "Asst Professor",
      entrytime: "9.00",
      exittime: "5.30",
    },
  ];

  const [students, setStudents] = useState(studentsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState(initialStudentData);

  const handleEdit = (student) => {
    setModalTitle("Edit Faculty");
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
    setModalTitle("Add Faculty");
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
  return (
    <MainCard
      title="Faculty"
      secondary={
        <Button variant="outlined" onClick={handleAdd}>
          Add Faculty
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
                  <TableCell>Faculty Id</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Entry Time</TableCell>
                  <TableCell>Exit Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.facultyId}</TableCell>
                    <TableCell>{student.branch}</TableCell>

                    <TableCell>{student.designation}</TableCell>

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
          </TableContainer>
        </Grid>
      </Grid>
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
            value={formData.facultyId}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Year"
            name="year"
            value={formData.designation}
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
