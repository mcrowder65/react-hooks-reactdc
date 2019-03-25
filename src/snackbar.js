import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarContext = React.createContext();

export class SnackbarProvider extends React.Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  handleClick = (message) => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { messageInfo } = this.state;
    return (
      <SnackbarContext.Provider value={{ addMessage: this.handleClick }}>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
        />

        {this.props.children}
      </SnackbarContext.Provider>
    );
  }
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const WithSnackbar = (props) => {
  return (
    <SnackbarContext.Consumer>
      {({ addMessage }) => {
        return typeof props.children === "function"
          ? props.children({ addMessage })
          : props.children;
      }}
    </SnackbarContext.Consumer>
  );
};
WithSnackbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
export const withSnackbar = (YourComponent) => {
  return function(props) {
    return (
      <SnackbarContext.Consumer>
        {(value) => {
          return <YourComponent {...props} addMessage={value.addMessage} />;
        }}
      </SnackbarContext.Consumer>
    );
  };
};
