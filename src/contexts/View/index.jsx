/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const ViewContext = createContext({
  isMobileView: false,
  bodyHeight: 0,
  setIsMobileViewType: (_isMobilePortView) => {},
  setBodyHeight: (_newBodyHeight) => {},
});

export default ViewContext;
