import * as React from 'react';
import './App.css';
import { BasicExample } from './Examples/BasicExample';
import { GlobalExample } from './Examples/GlobalExample';
import { AsyncExample } from './Examples/AsyncExample';
import { Provider } from 'jotai';

function App() {
    return (
        <div>
            <Provider>
                <BasicExample />
                <GlobalExample />
                <AsyncExample />
            </Provider>
        </div>
    );
}

export default App;
