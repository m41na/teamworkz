import * as React from 'react';
import { useAppState, AppContext } from '../state/useAppState';
import Layout from '../components/Layout';
import App from '../components/App';

function AppContainer() {

  return (
    <AppContext.Provider value={useAppState()}>
      <Layout>
        <App />
      </Layout>
    </AppContext.Provider>
  )
}

export default AppContainer;
