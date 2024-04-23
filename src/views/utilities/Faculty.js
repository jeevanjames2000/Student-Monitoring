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
import MainCard from "ui-component/cards/MainCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Select } from "@mui/material";
import { MyContext } from "store/useContext";
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
  console.log("students: ", students);

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { facultyData, setFacultyData } = useContext(MyContext);

  const handleGetApi = () => {
    fetch(
      `https://student-monitoring-backend.onrender.com/api/faculty/getAllFaculty`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFacultyData(data);
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
      setModalTitle("Edit Faculty");
      setOpenModal(true);
    } else {
      toast.error("Required Access To modify");
    }
  };

  const handleDelete = (emplyoeeId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      const data = localStorage.getItem("user");

      if (data === "true") {
        fetch(
          `https://student-monitoring-backend.onrender.com/api/faculty/deleteFacultyById/${emplyoeeId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response === 200 || response.ok) {
              toast.success("Faculty Deleted Successfully");
              handleGetApi();
            }
            if (!response.ok) {
              toast.error("Error Deleting Faculty");

              throw new Error("Network response was not ok");
            }
            return response.json();
          })

          .catch((error) => {
            toast.error("Error Deleting Faculty");

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
      setModalTitle("Add Faculty");
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
        designation: formData.designation,
        branch: formData.branch,
        emplyoeeId: formData.emplyoeeId,
        entryTime: formData.entrytime,
        exitTime: formData.exittime,
      };

      const method = modalTitle === "Add Faculty" ? "POST" : "PUT";
      const url =
        modalTitle === "Add Faculty"
          ? `https://student-monitoring-backend.onrender.com/api/faculty/insertFaculty`
          : `https://student-monitoring-backend.onrender.com/api/faculty/updateById`;

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("Error Updating");

            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((response) => {
          // Update the state or any other UI updates as needed
          if (modalTitle === "Add Student") {
            handleGetApi();
            handleCloseModal();
            toast.success("Faculty Inserted Successfully");

            setStudents([...students, data]); // Assuming the API returns the new student object
          } else {
            handleGetApi();
            handleCloseModal();
            toast.success("Faculty Updated Successfully");
            const updatedStudents = students.map((s) =>
              s.id === data.id ? data : s
            );
            setStudents(updatedStudents);
          }
        })
        .catch((error) => {
          toast.error("Error Updating");

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
      title="Faculty"
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
                  <TableCell>Sl No</TableCell>
                  <TableCell>Faculty Name</TableCell>
                  <TableCell>Emplyoee Id</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Designation</TableCell>
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
                {facultyData
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
                      <TableCell>
                        {student.exitTime && student.exitTime.slice(0, 15)}
                      </TableCell>
                      <TableCell>
                        {student.exitTime && student.exitTime.slice(15, 25)}
                      </TableCell>
                      <TableCell>
                        {student.entryTime && student.entryTime.slice(15, 25)}
                      </TableCell>
                      <TableCell>{student.totalTime}</TableCell>
                      <TableCell>
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(student)}
                        />

                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(student.emplyoeeId)}
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
            label="Employee Id"
            name="emplyoeeId"
            value={formData.emplyoeeId}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Designation"
            name="designation"
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
              onClick={handleStudentAction}
              style={{ marginRight: "1rem" }}
            >
              {modalTitle === "Add Faculty" ? "Add" : "Update"}
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
