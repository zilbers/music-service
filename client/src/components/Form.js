import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import "./css/Form.css";

const types = [
  {
    value: "songs",
    label: "Songs",
  },
  {
    value: "albums",
    label: "Albums",
  },
  {
    value: "artists",
    label: "Artists",
  },
  {
    value: "playlists",
    label: "Playlists",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
    },
  },
}));

export default function Form() {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl error={Boolean(errors.type)}>
        <InputLabel id="type-of-entrie">Type of entrie</InputLabel>
        <Controller
          as={
            <Select>
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          }
          name="type"
          rules={{ required: "this is required" }}
          control={control}
          defaultValue=""
        />
        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
      </FormControl>

        <TextField
          name="name"
          label="name"
          id="name"
          inputRef={register({ required: true })}
          error={Boolean(errors.name)}
        />
        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
        
        <TextField
          name="cover_img"
          label="cover_img"
          id="cover_img"
          inputRef={register}
        />
        <input type="submit" />
    </form>
  );
}
