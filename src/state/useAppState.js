import { useState, useContext, createContext } from 'react';
import { fetchAppTitle } from '../service';
import useAppAuth from './useAppAuth';

const initialState = {
    appTitle: 'Dreams',
    footerText: 'Sticky footer'
}

export const AppContext = createContext(null);

export function useAppState() {

    const [appState, setAppState] = useState(initialState);
    const { appAuth, setSignedIn } = useAppAuth();

    const setAppTitle = title => setAppState(state => ({ ...state, appTitle: title }))

    return { appState, appAuth, setSignedIn, setAppTitle, fetchAppTitle }
}

export function useAppContext() {
    return useContext(AppContext);
}
