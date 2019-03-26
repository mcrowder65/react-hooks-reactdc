import React from "react";
import PropTypes from "prop-types";

class WithMessage extends React.Component {
  render() {
    return this.props.children;
  }
}
WithMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
function OneRenderProps() {
  return <WithMessage>hello!</WithMessage>;
}

export default OneRenderProps;
