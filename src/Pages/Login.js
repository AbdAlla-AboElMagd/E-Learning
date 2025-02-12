import InputMUIPass from "../Components/InputMUIPass";
import InputMUIText from "../Components/InputMUIText";
import { useState } from "react";
import { Button, Grid2, Box, Paper, Typography, Alert } from "@mui/material";

import { Link as RouterLink } from "react-router-dom/cjs/react-router-dom.min";
import { Link as muiLink } from "@mui/material/Link";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/Actions/authAction";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const loggedin = useSelector((state) => state.auth.loggedin);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [loginError, setLoginError] = useState(null);

  const handleChange = (name, value, isError) => {
    switch (name) {
      case "email":
        setEmail(value);
        setEmailError(isError);
        break;
      case "pass":
        setPass(value);
        setPassError(isError);
        break;
      default:
        break;
    }
  };

  const handleBlur = (name, value) => {
    // if (value === "") {
    //   setEmailError(true);
    //   return true;
    // } else if (value === "admin@a.com") {
    //   setEmailError(true);
    //   return true;
    // } else {
    //   return false;
    // }
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
    console.log(email);
    console.log(pass);
    if ((email, pass)) {
      console.log("Email", loginByEmail(email));
      console.log("uname", loginByUname(email));
      if (loginByUname(email) || loginByEmail(email)) {
        setLoginError(false);

      history.push("/E-Learning");
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
                <InputMUIText
                  title="Email or Username"
                  name="email"
                  reg={/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|[a-zA-Z0-9_-]{3,20})$/}
                  Msg="Enter your Email or Username"
                  errMsg="Email should not contain whitespaces"
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
                <InputMUIPass
                  title="Password"
                  name="pass"
                  reg={/^.{8,}$/}
                  Msg="Enter your Password"
                  errMsg="Pass Should be More than 8 Char"
                  changeCB={handleChange}
                  errBlurMsg="BLur Error"
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
