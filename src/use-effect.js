import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

class UseEffect extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    setIndex: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.list, this.props.list)) {
      this.props.setIndex(0);
    }
  }
  render() {
    const { selectedIndex, setIndex, list } = this.props;
    return (
      <div>
        <select
          value={selectedIndex}
          onChange={(e) => setIndex(Number(e.target.value))}
        >
          {list.map((number, index) => {
            return (
              <option value={index} key={index}>
                {number}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

function ParentComponent() {
  const [list, setList] = React.useState([111, 222]);
  const [index, setIndex] = React.useState(0);

  const setListOne = () => {
    setList([111, 222]);
  };

  const setListTwo = () => {
    setList([444, 555, 666, 777]);
  };
  return (
    <div>
      <button onClick={setListOne}>Render List One</button>

      <button onClick={setListTwo}>Render List Two</button>
      <UseEffect
        list={list}
        setIndex={(i) => setIndex(i)}
        selectedIndex={index}
      />
    </div>
  );
}

export default ParentComponent;
