import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, Fragment, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import CurrenciesTop from '../screens/currencies/CurrenciesTop';
import CurrenciesBottom from '../screens/currencies/CurrenciesBottom'
import CurrenciesContainer from '../screens/currencies/content/CurrenciesContainer';
import FavoritesTop from '../screens/favorites/FavoritesTop';
import FavoritesContainer from '../screens/favorites/content/FavoritesContainer';
import { currencies, initialRates } from '../constants/currencies';
import AsyncStorage from '@react-native-community/async-storage'
import { darkTheme } from '../constants/colors'
import { lightTheme } from '../constants/colors'
import { darkTheme as defaultTheme } from '../constants/colors'
import ProfileTab from './ProfileTab';
import GlobalTab from './GlobalTab';

function TabOne({ appTheme, fromCurrency, setFromCurrency, amount, setAmount, allCurrencies, updateTheme, updateRates, lastRates }) {
  const navigation = useNavigation();
  const goCurrencies = () => navigation.navigate('Currencies')
  return (
    <Fragment>
      <CurrenciesTop
        appTheme={appTheme}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        amount={amount}
        setAmount={setAmount}
        updateRates={updateRates}
      />
      <CurrenciesContainer
        appTheme={appTheme}
        fromCurrency={fromCurrency}
        amount={amount}
        goCurrencies={goCurrencies}
        allCurrencies={allCurrencies}
        lastRates={lastRates}
      />
      <CurrenciesBottom
        appTheme={appTheme}
        updateTheme={updateTheme}
        updateRates={updateRates}
        lastRates={lastRates}
      />
    </Fragment>
  );
}

function TabTwo({ appTheme, allCurrencies, addFavoriteCurrency, updateCurrency, searchCurrency }) {
  const navigation = useNavigation();
  const goCurrency = () => navigation.navigate('Currency')

  return (
    <Fragment>
      <FavoritesTop
        appTheme={appTheme}
        goCurrency={goCurrency}
        searchCurrency={searchCurrency}
      />
      <FavoritesContainer
        appTheme={appTheme}
        allCurrencies={allCurrencies}
        addFavoriteCurrency={addFavoriteCurrency}
        updateCurrency={updateCurrency}
      />
    </Fragment>
  );
}
const Tab = createBottomTabNavigator();

const THEME = '@theme'
const FAV_CURRENCIES = '@favCurrencies'

export default function App() {

  const defaultTheme = darkTheme
  const defaultCurrencies = currencies.map(curr => ({ ...curr, isFavorite: false }))

  const getTheme = async () => {
    const theme = await AsyncStorage.getItem(THEME)
    return theme !== null ? JSON.parse(theme) : defaultTheme
  }
  const getDeviceCurrencies = async () => {
    const currencies = await AsyncStorage.getItem(FAV_CURRENCIES)
    return currencies !== null ? JSON.parse(currencies) : defaultCurrencies
  }

  const [lastRates, setLastRates] = useState(initialRates)
  const [fromCurrency, setFromCurrency] = useState('usd')
  const [amount, setAmount] = useState('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([])
  const [allCurrencies, setAllCurrencies] = useState(defaultCurrencies)
  const [deviceCurrencies, setDeviceCurrencies] = useState([])
  const [filteredCurrencies, setFilteredCurrencies] = useState([])
  const [appTheme, setAppTheme] = useState(defaultTheme)

  useEffect(() => {
    getTheme().then(setAppTheme).catch(setAppTheme(defaultTheme))
    getDeviceCurrencies().then(setDeviceCurrencies).catch(setDeviceCurrencies(defaultCurrencies))
  }, [])
  
  // const clearAppData = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys()
  //     await AsyncStorage.multiRemove(keys)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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
        // style={getStyle(appTheme, 'topContainer')}
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
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: `#03071E`,
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
          children={() => <TabOne
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
          children={() => <TabTwo
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