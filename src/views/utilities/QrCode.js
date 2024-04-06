import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import QRCodeReact from "qrcode.react";

// Add more students as needed
const QrCode = () => {
  const [students, setStudents] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    rollNumber: "",
    user: "",
    entrytime: "",
    facultyId: "",
    exittime: "",
    designation: "",
    year: "",
    branch: "",
  });
  console.log("formData: ", formData);

  const handleAdd = () => {
    setFormData({
      id: "",
      name: "",
      rollNumber: "",
      facultyId: "",
      entrytime: "",
      year: "",
      designation: "",
      user: "",
      exittime: "",
      branch: "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [designation, setDesignation] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user" && value === "faculty") {
      setDesignation("");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setStudents([...students, formData]);
    handleCloseModal();
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={12} sm={6}>
          <Card sx={{ width: "100%", textAlign: "center", p: 2 }}>
            <CardContent>
              <Box display={"flex"}>
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={handleAdd}
                      style={{ width: "20rem" }}
                    >
                      Generate New QR-Code
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      {students.length > 0 && (
                        <QRCodeReact
                          value={JSON.stringify(students)}
                          size={456}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
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
          <h2 id="student-modal-title">Generate QR</h2>
          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
            </Select>
          </FormControl>

          {formData.user === "faculty" && (
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              required
              onChange={handleInputChange}
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          {formData.user === "student" && (
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
              margin="normal"
            />
          )}
          {formData.user === "faculty" && (
            <TextField
              fullWidth
              label="Faculty ID"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleInputChange}
              required
              margin="normal"
            />
          )}
          {formData.user === "student" && (
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={formData.year}
              required
              onChange={handleInputChange}
              margin="normal"
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Branch</InputLabel>
            <Select
              name="branch"
              value={formData.branch}
              required
              onChange={handleInputChange}
            >
              <MenuItem value="cse">CSE</MenuItem>
              <MenuItem value="ece">ECE</MenuItem>
              <MenuItem value="mechanical">Mechanical</MenuItem>
              <MenuItem value="civil">Civil</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField
            fullWidth
            label="Entry Time"
            name="entrytime"
            type="datetime-local"
            value={formData.entrytime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Exit Time"
            name="exittime"
            type="datetime-local"
            value={formData.exittime}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            required
          /> */}
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ marginRight: "1rem" }}
            >
              Generate
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
    </>
  );
};

export default QrCode;
