import React from "react";

class KeyListenerClass extends React.Component {
  state = {
    currentKey: "",
  };
  handleKey = ({ key }) => {
    this.setState({ currentKey: key });
  };
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleKey);
  }
  render() {
    return <div>Current key:{this.state.currentKey}</div>;
  }
}

function ParentComponent() {
  const [isMounted, setIsMounted] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsMounted(true)}>Mount</button>
      <button onClick={() => setIsMounted(false)}>Unmount</button>
      {isMounted ? <KeyListenerClass /> : null}
    </>
  );
}

export default ParentComponent;
