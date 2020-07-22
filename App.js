import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

//connecting redux store to the root component that renders the main component. This allows all the child components that are routed in main component to utilize the redux store
const { persistor, store } = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate
            Loading={<Loading/>}
            persistor={persistor}>
            <Main />
            </PersistGate>
        </Provider>
    );
} 