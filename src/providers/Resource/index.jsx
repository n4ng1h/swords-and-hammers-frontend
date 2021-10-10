import PropTypes from 'prop-types';
import { useState } from 'react';
import ResourceContext from 'contexts/Resource';

const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState({
    resourceInfo: {},
    setResourceInfo: (_resources) => {
      setResources((prevState) => ({
        ...prevState,
        resourceInfo: _resources,
      }));
    },
    eventLog: [],
    setEventLog: (_logs) => {
      if (_logs !== null) {
        let formattedLogs = '';
        _logs.forEach((entry) => {
          formattedLogs += `> ${entry.msg}\n\n`;
        });
        setResources((prevState) => ({
          ...prevState,
          eventLog: formattedLogs,
        }));
      }
    },
  });

  return (
    <ResourceContext.Provider value={resources}>
      {children}
    </ResourceContext.Provider>
  );
};

ResourceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResourceProvider;
