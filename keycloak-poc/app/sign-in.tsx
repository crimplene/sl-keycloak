import { router } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'

import { useSession } from '../authentication/mock-auth'

export default function SignIn() {

    const { signIn } = useSession()

    return (
        <View style={styles.viewStyle}>
            <Text onPress={() => {
                signIn()
                router.replace('/')
            }}>Sign In</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

