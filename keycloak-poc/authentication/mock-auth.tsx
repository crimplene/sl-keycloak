import {use, createContext, type PropsWithChildren} from 'react'
import {useStorageState} from '../utils/useStorageState'

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null
    isLoading: boolean
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false
});

export function useSession() {
    const value = use(AuthContext)

    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider>')
    }

    return value
}

export function SessionProvider({ children} : PropsWithChildren){
    const [[isLoading, session],setSession] = useStorageState('session')

    return (<AuthContext.Provider 
    value = {{
        signIn: () => {
            //Sign in logic here
            console.log('signing in')
            setSession('xxx');
        },
        signOut: () => {
            console.log('signing out')
            setSession(null)
        },
        session,
        isLoading
    }}>
        {children}
    </AuthContext.Provider>
    );
}