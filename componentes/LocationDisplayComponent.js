import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const LocationDisplay = ({ latitude, longitude }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="location-pin" type="entypo" size={20} color="#777" />
            <Text style={{ marginLeft: 5, fontSize: 16 }}>
                Latitud: {latitude.toFixed(6)}, Longitud: {longitude.toFixed(6)}
            </Text>
        </View>
    );
};

export default LocationDisplay;
