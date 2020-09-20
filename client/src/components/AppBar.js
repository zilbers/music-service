import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const context = useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <Typography variant="h6" className={classes.title}>
            Music - Service
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Hi, {context.email.split("@")[0]}
          </Typography>
          <Link to="/" className="links">
            <Button color="inherit" onClick={context.logUserOut}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
