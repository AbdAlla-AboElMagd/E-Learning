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

function InputMUIPass(props) {
  const [item, setItem] = useState("");
  const [itemError, setItemError] = useState(false);
  const [itemBlurError, setItemBlurError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e, reg) => {
    const value = e.target.value;
    let isError = false;
    if (e.target.name == props.name) {
      setItem(value);

      if (reg) {
        setItemError(!reg.test(value));
        isError = !reg.test(value);
      }
      props.changeCB(props.name, value, isError);
    }
  };

  const handleBlur = (e) => {
    if (props.blurCB) {
      const value = e.target.value;
      let isError = false;
      if (e.target.name == props.name) {
        isError = props.blurCB(props.name, value);
        setItemBlurError(isError);
        setItemError(isError);
      }
    }
  };

  return (
    <FormControl error={itemError} fullWidth>
      <InputLabel htmlFor={props.name}>{props.title}</InputLabel>
      <Input
        id={props.name}
        name={props.name}
        value={item}
        type={showPassword ? "text" : "password"}
        onChange={(e) => handleChange(e, props.reg)}
        onBlur={(e) => handleBlur(e, props.reg)}
        aria-describedby="item-helper-text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
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
      <FormHelperText id="item-helper-text">
        {itemBlurError
          ? props.errBlurMsg
            ? props.errBlurMsg
            : ""
          : itemError
          ? props.errMsg
            ? props.errMsg
            : ""
          : props.Msg
          ? props.Msg
          : ""}
      </FormHelperText>
    </FormControl>
  );
}
export default InputMUIPass;
