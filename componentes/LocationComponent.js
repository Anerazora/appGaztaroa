import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function LocationGps() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isConstantssudo) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        const speed = location.coords.speed;
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        const accuracy = location.coords.accuracy;
        const heading = location.coords.heading;
        const altitude = location.coords.altitude;
        const altitudeAccuracy = location.coords.altitudeAccuracy;
        const timestamp = location.coords.timestamp;

        console.log('Speed:', speed);
        console.log('Longitude:', longitude);
        console.log('Latitude:', latitude);
        console.log('Accuracy:', accuracy);
        console.log('Heading:', heading);
        console.log('Altitude:', altitude);
        console.log('Altitude Accuracy:', altitudeAccuracy);
        console.log('Timestamp:', timestamp);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>DATOS DE GEOLOCALIZACION</Text>
            <Text style={styles.paragraph}>Speed: {location?.coords?.speed}</Text>
            <Text style={styles.paragraph}>Longitude: {location?.coords?.longitude}</Text>
            <Text style={styles.paragraph}>Latitude: {location?.coords?.latitude}</Text>
            <Text style={styles.paragraph}>Accuracy: {location?.coords?.accuracy}</Text>
            <Text style={styles.paragraph}>Heading: {location?.coords?.heading}</Text>
            <Text style={styles.paragraph}>Altitude: {location?.coords?.altitude}</Text>
            <Text style={styles.paragraph}>Altitude Accuracy: {location?.coords?.altitudeAccuracy}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center'
    },
});
