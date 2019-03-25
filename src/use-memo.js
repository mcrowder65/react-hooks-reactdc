import React from "react";
import faker from "faker";

const list = Array(100000)
  .fill()
  .map(() => {
    return faker.name.findName();
  });
function FilterNames() {
  const [count, setCount] = React.useState(0);
  const filterNames = (filter) => {
    console.log("filterRunning");
    return filter ? list.filter((name) => name.indexOf(filter) !== -1) : list;
  };
  const [filter, setFilter] = React.useState("");
  const names = React.useMemo(() => filterNames(filter), [filter]);
  // const names = filterNames(filter);
  return (
    <div>
      <div>
        <button onClick={() => setCount(count + 1)}>Force a rerender</button>
      </div>
      Names <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {names.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  );
}
export default FilterNames;
