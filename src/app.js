import React, { Component } from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import { Grid } from "@material-ui/core";
import OneHoc from "./one-hoc";
import { SnackbarProvider } from "./snackbar";
import OneRenderProps from "./one-renderprops";
import LoadingProvider from "./loading";
import TwoHoc from "./two-hoc";
import TwoRenderProps from "./two-renderprops";
import UseReducer from "./use-reducer";
import NeedUseReducer from "./need-use-reducer";
import KeyListenerClass from "./key-listener-class";
import KeyListenerHook from "./key-listener-hook";
import UseCallback from "./use-callback";
import UseMemo from "./use-memo";
import BasicHook from "./basic-hook";

const browserHistory = createBrowserHistory();

function withNextRoute(Comp, next, prev) {
  function Wrapper(props) {
    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: "95vh" }}
      >
        <Grid item>
          <Comp {...props} />
        </Grid>
        <Grid container>
          <Grid item>
            <button onClick={() => browserHistory.push(next)}>Next</button>
          </Grid>
          <Grid item>
            {prev && (
              <button onClick={() => browserHistory.push(prev)}>
                Previous
              </button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return Wrapper;
}
class App extends Component {
  render() {
    return (
      <SnackbarProvider>
        <LoadingProvider>
          <BrowserRouter history={browserHistory}>
            <div>
              <Route
                exact
                path="/one-hoc"
                component={withNextRoute(OneHoc, "/one-renderprops")}
              />
              <Route
                path="/one-renderprops"
                component={withNextRoute(
                  OneRenderProps,
                  "/two-hoc",
                  "/one-hoc",
                )}
              />
              <Route
                path="/two-hoc"
                component={withNextRoute(
                  TwoHoc,
                  "/two-renderprops",
                  "/one-renderprops",
                )}
              />
              <Route
                path="/two-renderprops"
                component={withNextRoute(
                  TwoRenderProps,
                  "/basic-hook",
                  "/two-hoc",
                )}
              />
              <Route
                path="/basic-hook"
                component={withNextRoute(
                  BasicHook,
                  "/need-use-reducer",
                  "/two-renderprops",
                )}
              />
              <Route
                path="/need-use-reducer"
                component={withNextRoute(
                  NeedUseReducer,
                  "/use-reducer",
                  "/basic-hook",
                )}
              />
              <Route
                path="/use-reducer"
                component={withNextRoute(
                  UseReducer,
                  "/key-listener-class",
                  "/need-use-reducer",
                )}
              />
              <Route
                path="/key-listener-class"
                component={withNextRoute(
                  KeyListenerClass,
                  "/key-listener-hook",
                  "/use-reducer",
                )}
              />
              <Route
                path="/key-listener-hook"
                component={withNextRoute(
                  KeyListenerHook,
                  "/use-memo",
                  "/key-listener-class",
                )}
              />
              <Route path="/use-callback" component={UseCallback} />
              <Route
                path="/use-memo"
                component={withNextRoute(
                  UseMemo,
                  "/use-memo",
                  "/key-listener-hook",
                )}
              />
            </div>
          </BrowserRouter>
        </LoadingProvider>
      </SnackbarProvider>
    );
  }
}

export default App;
