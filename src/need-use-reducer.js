import React from "react";
import { Button } from "@material-ui/core";
import { apiCall } from "./utils";

function NeedUseReducer() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [response, setResponse] = React.useState();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const r = await apiCall();
      setResponse(r);
    } catch (error) {
      setErrorMessage("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {response && <div>Response: {response}</div>}
      <Button
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={onClick}
      >
        Submit
      </Button>
    </div>
  );
}

export default NeedUseReducer;
