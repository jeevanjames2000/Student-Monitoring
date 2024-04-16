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
import { toast } from "react-toastify";

const QrCode = () => {
  const [students, setStudents] = useState([]);
  const [qrCodeDataUri, setQrCodeDataUri] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    userType: "",
    entryTime: "",
    emplyoeeId: "",
    exitTime: "",
    designation: "",
    year: "",
    branch: "",
  });

  const handleAdd = () => {
    const data = localStorage.getItem("user");
    if (data === "true") {
      setFormData({
        name: "",
        rollNumber: "",
        emplyoeeId: "",
        entryTime: "",
        year: "",
        designation: "",
        userType: "",
        exitTime: "",
        branch: "",
      });
      setOpenModal(true);
    } else {
      toast.error("Required Access To Add");
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://student-monitoring-backend.onrender.com/api/faculty/generateNewQr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        handleCloseModal();
        toast.success("Qr Generated Successfully");
        setQrCodeDataUri(data.qrCodeDataUri);
        setStudents([...students, formData]);
      } else {
        handleCloseModal();

        toast.error("Failed to generate QR code");
        console.error("Failed to generate QR code:", data.message);
      }
    } catch (error) {
      handleCloseModal();

      toast.error("Failed to generate QR code");

      console.error("Error generating QR code:", error);
    }
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
                    {qrCodeDataUri && (
                      <img src={qrCodeDataUri} alt="QR Code" width={456} />
                    )}
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
            <InputLabel>User Type*</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
            </Select>
          </FormControl>

          {formData.userType === "faculty" && (
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
            label="FullName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          {formData.userType === "student" && (
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              type="number"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
              margin="normal"
            />
          )}
          {formData.userType === "faculty" && (
            <TextField
              fullWidth
              label="Employee ID"
              name="emplyoeeId"
              value={formData.emplyoeeId}
              onChange={handleInputChange}
              required
              margin="normal"
            />
          )}
          {formData.userType === "student" && (
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
