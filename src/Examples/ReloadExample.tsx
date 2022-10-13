import * as React from "react";
import {atom, useAtom, useAtomValue} from "jotai";

// function that returns a promise that resolves after a given amount of milliseconds
const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

// atom
const nameAtom = atom("");
const loadingAtom = atom(false);

// reload hook
const useReloadHook = () => {
    const [name, setName] = useAtom(nameAtom);
    const [loading, setLoading] = useAtom(loadingAtom);

    return async () => {
        setLoading(true);
        await wait(500);
        setLoading(false);
        setName("Jimothy");
    }
}

const ReloadExample: React.FC = () => {
    const [name, setName] = useAtom(nameAtom);
    const loading = useAtomValue(loadingAtom);
    const reloadName = useReloadHook();

    return (
        <div className="section">
            <h1>Reloadable Section {loading && <span>(Loading...)</span>}</h1>
            <div style={{ marginBottom: "1rem" }}>
                <input style={{ padding: "0.5rem 1rem" }} type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
            <button onClick={() => reloadName()}>Reload</button>
        </div>
    )
}

export default ReloadExample;