import React, { useContext, useState } from 'react';
import { Box, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { Authcontext } from '../../Context/Authcontext'
import { styled } from "@mui/material/styles";
import toast from 'react-hot-toast';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Signin = ({ setMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const { signin, dispatch } = useContext(Authcontext);
  const router = useRouter();

  async function handleSubmit() {
    try {
      // Check if all fields are filled out
      if (formData?.username === "" || formData?.email === "" || formData?.password === "" || formData?.confirmPassword === "") {
        toast.error("Please fill out all fields!");
        return;
      }

      // Check if passwords match
      if (formData?.password !== formData?.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Signing up...");

      // Perform sign in
      const data = await signin(formData);
      
      // Dispatch action on successful sign in
      dispatch({
        type: "SIGN_IN",
        payload: data
      });

      // If successful, redirect and show success toast
      if (data) {
        router.push('/');
        toast.success("Signup Successful!");
      }

      // Remove loading toast after process is complete
      toast.remove(loadingToast);

    } catch (error) {
      // Handle error properly and show error toast
      toast.error(error?.message || "Something went wrong");
      console.error(error);
    }
  }

  const inputStyle = {
    "& label": { color: "white" },
    "& label.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "8px",
      "& fieldset": { borderColor: "hsl(var(--border))" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { border: "2px solid white" },
    },
  };

  return (
    <div
      className="shadow row justify-content-center"
      style={{
        borderRadius: "10px",
        maxWidth: "700px",
        background: "linear-gradient(90deg, rgba(190, 49, 68, 0.47), rgba(29, 22, 22, 0.36))",
        paddingTop: "20px",
        paddingBottom: "20px",
        width: "100%", // Ensure full width for responsiveness
      }}
    >
      <h4 className="text-center text-white mb-4">Sign Up Form</h4>
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%" }}>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <TextField
              sx={inputStyle}
              fullWidth
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              label="Username"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <TextField
              sx={inputStyle}
              fullWidth
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              label="Email"
              variant="outlined"
              margin="normal"
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <FormControl fullWidth variant="outlined" margin="normal" sx={inputStyle}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <FormControl fullWidth variant="outlined" margin="normal" sx={inputStyle}>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="d-flex align-items-center mb-3">
          <input
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(e.target.files[0]);
              fileReader.addEventListener("load", (e) => {
                setFormData(prev => ({
                  ...prev, profilePicture: e.currentTarget.result
                }));
              });
            }}
          />
          {formData.profilePicture && (
            <img src={formData.profilePicture} style={{ width: "50px", height: "50px", borderRadius: "100%", border: "0px solid black" }} alt="Profile" />
          )}
        </div>

        <div className="d-flex justify-content-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: "20px", width: "50%" }}
          >
            Sign Up
          </Button>
        </div>
      </Box>

      <div className="text-center mt-3">
        <button
          onClick={() => router.push("login")}
          style={{
            backgroundColor: "transparent",
            fontWeight: "600",
            border: "none",
            fontSize: "12px",
            color: "white",
          }}
        >
          Already have an account? Login!
        </button>
      </div>
    </div>
  );
};
