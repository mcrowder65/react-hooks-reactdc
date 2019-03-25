import React from "react";
import PropTypes from "prop-types";
import faker from "faker";

function FilterNames({ list }) {
  const [filter, setFilter] = React.useState("");
  const getNames = React.useCallback(() => {
    return filter
      ? list.filter((item) => item.name.indexOf(filter) !== -1)
      : list;
  }, [filter]);

  const names = getNames();

  const alertHello = () => {
    alert("hello");
  };
  return (
    <div>
      Names <input value={filter} onChange={(e) => setFilter(e.target.value)} />{" "}
      {names.map(({ name }) => (
        <span key={name}>{name}</span>
      ))}
      <button onClick={alertHello}>alert hello!</button>
    </div>
  );
}

FilterNames.propTypes = {
  list: PropTypes.array.isRequired,
};
function ParentComponent() {
  const list = Array(100)
    .fill()
    .map(() => {
      const name = faker.name.findName();
      return {
        name,
      };
    });
  return (
    <div>
      <FilterNames list={list} />
    </div>
  );
}
export default ParentComponent;
