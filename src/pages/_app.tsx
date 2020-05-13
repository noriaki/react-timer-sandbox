import React from 'react';
import { AppProps } from 'next/app';

import ClockContainer from '~/containers/ClockContainer';

const App = ({ Component, pageProps }: AppProps) => (
  <ClockContainer.Provider initialState={pageProps.currentTime}>
    <Component {...pageProps} />
  </ClockContainer.Provider>
);

export const reportWebVitals = (metric) => {
  console.log(metric);
};

export default App;
