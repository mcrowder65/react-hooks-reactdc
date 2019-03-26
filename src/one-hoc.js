import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { withSnackbar } from "./snackbar";

function OneHoc(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        props.addMessage("I am not a snackbar!");
      }}
    >
      Add Snackbar
    </Button>
  );
}

OneHoc.propTypes = {
  addMessage: PropTypes.func.isRequired,
};
export default withSnackbar(OneHoc);
