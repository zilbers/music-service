import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { addNewEntry } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        aria-labelledby="add-new-form"
        aria-describedby="sends-new-data-to-server"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="add-new-form">Add</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <input name="example" defaultValue="test" ref={register} />

              {/* include validation with required or other standard HTML validation rules */}
              <input
                name="exampleRequired"
                ref={register({ required: true })}
              />
              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && <span>This field is required</span>}

              <input type="submit" />
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
