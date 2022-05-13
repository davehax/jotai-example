import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

// create a resettable atom 
// https://jotai.org/docs/guides/resettable
// use: let [clickCounter, setClickCounter] = useAtom(clickCounterState);
// reset: let resetClickCounter = useResetAtom(clickCounterState); -> resetClickCounter();
export const clickCounterState = atomWithReset(0);
