import * as React from 'react';
import { useAppState, AppContext } from '../state/useAppState';
import Layout from '../components/Layout';
import Calc from '../components/Calc';
// import Sweeper from '../components/Sweeper';

function AppContainer() {

  return (
    <AppContext.Provider value={useAppState()}>
      <Layout>
        <Calc />
      </Layout>
    </AppContext.Provider>
  )
}

export default AppContainer;
