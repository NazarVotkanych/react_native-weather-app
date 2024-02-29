import { View, Text, Image, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { debounce } from "lodash";
import { theme } from '../theme';
import { fetchLocations, fetchWeatherForecast } from '../../src/api/getWeatherData';
import * as Progress from 'react-native-progress';
import { StatusBar } from 'expo-status-bar';
// import { weatherImages } from '../../src/constants/weatherImages';
import { getData, storeData } from '../../src/utils/asyncStorage';
import WeatherLocation from './WeatherLocation';
import WeatherDetails from './WeatherDetails';

export default function Home() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({})


  const handleSearch = search=>{
    if(search && search.length>2)
      fetchLocations({cityName: search}).then(data=>{
        setLocations(data);
      })
  }

  const handleLocation = loc=>{
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc.name);
    })
  }

  useEffect(()=>{
    fetchMyWeatherData();
  },[]);

  const fetchMyWeatherData = async ()=>{
    let myCity = await getData('city');
    let cityName = 'Lviv';
    if(myCity){
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data=>{
      setWeather(data);
      setLoading(false);
    })
    
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#87CEEB'
    }}>
      <StatusBar
        style="light"
      />
      <Image
        blurRadius={70} 
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center' }}>
          <Progress.CircleSnail
            thickness={10}
            size={140}
            color="#0bb3b2"
          />
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1 
        }}>
          <View
            style={{
              height: '7%',
              marginHorizontal: 4,
              position: 'relative',
              zIndex: 50
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: 999,
                backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent'
              }}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                  style={{
                    paddingLeft: 6,
                    height: 40,
                    paddingBottom: 1,
                    flex: 1,
                    color: 'white'
                  }} />
              ) : null}
              <Pressable
                onPress={() => toggleSearch(!showSearch)}
                style={{
                  borderRadius: '50%',
                  padding: 10,
                  margin: 10,
                  backgroundColor: theme.bgWhite(0.3)
                }}>
                {showSearch ?
                  <XMarkIcon
                    size="25"
                    color="white"
                  /> :
                  <MagnifyingGlassIcon
                    size="25"
                    color="white" />}
              </Pressable>
            </View>
            {locations.length > 0 && showSearch ? (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  backgroundColor: 'gray',
                  top: '16%',
                  borderRadius: 20
                }}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderStyle = showBorder ? { borderBottomWidth: 2, borderBottomColor: 'gray' } : {};
                  return <WeatherLocation key={index} location={loc} onPress={() => handleLocation(loc)} style={{ ...borderStyle }} />;
                })}
              </View>
            ) : null}
          </View>
          <WeatherDetails
            location={location}
            current={current}
            weather={weather} />
          <View
            style={{
              marginBottom: 2,
              flexDirection: 'column',
              justifyContent: 'space-between',
              // justifyContent: 'center',
              // display: 'flex',
              marginHorizontal: 5
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginBottom: 10
              }}>
              <CalendarDaysIcon
                size="22"
                color="white"
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginLeft: 5
                }}>
                Daily forecast
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
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
          </View>
        </SafeAreaView>
      )}
    </View>
  );

}
