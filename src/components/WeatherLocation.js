// WeatherLocation.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/solid';

const WeatherLocation = ({ location, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 10
      }}>
      <MapPinIcon
        size="20"
        color="gray"
      />
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          marginLeft: 10
        }}>
          {location?.name},
          {location?.country}
      </Text>
    </Pressable>
  );
};

export default WeatherLocation;
