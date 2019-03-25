import React from "react";
import { Button } from "@material-ui/core";
import { apiCall } from "./utils";
const actionTypes = {
  SUBMIT: "SUBMIT",
  ERROR: "ERROR",
  START_LOADING: "START_LOADING",
};
const reducer = (prevState, action) => {
  if (action.type === actionTypes.START_LOADING) {
    return {
      ...prevState,
      isLoading: true,
    };
  } else if (action.type === actionTypes.SUBMIT) {
    return {
      ...prevState,
      isLoading: false,
      response: action.response,
    };
  } else if (action.type === actionTypes.ERROR) {
    return {
      ...prevState,
      isLoading: false,
      errorMessage: action.errorMessage,
    };
  }
  return prevState;
};

function UseReducer() {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: false,
    response: "",
    errorMessage: "",
  });

  const onClick = async () => {
    try {
      dispatch({ type: actionTypes.START_LOADING });
      const response = await apiCall();
      dispatch({ type: actionTypes.SUBMIT, response });
    } catch (e) {
      dispatch({ type: actionTypes.ERROR, errorMessage: e.message });
    }
  };
  return (
    <div>
      {state.errorMessage && <div>Error: {state.errorMessage}</div>}
      {state.response && <div>Response: {state.response}</div>}
      <Button
        variant="contained"
        color="primary"
        disabled={state.isLoading}
        onClick={onClick}
      >
        Submit
      </Button>
    </div>
  );
}

export default UseReducer;
