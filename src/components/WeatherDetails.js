// WeatherDetails.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import WeatherInfoItem from './WeatherInfoItem';
import { weatherImages } from '../constants/weatherImages';

const WeatherDetails = ({ location, current, weather }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        display: 'flex',
        justifyContent: 'space-around',
        flex: 1, marginBottom: 2
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold'
        }}>{location?.name},
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'gray'
            }}>
            {location?.country}
          </Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <Image
          source={weatherImages[current?.condition?.text || 'other']}
          // source={{uri: 'https:'+current?.condition?.icon}}
          style={{
            width: 130,
            height: 130 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 60,
            marginLeft: 5
          }}>
          {current?.temp_c}&#176;
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            letterSpacing: 1
          }}>
            {current.condition.text}
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
              fontSize: 20,
              letterSpacing: 1,
              marginTop: 10
          }}>
             {location.localtime}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          display: 'flex',
          // marginHorizontal: 4,
          gap: 20
        }}>
        <WeatherInfoItem
          icon={require('../../assets/icons/wind.png')}
          value={`${current?.wind_kph}km`}
        />
        <WeatherInfoItem
          icon={require('../../assets/icons/drop.png')}
          value={`${current?.humidity}%`}
        />
        <WeatherInfoItem
          icon={require('../../assets/icons/sun.png')}
          value={weather.forecast.forecastday[0].astro?.sunrise}
        />
      </View>
    </View>
  );
};

export default WeatherDetails;
