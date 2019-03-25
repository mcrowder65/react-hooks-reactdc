import React, { Component } from "react";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createBrowserHistory } from "history";
import OneHoc from "./one-hoc";
import { SnackbarProvider } from "./snackbar";
import OneRenderProps from "./one-renderprops";
import LoadingProvider from "./loading";
import TwoHoc from "./two-hoc";
import TwoRenderProps from "./two-renderprops";
import UseReducer from "./use-reducer";
import NeedUseReducer from "./need-use-reducer";
import UseEffectClass from "./use-effect-class";
import UseEffect from "./use-effect";
import KeyListenerClass from "./key-listener-class";
import KeyListenerHook from "./key-listener-hook";
import UseCallback from "./use-callback";
import UseMemo from "./use-memo";
import BasicHook from "./basic-hook";

const browserHistory = createBrowserHistory();

function withNextRoute(Comp) {
  return Comp
}
class App extends Component {
  render() {
    return (
      <SnackbarProvider>
        <LoadingProvider>
          <BrowserRouter history={browserHistory}>
            <div>
              <Route exact path="/one-hoc" component={withNextRoute(OneHoc)} />
              <Route path="/one-renderprops" component={OneRenderProps} />
              <Route path="/two-hoc" component={TwoHoc} />
              <Route path="/two-renderprops" component={TwoRenderProps} />
              <Route path="/need-use-reducer" component={NeedUseReducer} />
              <Route path="/use-reducer" component={UseReducer} />
              <Route path="/use-effect-class" component={UseEffectClass} />
              <Route path="/use-effect" component={UseEffect} />
              <Route path="/key-listener-class" component={KeyListenerClass} />
              <Route path="/key-listener-hook" component={KeyListenerHook} />
              <Route path="/use-callback" component={UseCallback} />
              <Route path="/use-memo" component={UseMemo} />
              <Route path="/basic-hook" component={BasicHook} />
            </div>
          </BrowserRouter>
        </LoadingProvider>
      </SnackbarProvider>
    );
  }
}

export default App;
