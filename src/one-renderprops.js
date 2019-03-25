import React from "react";
import { Button } from "@material-ui/core";
import { WithSnackbar } from "./snackbar";

function OneRenderProps() {
  return (
    <WithSnackbar>
      {({ addMessage }) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addMessage("I am a snackbar!");
            }}
          >
            Add Snackbar
          </Button>
        );
      }}
    </WithSnackbar>
  );
}

export default OneRenderProps;
