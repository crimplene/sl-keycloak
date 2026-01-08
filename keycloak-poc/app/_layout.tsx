import { Stack } from 'expo-router'
import { SessionProvider, useSession } from '../authentication/mock-auth'
import { SplashScreenController } from './splash'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://auth.spectrum.chat/realms/spectrum/protocol/openid-connect/auth',
    tokenEndpoint: 'https://auth.spectrum.chat/realms/spectrum/protocol/openid-connect/token',
    revocationEndpoint: 'https://auth.spectrum.chat/realms/spectrum/protocol/openid-connect/revoke',
};

const clientId = 'test-client';
const scheme = 'test-client'

export default function RootLayout() {

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: scheme
        }),
    },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log('Authorization code:', code);
            // Here you would typically exchange the authorization code for tokens
        }
    }, [response]);

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