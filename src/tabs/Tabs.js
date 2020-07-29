import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, Fragment } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrenciesTop from '../screens/currencies/CurrenciesTop';
import CurrenciesBottom from '../screens/currencies/CurrenciesBottom'
import CurrenciesContainer from '../screens/currencies/content/CurrenciesContainer';
import FavoritesTop from '../screens/favorites/FavoritesTop';
import FavoritesContainer from '../screens/favorites/content/FavoritesContainer';
import currencies from '../constants/currencies';
import { darkTheme } from '../constants/colors'
import { lightTheme } from '../constants/colors'
import { darkTheme as defaultTheme } from '../constants/colors'

function TabOne({ appTheme, fromCurrency, setFromCurrency, amount, setAmount, allCurrencies, updateTheme }) {
  const navigation = useNavigation();
  const goTwo = () => navigation.navigate('Two')
  return (
    <Fragment>
      <CurrenciesTop
        appTheme={appTheme}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        amount={amount}
        setAmount={setAmount}
      />
      <CurrenciesContainer
        appTheme={appTheme}
        fromCurrency={fromCurrency}
        amount={amount}
        goTwo={goTwo}
        allCurrencies={allCurrencies}
      />
      <CurrenciesBottom appTheme={appTheme} updateTheme={updateTheme} />
    </Fragment>
  );
}

function TabTwo({ appTheme, allCurrencies, addFavoriteCurrency, updateCurrency }) {
  const navigation = useNavigation();
  const goOne = () => navigation.navigate('One')

  return (
    <Fragment>
      <FavoritesTop
        appTheme={appTheme}
        goOne={goOne}
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

  const [fromCurrency, setFromCurrency] = useState('ars')
  const [amount, setAmount] = useState('')
  const [favoriteCurrencies, setFavoriteCurrencies] = useState([])
  const [allCurrencies, setAllCurrencies] =
    useState(currencies.map(curr => ({ ...curr, isFavorite: false })))
  const [appTheme, setAppTheme] = useState(defaultTheme)
  const updateTheme = () => {
    appTheme.name === 'darkTheme' ? setAppTheme(lightTheme) : setAppTheme(darkTheme)
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
            if (route.name === 'One') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Two') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style:{
            backgroundColor: `#03071E`,
          },
        }}
      >
        <Tab.Screen
          name="One"
          children={() => <TabOne
            appTheme={appTheme}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            amount={amount}
            setAmount={setAmount}
            allCurrencies={allCurrencies}
            updateTheme={updateTheme}
          />}
        />
        <Tab.Screen
          name="Two"
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