import { atom } from "jotai";

export enum Theme {
    light = 'light',
    dark = 'dark'
};

export const themeState = atom(Theme.light);