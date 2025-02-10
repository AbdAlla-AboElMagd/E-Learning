import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Grid2,
  Box,
  Card,
  InputAdornment,
  IconButton,
  Container,
  Paper,
  Typography,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom/cjs/react-router-dom.min";
import { Link as muiLink } from "@mui/material/Link";

function OldRegister() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameUniqueError, setUsernameUniqueError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailUniqueError, setEmailUniqueError] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const [gender, setGender] = useState("male");
  const [generError, setGenderError] = useState(false);

  const [role, setRole] = useState("client");
  const [roleError, setRoleError] = useState(false);

  const [img, setImg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [saveError, setSaveError] = useState(null);

  const checkRegValid = (e, reg) => {
    const value = e.target.value;

    if (e.target.name == "fname") {
      setFname(value);
      setFnameError(!reg.test(value));
    } else if (e.target.name == "username") {
      setUsername(value);
      setUsernameUniqueError(false);
      setUsernameError(!reg.test(value));
    } else if (e.target.name == "email") {
      setEmail(value);
      setEmailUniqueError(false);
      setEmailError(!reg.test(value));
    } else if (e.target.name == "pass") {
      setPass(value);
      setPassError(!reg.test(value));
    } else if (e.target.name == "gender") {
      setGender(value);
      setGenderError(!reg.test(value));
    } else if (e.target.name == "role") {
      setRole(value);
      setRoleError(!reg.test(value));
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const saveDatainLocalStorage = (
    fname,
    uname,
    email,
    gender,
    passowrd,
    role,
    img
  ) => {
    const data = {
      fullname: fname,
      username: uname,
      email: email,
      gender: gender,
      password: passowrd,
      role: role,
      img: img,
    };
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    usersData[uname] = data;
    localStorage.setItem("users", JSON.stringify(usersData));
  };

  const searchforEmail = (email) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    for (const key in usersData) {
      if (usersData[key].email == email) {
        return true;
      }
    }
  };

  const searchforUname = (uname) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    for (const key in usersData) {
      if (usersData[uname]) {
        return true;
      }
    }
  };

  const handleUniqness = (e) => {
    const value = e.target.value;

    if (e.target.name == "username") {
      setUsername(value);
      if (searchforUname(value)) {
        setUsernameUniqueError(true);
        setUsernameError(true);
      } else {
        setUsernameUniqueError(false);
      }
    } else if (e.target.name == "email") {
      setEmail(value);
      if (searchforEmail(value)) {
        setEmailUniqueError(true);
        setEmailError(true);
      } else {
        setEmailUniqueError(false);
      }
    } else {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    console.log("Saving New User");
    if ((fname, username, email, gender, pass, role)) {
      let isEmailExist = searchforEmail(email);
      let isUsernameExist = searchforUname(username);
      if (isUsernameExist || isEmailExist) {
        setSaveError(true);
        if (isUsernameExist) {
          setUsernameError(true);
          setUsernameUniqueError(true);
        }
        if (isEmailExist) {
          setEmailError(true);
          setEmailUniqueError(true);
        }
      } else {
        setSaveError(false);
        saveDatainLocalStorage(fname, username, email, gender, pass, role, img);
      }
    } else {
      setSaveError(true);
    }
    setTimeout(() => {
      setBtnLoading(false);
    }, 1000);
  };
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{ p: 2, maxWidth: { xs: "100%", sm: 600 }, margin: "0 auto" }}
      >
        {saveError == null ? (
          ""
        ) : !saveError ? (
          <Alert sx={{ m: 2 }} severity="success">
            Saved Successfuly.
          </Alert>
        ) : (
          <Alert sx={{ m: 2 }} severity="error">
            Saved Failed!.
          </Alert>
        )}
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 2 }}
        >
          <Grid2 container spacing={2}>
            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <FormControl error={fnameError} fullWidth>
                  <InputLabel htmlFor="fname">Full Name</InputLabel>
                  <Input
                    id="fname"
                    name="fname"
                    value={fname}
                    onChange={(e) =>
                      checkRegValid(e, /^(?!\s*$)[a-zA-Z\s]{3,}$/)
                    }
                    aria-describedby="fname-helper-text"
                  />
                  <FormHelperText
                    id="fname-helper-text"
                    sx={{ width: "400px" }}
                  >
                    {fnameError
                      ? "Enter a valid Name min 3 characters and not Contain special Character"
                      : "We will be glade to know your name"}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <FormControl error={usernameError} fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => checkRegValid(e, /^[a-zA-Z0-9_-]{3,20}$/)}
                    aria-describedby="username-helper-text"
                    onBlur={(e) => handleUniqness(e)}
                  />
                  <FormHelperText
                    id="username-helper-text"
                    sx={{ width: "400px" }}
                  >
                    {usernameUniqueError
                      ? "Username Already Exist!"
                      : usernameError
                      ? "Username should not contain whitespaces or special characters"
                      : "Create a good Username"}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <FormControl error={emailError} fullWidth></FormControl>
                <FormControl error={emailError} fullWidth>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) =>
                      checkRegValid(e, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                    }
                    aria-describedby="email-helper-text"
                    onBlur={(e) => handleUniqness(e)}
                  />
                  <FormHelperText id="email-helper-text">
                    {emailUniqueError
                      ? "Email Already Exist!"
                      : emailError
                      ? "Email should not contain whitespaces"
                      : "Enter your Email"}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%", textAlign: "center" }}>
                <FormControl>
                  <FormLabel id="gender-group">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="gender-group"
                    name="gender"
                    value={gender}
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                    onChange={(e) => checkRegValid(e, /^.+$/)}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <FormControl error={passError} fullWidth>
                  <InputLabel htmlFor="pass">Password</InputLabel>
                  <Input
                    id="pass"
                    name="pass"
                    value={pass}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => checkRegValid(e, /^.{8,}$/)}
                    aria-describedby="pass-helper-text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="pass-helper-text">
                    {passError
                      ? "Pass Should be More than 8 Char"
                      : "Min 8 Char"}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%", textAlign: "center" }}>
                <FormControl>
                  <FormLabel id="role_group">Role</FormLabel>
                  <RadioGroup
                    aria-labelledby="role_group"
                    name="role"
                    value={role}
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                    onChange={(e) => checkRegValid(e, /^.+$/)}
                  >
                    <FormControlLabel
                      value="client"
                      control={<Radio />}
                      label="Client"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  disabled={
                    fnameError ||
                    usernameError ||
                    emailError ||
                    passError ||
                    !fname ||
                    !username ||
                    !email ||
                    !pass
                  }
                  loading={btnLoading ? true : false}
                >
                  Register
                </Button>
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <Button
                  component={RouterLink}
                  to="/E-Learning/login"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Grid2>
  );
}

export default OldRegister;
