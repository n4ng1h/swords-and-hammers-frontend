import { useState } from 'react';
import PropTypes from 'prop-types';
import ViewContext from 'contexts/View';

const ViewProvider = ({ children }) => {
  const [viewSettings, setViewSettings] = useState({
    isMobileView: false,
    bodyHeight: 0,
    setIsMobileViewType: (isMobilePortView) => {
      setViewSettings((prevState) => ({
        ...prevState,
        isMobileView: isMobilePortView,
      }));
    },
    setBodyHeight: (newBodyHeight) => {
      setViewSettings((prevState) => ({
        ...prevState,
        bodyHeight: newBodyHeight,
      }));
    },
  });

  return (
    <ViewContext.Provider value={viewSettings}>{children}</ViewContext.Provider>
  );
};

ViewProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ViewProvider;
