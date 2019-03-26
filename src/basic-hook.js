import React from "react";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { useGlobalLoader, useLoader } from "./loading";

function TwoHoc() {
  const {
    isLoading: isGlobalLoading,
    makeApiCall: makeGlobalApiCall,
  } = useGlobalLoader();

  const { isLoading, makeApiCall } = useLoader();
  const globalClick = () => {
    makeGlobalApiCall(async () => {
      await sleep(3000);
    });
  };
  const localClick = () => {
    makeApiCall(async () => {
      await sleep(1000);
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={globalClick}
        disabled={isGlobalLoading}
      >
        Global button
      </Button>

      <Button
        color="secondary"
        variant="contained"
        onClick={localClick}
        disabled={isLoading}
      >
        Local button
      </Button>
    </>
  );
}

export default TwoHoc;
