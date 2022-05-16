import { useAtomValue } from 'jotai';
import * as React from 'react'
import { themeState } from './GlobalState/Theme';

// lightweight example of consuming the current theme from global state and exposing this in the DOM
// see App.css rules for [data-theme="light"] and [data-theme="dark"] to see how CSS variables can 
// be used to adjust theme colours in a simple way
export const Theme: React.FC<React.PropsWithChildren<{}>> = (props) => {
    const theme = useAtomValue(themeState);

    return (
        <div data-theme={theme}>
            {props.children}
        </div>
    )
}