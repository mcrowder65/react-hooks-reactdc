import React from "react";
import PropTypes from "prop-types";
const LoadingContext = React.createContext();

class ReusableComponent extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };
  state = {
    loadCount: 0,
  };
  makeApiCall = async (yourApiCall) => {
    try {
      this.setState((state) => ({ loadCount: state.loadCount + 1 }));
      await yourApiCall();
    } finally {
      this.setState((state) => ({ loadCount: state.loadCount - 1 }));
    }
  };
  render() {
    return this.props.children({
      makeApiCall: this.makeApiCall,
      isLoading: this.state.loadCount > 0,
    });
  }
}
class LoadingProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <ReusableComponent>
        {({ makeApiCall, isLoading }) => {
          return (
            <LoadingContext.Provider
              value={{
                makeApiCall,
                isLoading,
              }}
            >
              {this.props.children}
            </LoadingContext.Provider>
          );
        }}
      </ReusableComponent>
    );
  }
}
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingProvider;

export const WithGlobalLoader = (props) => {
  return (
    <LoadingContext.Consumer>
      {({ makeApiCall, isLoading }) => {
        return props.children({ isLoading, makeApiCall });
      }}
    </LoadingContext.Consumer>
  );
};

WithGlobalLoader.propTypes = {
  children: PropTypes.func.isRequired,
};
export const withGlobalLoader = (YourComponent) => {
  return function(props) {
    return (
      <LoadingContext.Consumer>
        {({ makeApiCall, isLoading }) => {
          return (
            <YourComponent
              {...props}
              makeApiCall={makeApiCall}
              isLoading={isLoading}
            />
          );
        }}
      </LoadingContext.Consumer>
    );
  };
};

export const WithLocalLoader = (props) => {
  return (
    <ReusableComponent>
      {({ makeApiCall, isLoading }) => {
        return props.children({ makeApiCall, isLoading });
      }}
    </ReusableComponent>
  );
};
WithLocalLoader.propTypes = {
  children: PropTypes.func.isRequired,
};
export const withLocalLoader = (YourComponent) => {
  return class extends React.Component {
    render() {
      return (
        <ReusableComponent>
          {({ makeApiCall, isLoading }) => {
            return (
              <YourComponent
                {...this.props}
                makeApiCall={makeApiCall}
                isLoading={isLoading}
              />
            );
          }}
        </ReusableComponent>
      );
    }
  };
};
