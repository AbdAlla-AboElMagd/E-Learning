import InputMUIPass from "../Components/InputMUIPass";
import InputMUIText from "../Components/InputMUIText";
import { useState } from "react";

import { Link as RouterLink } from "react-router-dom/cjs/react-router-dom.min";
import { Link as muiLink } from "@mui/material/Link";

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

function Register() {
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

  const handleChange = (name, value, isError) => {
    switch (name) {
      case "fname":
        setFname(value);
        setFnameError(isError);
        break;
      case "username":
        setUsername(value);
        setUsernameError(isError);
        break;
      case "email":
        setEmail(value);
        setEmailError(isError);
        break;
      case "gender":
        setGender(value);
        setGenderError(isError);
        break;
      case "pass":
        setPass(value);
        setPassError(isError);
        break;
      case "role":
        setRole(value);
        setRoleError(isError);
        break;
      default:
        break;
    }
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

  const handleUniqness = (targetName, value) => {
    let isError = false;
    if (targetName == "username") {
      setUsername(value);
      isError = searchforUname(value);
      if (isError) {
        setUsernameUniqueError(true);
        setUsernameError(true);
      } else {
        setUsernameUniqueError(false);
      }
    } else if (targetName == "email") {
      setEmail(value);
      isError = searchforEmail(value);
      if (isError) {
        setEmailUniqueError(true);
        setEmailError(true);
      } else {
        setEmailUniqueError(false);
      }
    } else {
    }
    return isError;
  };

  const handleBlur = (name, value) => {
    console.log(name);
    console.log(value);
    return handleUniqness(name, value);
  };

  const handleRadioChange = (e, reg) => {
    const value = e.target.value;
    if (e.target.name == "gender") {
      setGender(value);
      setGenderError(!reg.test(value));
    } else if (e.target.name == "role") {
      setRole(value);
      setRoleError(!reg.test(value));
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
        {emailUniqueError && usernameUniqueError ? (
          <Alert sx={{ m: 2 }} severity="error">
            {" "}
            Email And Username Already Exist!
          </Alert>
        ) : emailUniqueError ? (
          <Alert sx={{ m: 2 }} severity="error">
            {" "}
            Email Already Exist!
          </Alert>
        ) : usernameUniqueError ? (
          <Alert sx={{ m: 2 }} severity="error">
            {" "}
            Username Already Exist!
          </Alert>
        ) : (
          ""
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
                <InputMUIText
                  title="Full Name"
                  name="fname"
                  reg={/^(?!\s*$)[a-zA-Z\s]{3,}$/}
                  Msg="We will be glade to know your Name"
                  errMsg="Enter a valid Name min 3 characters and not Contain special Character"
                  changeCB={handleChange}
                />
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <InputMUIText
                  title="Username"
                  name="username"
                  reg={/^[a-zA-Z0-9_-]{3,20}$/}
                  Msg="Create a good Username"
                  errMsg="Username should not contain whitespaces or special characters"
                  changeCB={handleChange}
                  errBlurMsg="Username Already Exist!"
                  blurCB={handleBlur}
                />
              </Box>
            </Grid2>

            <Grid2
              item="true"
              size={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "80%" }}>
                <InputMUIText
                  title="Email address"
                  name="email"
                  reg={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                  Msg="Enter your Email"
                  errMsg="Email should not contain whitespaces"
                  changeCB={handleChange}
                  errBlurMsg="Email Already Exist!"
                  blurCB={handleBlur}
                />
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
                    onChange={(e) => handleRadioChange(e, /^.+$/)}
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
                <InputMUIPass
                  title="Password"
                  name="pass"
                  reg={/^.{8,}$/}
                  Msg="Enter your Password"
                  errMsg="Pass Should be More than 8 Char"
                  changeCB={handleChange}
                />
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
                    onChange={(e) => handleRadioChange(e, /^.+$/)}
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
export default Register;
