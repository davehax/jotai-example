import * as React from 'react';
import './App.css';
import { BasicExample } from './Examples/BasicExample';
import { GlobalExample } from './Examples/GlobalExample';
import { AsyncExample } from './Examples/AsyncExample';
import { ThemerExample } from './Examples/ThemerExample';
import { Provider } from 'jotai';
import { Theme } from './Theme';

function App() {
    return (
        <Provider>
            <Theme>
                <div className="app">
                    <ThemerExample />
                    <BasicExample />
                    <GlobalExample />
                    <AsyncExample />
                </div>
            </Theme>
        </Provider>
    );
}

export default App;
