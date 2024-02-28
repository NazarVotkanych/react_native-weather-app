import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { theme } from '../theme';

const WeatherForecast = ({ forecast }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingHorizontal: 15 }}
      showsHorizontalScrollIndicator={false}
    >
      {forecast.map((item, index) => {
        const date = new Date(item.date);
        const options = { weekday: 'long' };
        let dayName = date.toLocaleDateString('en-US', options);
        dayName = dayName.split(',')[0];

        return (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 110,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 20,
              backgroundColor: theme.bgWhite(0.15),
              marginRight: 10 }}>
            <Image
              source={{ uri: 'https:' + item?.day?.condition?.icon }}
              style={{
                width: 50,
                height: 50
              }} />
            <Text
              style={{
                color: 'white'
              }}>
                {dayName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '600'
              }}>
                {item?.day?.avgtemp_c}&#176;
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default WeatherForecast;
