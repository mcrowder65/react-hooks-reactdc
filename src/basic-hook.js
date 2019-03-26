import React from "react";
import { Button } from "@material-ui/core";
import { sleep } from "./utils";
import { useGlobalLoader, useLoader } from "./loading";

function TwoRenderProps() {
  const global = useGlobalLoader();
  const globalClick = () => {
    global.makeApiCall(async () => {
      await sleep(3000);
    });
  };
  const local = useLoader();
  const localClick = () => {
    local.makeApiCall(async () => {
      await sleep(1000);
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={globalClick}
        disabled={global.isLoading}
      >
        Global button
      </Button>

      <Button
        color="secondary"
        variant="contained"
        onClick={localClick}
        disabled={local.isLoading}
      >
        Local button
      </Button>
    </>
  );
}

export default TwoRenderProps;
