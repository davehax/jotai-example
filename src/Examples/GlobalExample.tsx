import { atom, useAtom, useAtomValue } from 'jotai';
import { clickCounterState } from '../GlobalState/ClickCounter';
import * as React from 'react';
import { useResetAtom } from 'jotai/utils';
import { Theme, themeState } from '../GlobalState/Theme';

const lightThemeColours = ['white', 'cyan', 'magenta', 'yellow'];
const darkThemeColours = ['black', 'blue', 'purple', 'gold'];

// define a 'derived state'
// we take the value of 'clickCounterState' and convert that into a new piece of state
// as the value of 'clickCounterState' is updated this derived state is then updated
const backgroundColourState = atom(
    (get) => {
        // this backgroundColourState atom will be updated if the clickCounterState atom is updated anywhere else in the app

        // clickCounterState is defined in GlobalState/ClickCounter.ts
        const count = get(clickCounterState);

        // themeState is defined in GlobalState/Theme.ts
        const theme = get(themeState);

        const colours = theme === Theme.light 
            ? lightThemeColours 
            : darkThemeColours;

        // retrieve the background colour from our colours array
        const index = Math.abs(count) % colours.length;
        return colours[index];
    }
);

// this example imports state that is stored globally in a 'shared library' way
export const GlobalExample: React.FC = () => {
    // useAtom returns a tuple [currentValue: any, setValue: () => void]
    // using array style destructuring we can assign the current value to 'clickCounter' and the setter to 'setClickCounter'
    const [clickCounter, setClickCounter] = useAtom(clickCounterState);

    // see GlobalState/ClickCounter.ts for the definition of the clickCounterState atom 
    // you will observe that it is defined using the function 'atomWithReset'
    // which defines an atom that can be reset to its initial value
    const resetClickCounter = useResetAtom(clickCounterState);

    // useAtomValue gives us access to a read-only state
    const backgroundColour = useAtomValue(backgroundColourState);

    // event handlers
    const onClickMeButtonClicked = () => setClickCounter(clickCounter + 1);
    const onResetButtonClicked = () => resetClickCounter();

    return (
        <div className="section text-shadowed" style={{ backgroundColor: backgroundColour }}>
            <h1>Global State Example</h1>
            <p>Click Counter: {clickCounter}</p>
            <button onClick={onClickMeButtonClicked}>Click Me!</button>
            <button onClick={onResetButtonClicked}>Reset</button>
        </div>
    );
}
