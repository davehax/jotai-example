import * as React from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';

// Jotai - everything is an atom!
// https://jotai.org/docs/introduction - how to use Jotai in 5 minutes or less
// https://jotai.org/docs/basics/concepts - concepts! Jotai provides the ability to easily define global state and update mechanisms
// https://jotai.org/docs/api/core#atom


// define a piece of global state that can be consumed by using 'useRecoilState(textState)'
// note: if we were to define this atom in a shared library sort of way then it would be considered truly 'global'
const textState = atom('');

// define a piece of 'derived state'
// we keep track of the text using the "textState" atom
// we then derive the 'charCountState' state by using this atom
// when 'textState' is updated 
// -> change is propagated  
// -> atoms derived state value is update by the 'get' function
// -> components calling 'useAtomValue(charCountState)' receive the updated value and re-render
const charCountState = atom(
    (get) => {
        const text = get(textState);
        return text.length;
    }
);

// simple functional component that displays the value of the 'charCountState' derived state selector
function CharacterCount() {
    const count = useAtomValue(charCountState);
    return (<div>Character Count: {count}</div>);
}

// simple functional component that renders our TextInput and CharacterCount components
function CharacterCounter() {
    return (
        <div>
            <TextInput />
            <CharacterCount />
        </div>
    );
}

// simple controlled functional component
function TextInput() {
    // use the getter and setter for the textState atom created by the useRecoilState(...) function
    const [text, setText] = useAtom(textState);

    const onChange = (event: any) => {
        // update the value of the textState atom
        setText(event.target.value);
    }

    return (
        <div>
            <input type="text" value={text} onChange={onChange} />
        </div>
    );
}

function TextPresentationComponent() {
    // use only the value of the 'textState' atom here as this is a presentation-only component 
    const text = useAtomValue(textState);
    return (<div>textState: {text}</div>);
}

export const BasicExample: React.FC = () => {
    return (
        <div className="section">
            <h1>Basic Example</h1>
            <CharacterCounter />
            <TextPresentationComponent />
        </div>
    )
}