import React from 'react';
import { View, Text, Image } from 'react-native';

const WeatherInfoItem = ({ icon, value }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
      }}>
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24
      }} />
      <Text
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: 16
        }}>
        {value}
      </Text>
    </View>
  );
};

export default WeatherInfoItem;
