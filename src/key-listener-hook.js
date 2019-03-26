import React from "react";

function KeyListenerHook() {
  const [currentKey, setCurrentKey] = React.useState("");
  const handleKey = ({ key }) => setCurrentKey(key);

  React.useEffect(() => {
    // componentDidMount
    // componentDidUpdate
    console.log("running");
    window.addEventListener("keydown", handleKey);
    return () => {
      // componentWillUnmount
      window.removeEventListener("keydown", handleKey);
    };
  }, [currentKey]);

  return <div>Current key:{currentKey}</div>;
}

function ParentComponent() {
  const [isMounted, setIsMounted] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsMounted(true)}>Mount</button>
      <button onClick={() => setIsMounted(false)}>Unmount</button>
      {isMounted ? <KeyListenerHook /> : null}
    </>
  );
}

export default ParentComponent;
