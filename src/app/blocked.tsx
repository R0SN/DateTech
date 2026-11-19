import { Image } from 'expo-image';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
export default function BlockDis() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* <Text style={styles.title}>You've Been Blocked HAIYAA!!</Text> */}
            <Image source={require('@/assets/images/blockGIF.gif')} style={styles.image}
            priority="high"
            autoplay
            contentFit="contain"
            />
            <Link href="/" style={styles.btn}>
                Go manage your blocked apps
            </Link>
        </View >

    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#2F2723', flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },

    text: { color: '#F0EBD8', fontSize: 16, flexShrink: 1, marginBottom: 16 },

    title: { color: '#F0EBD8', fontSize: 28, textAlign: 'center', marginTop: 20, marginBottom: 20, fontWeight: 'bold' },

    grid: { gap: 8 },

    row: {
        alignItems: 'center',
        borderColor: '#9C95DC',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },

    btn: {
        backgroundColor: '#9C95DC',
        borderRadius: 8,
        padding: 10,
        textAlign: 'center',
        width: 'fit-content',
    },
    image: { width: 400, height: 200, marginBottom: 20 },
});
