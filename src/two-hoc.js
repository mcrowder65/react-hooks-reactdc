import React from "react";
import PropTypes from "prop-types";
import compose from "lodash.compose";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { withGlobalLoader, withLocalLoader } from "./loading";

function TwoHoc(props) {
  const globalClick = () => {
    props.makeApiCall(async () => {
      await sleep(3000);
    });
  };

  const localClick = () => {
    props.makeApiCall(async () => {
      await sleep(1000);
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={globalClick}
        disabled={props.isLoading}
      >
        Global button
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={localClick}
        disabled={props.isLoading}
      >
        Local button
      </Button>
    </>
  );
}

TwoHoc.propTypes = {
  makeApiCall: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
const enhance = compose(
  withLocalLoader,
  withGlobalLoader,
);

export default enhance(TwoHoc);
