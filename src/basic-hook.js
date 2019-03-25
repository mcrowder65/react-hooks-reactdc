import React from "react";

function BasicHook() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default BasicHook;
