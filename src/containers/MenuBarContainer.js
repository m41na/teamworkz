import * as React from 'react';
import { useAppContext } from '../state/useAppState';
import MenuBar from '../components/MenuBar';

function MenuBarContainer({ title }) {

  const { appAuth, setSignedIn } = useAppContext();

  return (
    <MenuBar title={title} signedIn={appAuth.signedIn} setSignedIn={setSignedIn} />
  )
}

export default MenuBarContainer;
