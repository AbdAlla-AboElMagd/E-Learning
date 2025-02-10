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

function InputMUIText(props) {
  const [item, setItem] = useState("");
  const [itemError, setItemError] = useState(false);
  const [itemBlurError, setItemBlurError] = useState(false);

  const handleChange = (e, reg) => {
    const value = e.target.value;
    let isError = false;
    if (e.target.name == props.name) {
      setItem(value);
      setItemBlurError(false);
      if (reg) {
        setItemError(!reg.test(value));
        isError = !reg.test(value);
      }
      props.changeCB(props.name, value, isError);
    }
  };

  const handleBlur = (e) => {
    if (props.blurCB) {
      console.log(props.blurCB);
      const value = e.target.value;
      let isError = itemError;
      if (e.target.name == props.name) {
        console.log(props.blurCB(props.name, value));
        console.log(props.blurCB);
        isError = props.blurCB(props.name, value);
        if (isError) {
          setItemBlurError(isError);
          setItemError(isError);
        }
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
        type="text"
        onChange={(e) => handleChange(e, props.reg)}
        onBlur={(e) => handleBlur(e, props.reg)}
        aria-describedby="item-helper-text"
      />
      <FormHelperText id="item-helper-text">
        {itemBlurError
          ? !props.errBlurMsg
            ? ""
            : props.errBlurMsg
          : itemError
          ? !props.errMsg
            ? ""
            : props.errMsg
          : !props.Msg
          ? ""
          : props.Msg}
      </FormHelperText>
    </FormControl>
  );
}
export default InputMUIText;
