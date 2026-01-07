import { Stack } from 'expo-router'
import { SessionProvider, useSession } from '../authentication/mock-auth'
import { SplashScreenController } from './splash'

export default function RootLayout() {
    // Set up auth context & render layout inside of it
    return (
        <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
        </SessionProvider>
    )


    //Component that can access the session provider
    function RootNavigator() {
        const {session} = useSession() 
        return <Stack >
            <Stack.Protected guard={!!session}>
                <Stack.Screen name='(app)' />
            </Stack.Protected>
            </Stack>
    }

}