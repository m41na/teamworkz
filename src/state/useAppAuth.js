import { useState } from 'react';

const initialState = {
    signedIn: true,
    authToken: null,
}

function useAppAuth() {
  
    const [appAuth, setAppAuth] = useState(initialState);

    const setSignedIn = signedIn => setAppAuth(state => ({...state, signedIn}))

    return { appAuth, setSignedIn }
}

export default useAppAuth