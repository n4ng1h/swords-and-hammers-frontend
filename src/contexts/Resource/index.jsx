/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const ResourceContext = createContext({
  resourceInfo: {},
  setResourceInfo: (_rsrcInfo) => {},
  eventLog: [],
  setEventLog: (_logs) => {},
  setEndTurn: () => {},
});

export default ResourceContext;
