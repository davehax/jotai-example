import * as React from 'react';
import { useAtom } from 'jotai';
import { Theme, themeState } from '../GlobalState/Theme';

export const ThemerExample: React.FC = () => {
    const [theme, setTheme] = useAtom(themeState);

    const onClick = () => {
        if (theme === Theme.light) {
            setTheme(Theme.dark);
        }
        else if (theme === Theme.dark) {
            setTheme(Theme.light);
        }
    }

    return (
        <div className="section">
            <h1>Theme Example</h1>
            <label>
                <button onClick={onClick}>Toggle Theme</button>
            </label>
            <p>Theme: {theme}</p>
        </div>
    )
}