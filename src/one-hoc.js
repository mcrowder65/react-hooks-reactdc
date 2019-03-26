import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

function withMessage(Comp) {
  return class extends React.Component {
    componentDidMount() {
      // do network request log
    }
    render() {
      return (
        <Comp
          {...this.props}
          logMessage={(message) => {
            console.log("our message ", message);
          }}
        />
      );
    }
  };
}
function OneHoc(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        props.logMessage("I am a message!");
      }}
    >
      Log message
    </Button>
  );
}

OneHoc.propTypes = {
  logMessage: PropTypes.func.isRequired,
};
export default withMessage(OneHoc);
