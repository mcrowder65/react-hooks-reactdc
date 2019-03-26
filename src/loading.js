import React from "react";
import PropTypes from "prop-types";
const LoadingContext = React.createContext();

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
  return {
    makeApiCall,
    isLoading: loadCount > 0,
  };
}
function ReusableComponent(props) {
  const [loadCount, setLoadCount] = React.useState(0);
  const makeApiCall = async (yourApiCall) => {
    try {
      setLoadCount((state) => state + 1);
      await yourApiCall();
    } finally {
      setLoadCount((state) => state - 1);
    }
  };
  return props.children({
    makeApiCall,
    isLoading: loadCount > 0,
  });
}
ReusableComponent.propTypes = {
  children: PropTypes.func.isRequired,
};

function LoadingProvider(props) {
  const { makeApiCall, isLoading } = useLoader();
  return (
    <LoadingContext.Provider
      value={{
        makeApiCall,
        isLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
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
export const useGlobalLoader = () => {
  const { isLoading, makeApiCall } = React.useContext(LoadingContext);
  return { isLoading, makeApiCall };
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
