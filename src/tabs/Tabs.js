import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import { initialRates } from '../constants/currencies';
import AsyncStorage from '@react-native-community/async-storage'
import { darkTheme } from '../constants/colors'
import { lightTheme } from '../constants/colors'
import { ProfileTab, GlobalTab, CurrenciesTab, FavoritesTab } from './index';

const Tab = createBottomTabNavigator();

export default function Tabs({ appTheme, setAppTheme, deviceCurrencies, allCurrencies, setAllCurrencies, FAV_CURRENCIES, THEME }) {

  const [lastRates, setLastRates] = useState(initialRates)
  const [fromCurrency, setFromCurrency] = useState('usd')
  const [amount, setAmount] = useState('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([])
  const [filteredCurrencies, setFilteredCurrencies] = useState([])

  const searchCurrency = term => {
    let currentCurrencies = deviceCurrencies
    let resultCurrencies = []
    if (term !== '' && term.length > 2) {
      resultCurrencies = currentCurrencies.filter(
        currency => {
          const formattedCurrency = currency.nickname.toLowerCase()
          const formattedTerm = term.toLowerCase()
          return formattedCurrency.includes(formattedTerm)
        }
      )
    } else {
      resultCurrencies = deviceCurrencies
    }
    updateList(resultCurrencies, term)
  }

  const updateList = (newList, term) => {
    term !== '' ?
      setFilteredCurrencies(newList)
      :
      setFilteredCurrencies(deviceCurrencies)
  }

  const updateTheme = async () => {
    try {
      if (appTheme.name === 'darkTheme') {
        setAppTheme(lightTheme)
        const theme = JSON.stringify(lightTheme)
        await AsyncStorage.setItem(THEME, theme)
      } else {
        setAppTheme(darkTheme)
        const theme = JSON.stringify(darkTheme)
        await AsyncStorage.setItem(THEME, theme)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateRates = () => {
    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}`)
      .then(res => res.json())
      .then(responseJson => {
        setLastRates({ ...responseJson, hour: moment().format('H:mm') })
      })
      .catch(e => {
        console.log('error: ', e)
      })
  }

  const addFavoriteCurrency = newCurrency => {
    setFavoriteCurrencies(prevState => [...prevState, newCurrency])
  }

  const updateCurrency = async (name, isFavorite) => {
    let temp_allCurrencies = deviceCurrencies
    const objIndex = allCurrencies.findIndex((obj => obj.name === name))
    temp_allCurrencies[objIndex].isFavorite = !isFavorite
    setAllCurrencies(temp_allCurrencies)
    AsyncStorage.setItem(FAV_CURRENCIES, JSON.stringify(temp_allCurrencies))
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Currency') {
              iconName = focused
                ? 'ios-wallet'
                : 'ios-wallet';
            } else if (route.name === 'Currencies') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person';
            } else if (route.name === 'Global') {
              iconName = focused ? 'ios-globe' : 'ios-globe';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#ccc',
          style: {
            backgroundColor: appTheme.background,
          },
        }}
      >
        <Tab.Screen
          name="Profile"
          children={() => <ProfileTab
            appTheme={appTheme}
            updateTheme={updateTheme}
            updateRates={updateRates}
            lastRates={lastRates}
          />}
        />
        <Tab.Screen
          name="Currency"
          children={() => <CurrenciesTab
            appTheme={appTheme}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            amount={amount}
            setAmount={setAmount}
            allCurrencies={deviceCurrencies}
            updateTheme={updateTheme}
            updateRates={updateRates}
            lastRates={lastRates}
          />}
        />
        <Tab.Screen
          name="Currencies"
          children={() => <FavoritesTab
            appTheme={appTheme}
            allCurrencies={filteredCurrencies}
            addFavoriteCurrency={addFavoriteCurrency}
            updateCurrency={updateCurrency}
            searchCurrency={searchCurrency}
          />}
        />
        <Tab.Screen
          name="Global"
          children={() => <GlobalTab
            appTheme={appTheme}
          />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}