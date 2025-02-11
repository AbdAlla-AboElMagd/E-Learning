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
  Paper,
  Typography,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom/cjs/react-router-dom.min";
import { Link as muiLink } from "@mui/material/Link";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/Actions/authAction";

// import { Button } from "@mui/base/Button";

function Login() {
  const user = useSelector((state) => state.auth.user);
  const loggedin = useSelector((state) => state.auth.loggedin);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target == "email") {
      setEmail(value);
      setEmailError(/\s/.test(value));
    } else if (e.target == "pass") {
      setPass(value);
      setPassError(/.{8,}/.test(value));
    }
  };
  const checkRegValid = (e, reg) => {
    const value = e.target.value;
    if (e.target.name == "email") {
      setEmail(value);
      setEmailError(!reg.test(value));
    } else if (e.target.name == "pass") {
      setPass(value);
      setPassError(!reg.test(value));
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const loginByEmail = (email) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    for (const key in usersData) {
      if (usersData[key].email == email) {
        if (usersData[key].password == pass) {
          dispatch(login(usersData[key]));
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  };

  const loginByUname = (uname) => {
    const usersData = JSON.parse(localStorage.getItem("users")) || {};
    if (usersData[uname]) {
      if (usersData[uname].password == pass) {
        dispatch(login(usersData[uname]));
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    console.log("Submitting");
    if ((email, pass)) {
      console.log("Email", loginByEmail(email));
      console.log("uname", loginByUname(email));
      if (loginByUname(email) || loginByEmail(email)) {
        // Found User
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
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
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Login
        </Typography>
        {loginError == null ? (
          ""
        ) : !loginError ? (
          <Alert sx={{ m: 2 }} severity="success">
            Loged in Successfuly.
          </Alert>
        ) : (
          <Alert sx={{ m: 2 }} severity="error">
            Wrong Username or Password!.
          </Alert>
        )}
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
                <FormControl error={emailError} fullWidth>
                  <InputLabel htmlFor="email">
                    Email address / Username
                  </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) =>
                      checkRegValid(
                        e,
                        /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|[a-zA-Z0-9_-]{3,20})$/
                      )
                    }
                    aria-describedby="email-helper-text"
                  />
                  <FormHelperText id="email-helper-text">
                    {emailError
                      ? "Email should not contain whitespaces"
                      : "Enter your Email or Username"}
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
              <Box sx={{ width: "80%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={emailError || passError}
                  loading={btnLoading ? true : false}
                >
                  Login
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
                  to="/E-Learning/register"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  Register
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Grid2>
  );
}

export default Login;
