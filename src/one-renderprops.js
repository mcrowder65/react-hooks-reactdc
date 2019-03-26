import React from "react";
import PropTypes from "prop-types";

class WithMessage extends React.Component {
  componentDidMount() {}
  render() {
    return this.props.children({
      logMessage: (message) => {
        console.log("your message ", message);
      },
    });
  }
}
WithMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
function OneRenderProps() {
  return (
    <WithMessage>
      {({ logMessage }) => {
        return (
          <button onClick={() => logMessage("hello!")}>Log message</button>
        );
      }}
    </WithMessage>
  );
}

export default OneRenderProps;
