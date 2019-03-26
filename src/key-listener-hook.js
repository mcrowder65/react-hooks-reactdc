import React from "react";

function KeyListenerHook() {
  const [currentKey, setCurrentKey] = React.useState("");
  const handleKey = ({ key }) => {
    setCurrentKey(key);
  };
  React.useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);
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
