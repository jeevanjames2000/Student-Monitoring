import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import MainCard from "ui-component/cards/MainCard";
import EditIcon from "@mui/icons-material/Edit";
import { Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MyContext } from "store/useContext";
import { toast } from "react-toastify";

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

const Students = () => {
  const [students, setStudents] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { studentData, setStudentData } = useContext(MyContext);

  const handleGetApi = () => {
    fetch(
      "https://student-monitoring-backend.onrender.com/api/students/getAllStudents"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudentData(data);
        setStudents(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error);
      });
  };

  useEffect(() => {
    handleGetApi();
  }, []);

  const handleEdit = (student) => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setFormData(student);
      setModalTitle("Edit Student");
      setOpenModal(true);
    } else {
      toast.error("Required Access To modify");
    }
  };

  const handleDelete = (rollNumber) => {
    // Open a confirm alert dialog
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      const data = localStorage.getItem("user");

      if (data === "true") {
        fetch(
          `https://student-monitoring-backend.onrender.com/api/students/deleteStudentByRollNumber/${rollNumber}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              toast.error("Error Deleting Student");
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((response) => {
            toast.success(`${rollNumber} Deleted Successfully`);
            handleGetApi();
          })
          .catch((error) => {
            toast.success(error);
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      } else {
        toast.error("Required Access To Delete");
      }
    }
  };

  const handleAdd = () => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setModalTitle("Add Student");
      setFormData(initialStudentData);
      setOpenModal(true);
    } else {
      toast.error("Required Access To modify");
    }
  };

  const handleStudentAction = () => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      const requestBody = {
        name: formData.name,
        rollNumber: formData.rollNumber,
        branch: formData.branch,
        year: formData.year,
        entryTime: formData.entrytime,
        exitTime: formData.exittime,
      };

      const method = modalTitle === "Add Student" ? "POST" : "PUT";
      const url =
        modalTitle === "Add Student"
          ? "https://student-monitoring-backend.onrender.com/api/students/insertStudent"
          : "https://student-monitoring-backend.onrender.com/api/students/updateByRollNum";

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            if (modalTitle === "Add Student") {
              toast.error("Error Inserting Student");
            }
            if (modalTitle === "Edit Student") {
              toast.error("Error Updating Student");
            }
            handleCloseModal();
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((response) => {
          if (modalTitle === "Add Student") {
            handleGetApi();
            handleCloseModal();
            toast.success("Added Student Successfully");

            setStudents([...students, data]);
          } else {
            toast.success("Updated Student Sucessfully");
            handleGetApi();
            handleCloseModal();
            const updatedStudents = students.map((s) =>
              s.id === data.id ? data : s
            );
            setStudents(updatedStudents);
          }
        })
        .catch((error) => {
          toast.error(error);
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      toast.error("Required Access To modify");
    }
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
          Add
        </Button>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl.No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell align="center">QR-Code</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Exit Time</TableCell>
                  {/* <TableCell>Entry Date</TableCell> */}
                  <TableCell>Entry Time</TableCell>
                  <TableCell>Total Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                  .map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleOpen(student.qrCode)}>
                          Show Qr Code
                        </Button>
                      </TableCell>
                      <TableCell>
                        {student.exitTime && student.exitTime.slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        {student.exitTime && student.exitTime.slice(11, 19)}
                      </TableCell>
                      {/* <TableCell>
                        {student.entryTime && student.entryTime.slice(0, 10)}
                      </TableCell> */}
                      <TableCell>
                        {student.entryTime && student.entryTime.slice(11, 19)}
                      </TableCell>
                      <TableCell>{student.totalTime}</TableCell>

                      <TableCell>
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(student)}
                        />

                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(student.rollNumber)}
                        />
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
              onClick={handleStudentAction}
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
