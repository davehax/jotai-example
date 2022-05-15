import { useAtomValue } from 'jotai';
import * as React from 'react'
import { themeState } from './GlobalState/Theme';

export const Theme: React.FC<React.PropsWithChildren<{}>> = (props) => {
    const theme = useAtomValue(themeState);

    return (
        <div data-theme={theme}>
            {props.children}
        </div>
    )
}