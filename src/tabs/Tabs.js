import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, Fragment } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment'
import CurrenciesTop from '../screens/currencies/CurrenciesTop';
import CurrenciesBottom from '../screens/currencies/CurrenciesBottom'
import CurrenciesContainer from '../screens/currencies/content/CurrenciesContainer';
import FavoritesTop from '../screens/favorites/FavoritesTop';
import FavoritesContainer from '../screens/favorites/content/FavoritesContainer';
import { currencies, initialRates } from '../constants/currencies';
import { darkTheme } from '../constants/colors'
import { lightTheme } from '../constants/colors'
import { darkTheme as defaultTheme } from '../constants/colors'
import ProfileTab from './ProfileTab';

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

function TabTwo({ appTheme, allCurrencies, addFavoriteCurrency, updateCurrency }) {
  const navigation = useNavigation();
  const goCurrency = () => navigation.navigate('Currency')

  return (
    <Fragment>
      <FavoritesTop
        appTheme={appTheme}
        goCurrency={goCurrency}
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

export default function App() {

  const [lastRates, setLastRates] = useState(initialRates)
  const [fromCurrency, setFromCurrency] = useState('usd')
  const [amount, setAmount] = useState('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([])
  const [allCurrencies, setAllCurrencies] =
    useState(currencies.map(curr => ({ ...curr, isFavorite: false })))
  const [appTheme, setAppTheme] = useState(defaultTheme)
  const updateTheme = () => {
    appTheme.name === 'darkTheme' ? setAppTheme(lightTheme) : setAppTheme(darkTheme)
  }

  const updateRates = () => {
    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}`)
      .then(res => res.json())
      .then(responseJson => {
        setLastRates({ ...responseJson, hour: moment().format('H:mm:ss') })
      })
      .catch(e => {
        console.log('error: ', e)
      })
    }

  const addFavoriteCurrency = newCurrency => {
    setFavoriteCurrencies(prevState => [...prevState, newCurrency])
  }

  const updateCurrency = (name, isFavorite) => {
    let temp_allCurrencies = allCurrencies
    const objIndex = allCurrencies.findIndex((obj => obj.name === name))
    temp_allCurrencies[objIndex].isFavorite = !isFavorite
    setAllCurrencies(temp_allCurrencies)
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
            allCurrencies={allCurrencies}
            updateTheme={updateTheme}
            updateRates={updateRates}
            lastRates={lastRates}
          />}
        />
        <Tab.Screen
          name="Currencies"
          children={() => <TabTwo
            appTheme={appTheme}
            allCurrencies={allCurrencies}
            addFavoriteCurrency={addFavoriteCurrency}
            updateCurrency={updateCurrency}
          />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}