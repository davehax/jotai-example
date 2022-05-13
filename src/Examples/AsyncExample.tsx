import { useAtomValue, atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import * as React from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'; // https://www.npmjs.com/package/react-error-boundary

// function that returns a promise that resolves after a given amount of milliseconds
const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

interface IUser {
    id: number,
    name: string,
    email: string
}

const users: IUser[] = [
    {
        id: 1,
        name: 'Developers',
        email: 'devs@company.co'
    },
    {
        id: 2,
        name: 'Marketing',
        email: 'marketing@grubs.co'
    },
    {
        id: 3,
        name: 'Engineering',
        email: 'whatissunlight@indoors4life.co'
    }
];

// userId state atom
const userIdState = atomWithReset(-1);

// user state atom
// which is derived from the userIdState atom
const userState = atom(
    async (get) => {
        // artifical delay
        await wait(500);

        // retrieve the user
        const userId = get(userIdState);

        if (userId === -1)
            return undefined;

        let user: IUser | undefined = users.find(x => x.id === userId);

        if (!user)
            throw Error('R.I.P');

        return user;
    }
)

// function component that renders the user info
const UserInfo: React.FC = () => {
    const userId = useAtomValue(userIdState);
    const user = useAtomValue(userState);

    if (!user) {
        return <p>Unable to find user with id: {userId}</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th style={{ width: '50px' }}>Id</th>
                    <th style={{ width: '200px' }}>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            </tbody>
        </table>
    );
}

// error fallback component that allows us to reset both
// the component state that failed
// and the error boundary state
const ErrorFallback: React.FC<any> = ({ error, resetErrorBoundary }) => {
    const resetUserId = useResetAtom(userIdState);

    const onButtonClick = () => {
        // reset the state atom
        resetUserId();
        // reset the error boundary
        resetErrorBoundary();
    }

    return (
        <div role="alert">
            <p>Something went wrong!</p>
            <pre>{error.message}</pre>

            <button onClick={onButtonClick}>Try Again</button>
        </div>
    )
}

export const AsyncExample: React.FC = () => {
    const [, setUserId] = useAtom(userIdState);

    return (
        <div className="section">
            <h1>Async Example</h1>

            {/* wrap the async component with an ErrorBoundary provided by the react-error-boundary package */}
            {/* which will render the FallbackComponent in the event of an unhandled error */}
            {/* https://www.npmjs.com/package/react-error-boundary */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {/* wrap the async component with React.Suspense to provide a *loading* animation / message */}
                <React.Suspense fallback={<div>Loading...</div>}>
                    <UserInfo />
                </React.Suspense>
                <button onClick={() => setUserId(1)}>User 1</button>
                <button onClick={() => setUserId(2)}>User 2</button>
                <button onClick={() => setUserId(3)}>User 3</button>
                <button onClick={() => setUserId(4)}>Error</button>
            </ErrorBoundary>
        </div>
    );
}