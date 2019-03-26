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

export function useLoader() {
  const [loadCount, setLoadCount] = React.useState(0);
  const makeApiCall = async (yourApiCall) => {
    try {
      setLoadCount((state) => state + 1);
      await yourApiCall();
    } finally {
      setLoadCount((state) => state - 1);
    }
  };
  return { makeApiCall, isLoading: loadCount > 0 };
}

function LoadingProvider({ children }) {
  const { makeApiCall, isLoading } = useLoader();
  return (
    <LoadingContext.Provider
      value={{
        makeApiCall,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useGlobalLoader() {
  return React.useContext(LoadingContext);
}
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
  const { makeApiCall, isLoading } = useLoader();
  return props.children({ makeApiCall, isLoading });
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
